/* Flow diagram connector engine — draws responsive, rounded-elbow SVG
   connectors between DOM nodes inside a .flowdia container. Nodes and
   bands are laid out with plain CSS (flex rows); this only handles the
   connective lines, recomputing them from real rendered positions so
   nothing depends on a fixed-size canvas. Below MOBILE_BP the SVG is
   skipped entirely and bands stack via CSS instead. */

(function () {
  var MOBILE_BP = 860;
  var NS = 'http://www.w3.org/2000/svg';

  var GAP = 6; /* small breathing gap between a box edge and where its connector starts/ends */

  function anchor(rect, side) {
    switch (side) {
      case 'right': return { x: rect.right + GAP, y: rect.top + rect.height / 2 };
      case 'left': return { x: rect.left - GAP, y: rect.top + rect.height / 2 };
      case 'top': return { x: rect.left + rect.width / 2, y: rect.top - GAP };
      case 'bottom': return { x: rect.left + rect.width / 2, y: rect.bottom + GAP };
      default: return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    }
  }

  function elbowPoints(a, b, fromSide) {
    if (fromSide === 'right' || fromSide === 'left') {
      var midX = (a.x + b.x) / 2;
      return [a, { x: midX, y: a.y }, { x: midX, y: b.y }, b];
    }
    var midY = (a.y + b.y) / 2;
    return [a, { x: a.x, y: midY }, { x: b.x, y: midY }, b];
  }

  function roundedPath(points, radius) {
    if (points.length < 2) return '';
    if (points.length === 2) {
      return 'M' + points[0].x + ',' + points[0].y + ' L' + points[1].x + ',' + points[1].y;
    }
    var d = 'M' + points[0].x + ',' + points[0].y;
    for (var i = 1; i < points.length - 1; i++) {
      var p0 = points[i - 1], p1 = points[i], p2 = points[i + 1];
      var v1x = p1.x - p0.x, v1y = p1.y - p0.y;
      var v2x = p2.x - p1.x, v2y = p2.y - p1.y;
      var len1 = Math.hypot(v1x, v1y) || 1;
      var len2 = Math.hypot(v2x, v2y) || 1;
      var r = Math.max(0, Math.min(radius, len1 / 2, len2 / 2));
      var inPt = { x: p1.x - (v1x / len1) * r, y: p1.y - (v1y / len1) * r };
      var outPt = { x: p1.x + (v2x / len2) * r, y: p1.y + (v2y / len2) * r };
      d += ' L' + inPt.x + ',' + inPt.y + ' Q' + p1.x + ',' + p1.y + ' ' + outPt.x + ',' + outPt.y;
    }
    var last = points[points.length - 1];
    d += ' L' + last.x + ',' + last.y;
    return d;
  }

  function buildPath(edge, rects, containerRect) {
    var fromRect = rects[edge.from];
    var toRect = rects[edge.to];
    if (!fromRect || !toRect) return null;
    var a = anchor(fromRect, edge.fromSide || 'right');
    var b = anchor(toRect, edge.toSide || 'left');
    var points;
    if (edge.via && edge.via.length) {
      var viaPx = edge.via.map(function (p) {
        return { x: containerRect.width * p[0], y: containerRect.height * p[1] };
      });
      points = [a].concat(viaPx, [b]);
    } else {
      points = elbowPoints(a, b, edge.fromSide || 'right');
    }
    return roundedPath(points, edge.radius || 16);
  }

  function ensureSvg(container) {
    var svg = container.querySelector('svg.flowdia__svg');
    if (!svg) {
      svg = document.createElementNS(NS, 'svg');
      svg.setAttribute('class', 'flowdia__svg');
      svg.setAttribute('preserveAspectRatio', 'none');

      var defs = document.createElementNS(NS, 'defs');
      var marker = document.createElementNS(NS, 'marker');
      marker.setAttribute('id', 'flowdia-arrow-' + Math.random().toString(36).slice(2));
      marker.setAttribute('viewBox', '0 0 10 10');
      marker.setAttribute('refX', '8');
      marker.setAttribute('refY', '5');
      marker.setAttribute('markerWidth', '7');
      marker.setAttribute('markerHeight', '7');
      marker.setAttribute('orient', 'auto');
      var arrowPath = document.createElementNS(NS, 'path');
      arrowPath.setAttribute('d', 'M0,0 L10,5 L0,10 z');
      arrowPath.setAttribute('fill', 'currentColor');
      marker.appendChild(arrowPath);
      defs.appendChild(marker);
      svg.appendChild(defs);
      svg.dataset.markerId = marker.id;

      var dot = document.createElementNS(NS, 'marker');
      dot.setAttribute('id', 'flowdia-dot-' + Math.random().toString(36).slice(2));
      dot.setAttribute('viewBox', '0 0 10 10');
      dot.setAttribute('refX', '5');
      dot.setAttribute('refY', '5');
      dot.setAttribute('markerWidth', '4.5');
      dot.setAttribute('markerHeight', '4.5');
      var dotShape = document.createElementNS(NS, 'circle');
      dotShape.setAttribute('cx', '5'); dotShape.setAttribute('cy', '5'); dotShape.setAttribute('r', '4.5');
      dotShape.setAttribute('fill', 'currentColor');
      dot.appendChild(dotShape);
      defs.appendChild(dot);
      svg.dataset.dotId = dot.id;

      container.insertBefore(svg, container.firstChild);
    }
    return svg;
  }

  function redrawOne(container) {
    var nodesRoot = container.querySelector('.flowdia__nodes');
    if (!nodesRoot) return;

    if (window.innerWidth < MOBILE_BP) {
      var existing = container.querySelector('svg.flowdia__svg');
      if (existing) existing.style.display = 'none';
      return;
    }

    var edgesScript = container.querySelector('script.flowdia__edges');
    if (!edgesScript) return;
    var edges;
    try { edges = JSON.parse(edgesScript.textContent); } catch (e) { return; }

    var containerRect = nodesRoot.getBoundingClientRect();
    if (containerRect.width === 0 || containerRect.height === 0) return;

    var rects = {};
    nodesRoot.querySelectorAll('[data-node]').forEach(function (el) {
      var r = el.getBoundingClientRect();
      rects[el.dataset.node] = {
        left: r.left - containerRect.left,
        top: r.top - containerRect.top,
        right: r.right - containerRect.left,
        bottom: r.bottom - containerRect.top,
        width: r.width,
        height: r.height
      };
    });

    var svg = ensureSvg(nodesRoot);
    svg.style.display = 'block';
    svg.setAttribute('width', containerRect.width);
    svg.setAttribute('height', containerRect.height);
    svg.setAttribute('viewBox', '0 0 ' + containerRect.width + ' ' + containerRect.height);

    Array.prototype.slice.call(svg.querySelectorAll('path.flowdia__edge')).forEach(function (p) { p.remove(); });
    var markerId = svg.dataset.markerId;
    var dotId = svg.dataset.dotId;

    edges.forEach(function (edge) {
      var d = buildPath(edge, rects, containerRect);
      if (!d) return;
      var path = document.createElementNS(NS, 'path');
      path.setAttribute('d', d);
      path.setAttribute('class', 'flowdia__edge' + (edge.dashed ? ' flowdia__edge--dashed' : ''));
      if (!edge.noArrow) path.setAttribute('marker-end', 'url(#' + markerId + ')');
      if (!edge.noStartDot) path.setAttribute('marker-start', 'url(#' + dotId + ')');
      svg.appendChild(path);
    });
  }

  function redrawAll() {
    document.querySelectorAll('.flowdia').forEach(redrawOne);
  }

  var raf = null;
  function scheduleRedraw() {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(redrawAll);
  }

  window.addEventListener('resize', scheduleRedraw);
  window.addEventListener('load', scheduleRedraw);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(scheduleRedraw);
  }
  document.addEventListener('DOMContentLoaded', scheduleRedraw);

  window.FlowDiagrams = { redraw: scheduleRedraw, redrawNow: redrawAll };
})();
