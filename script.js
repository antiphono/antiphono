/* ============================================================
   Antiphono home page behaviour
   ------------------------------------------------------------
   Written from scratch, 17 August 2026.

   Only job: reveal elements. Above the fold on load, below the
   fold on scroll. Every element carrying data-anim is handled.
   Body content lives in the HTML, so with JavaScript disabled the
   .no-js rule in app.css shows everything immediately.
   ============================================================ */

(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.remove('no-js');

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Give every element in a stagger group its index, so the CSS
  // transition-delay calc() spaces them out.
  function index(scope) {
    scope.querySelectorAll('[data-stagger]').forEach(function (group) {
      Array.prototype.forEach.call(group.children, function (child, i) {
        child.style.setProperty('--i', i);
      });
    });
    scope.querySelectorAll('.lines').forEach(function (block) {
      block.querySelectorAll('.line').forEach(function (line, i) {
        line.style.setProperty('--i', i);
      });
    });
  }

  function show(el) {
    el.classList.add('in');
  }

  function init() {
    index(document);

    var targets = document.querySelectorAll('[data-anim], .lines');

    if (reduced) {
      targets.forEach(show);
      return;
    }

    var above = [];
    var below = [];
    targets.forEach(function (el) {
      var top = el.getBoundingClientRect().top;
      (top < window.innerHeight ? above : below).push(el);
    });

    // Above the fold animates on load, one frame after paint so the
    // starting state is rendered first and the transition actually runs.
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        above.forEach(show);
      });
    });

    if (!('IntersectionObserver' in window)) {
      below.forEach(show);
      return;
    }

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        show(entry.target);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });

    below.forEach(function (el) { obs.observe(el); });
  }

  /* ---- Mobile menu ------------------------------------------
     aria-expanded on the toggle, focus trapped while open, Escape
     closes, focus returns to the toggle on close. */
  function menu() {
    var toggle = document.getElementById('navToggle');
    var panel = document.getElementById('menu');
    if (!toggle || !panel) return;

    var open = false;

    function focusable() {
      return Array.prototype.slice.call(panel.querySelectorAll('a[href], button'));
    }

    function set(next) {
      open = next;
      toggle.setAttribute('aria-expanded', String(open));
      panel.setAttribute('data-open', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
      if (open) {
        var f = focusable();
        if (f.length) f[0].focus();
      } else {
        toggle.focus();
      }
    }

    toggle.addEventListener('click', function () { set(!open); });

    document.addEventListener('keydown', function (e) {
      if (!open) return;
      if (e.key === 'Escape') { set(false); return; }
      if (e.key !== 'Tab') return;
      var f = focusable();
      if (!f.length) return;
      var first = f[0];
      var last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    panel.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') set(false);
    });
  }

  /* ---- Tab navigation ---------------------------------------
     One pill slides and resizes between tabs. The pill follows
     pointer and keyboard focus, and returns to the current page's
     tab on leave. Figma node 5210:176. */
  function tabs() {
    var bar = document.getElementById('tabs');
    if (!bar) return;

    var links = Array.prototype.slice.call(bar.querySelectorAll('.tabs__link'));
    if (!links.length) return;

    // The tab for the page we are on. Falls back to the first tab.
    var path = window.location.pathname.replace(/\/$/, '');
    var current = links.filter(function (a) {
      var href = a.getAttribute('href').replace(/\/$/, '');
      return href !== '' && path.indexOf(href) === 0;
    })[0] || null;

    if (current) current.setAttribute('aria-current', 'page');

    function moveTo(link) {
      if (!link) return;
      var barBox = bar.getBoundingClientRect();
      var box = link.getBoundingClientRect();
      bar.style.setProperty('--pill-x', (box.left - barBox.left) + 'px');
      bar.style.setProperty('--pill-w', box.width + 'px');
      links.forEach(function (a) {
        a.setAttribute('data-on', String(a === link));
      });
    }

    // On a page with no matching tab, such as the home page, the
    // pill retreats rather than sticking to the last hovered tab.
    function rest() {
      if (current) { moveTo(current); return; }
      bar.setAttribute('data-ready', 'false');
      links.forEach(function (a) { a.setAttribute('data-on', 'false'); });
    }

    // Only show the pill once it has a real position, so it does
    // not animate in from the left edge on first paint.
    function ready() {
      if (current) {
        moveTo(current);
        bar.setAttribute('data-ready', 'true');
      }
    }

    links.forEach(function (a) {
      a.addEventListener('mouseenter', function () {
        moveTo(a);
        bar.setAttribute('data-ready', 'true');
      });
      a.addEventListener('focus', function () {
        moveTo(a);
        bar.setAttribute('data-ready', 'true');
      });
      // Clicking navigates away, so move the pill first. The
      // animation reads as the active state travelling to the new tab.
      a.addEventListener('click', function () {
        current = a;
        moveTo(a);
        bar.setAttribute('data-ready', 'true');
      });
      a.addEventListener('blur', rest);
    });

    bar.addEventListener('mouseleave', rest);
    window.addEventListener('resize', rest);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(ready);
    } else {
      ready();
    }
  }

  /* ---- Background video --------------------------------------
     Autoplay needs muted and playsinline. Reduced motion pauses it,
     since a looping clip is motion the user asked not to see. */
  function video() {
    var vids = [document.getElementById('heroVideo'), document.getElementById('reelVideo')];
    vids.forEach(function (v) {
      if (!v) return;
      if (reduced) { v.pause(); v.removeAttribute('autoplay'); return; }
      var play = v.play();
      if (play && play.catch) play.catch(function () { /* autoplay blocked, ground stands in */ });
    });
  }

  /* ---- Articles ----------------------------------------------
     Three most recent items from the RSS proxy. If the feed fails
     the section stays empty rather than showing invented posts. */
  function articles() {
    var grid = document.getElementById('homeArticles');
    if (!grid || !window.fetch) return;

    var esc = function (t) {
      return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
      });
    };
    var when = function (d) {
      if (!d) return '';
      var t = new Date(d);
      if (isNaN(t)) return '';
      return t.toLocaleDateString('en-AU', { month: 'long', year: 'numeric' });
    };

    fetch('/api/articles')
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (!d) return;
        var items = Array.isArray(d) ? d : (d.articles || d.items || []);
        if (!items.length) return;

        grid.innerHTML = items.slice(0, 3).map(function (a) {
          var media = a.image
            ? '<img src="' + esc(a.image) + '" alt="" loading="lazy" width="424" height="270">'
            : '<span aria-hidden="true"></span>';
          return '<a class="art" href="/article?slug=' + encodeURIComponent(a.slug || '') + '" data-anim="up">' +
            '<span class="art__head">' +
              '<span class="art__by">' +
                '<span class="art__avatar" aria-hidden="true">A</span>' +
                '<span class="art__byline"><b>Antiphono</b><span>' + esc(a.category || 'Article') + '</span></span>' +
              '</span>' +
              '<span class="art__time">' + esc(when(a.date)) + '</span>' +
            '</span>' +
            '<span class="art__media">' + media + '</span>' +
            '<span class="art__title">' + esc(a.title || '') + '</span>' +
          '</a>';
        }).join('');

        index(grid);
        grid.querySelectorAll('[data-anim]').forEach(show);
      })
      .catch(function () { /* feed down, section stays empty */ });
  }

  /* ---- Hero montage -----------------------------------------
     Driven by the Web Animations API rather than CSS keyframes, so
     each column gets its own timeline that can be seeked, sped up
     and paused. Distance is measured at runtime from real layout,
     which is why the loop is seamless at any column height.

     Behaviour:
       - each column drifts at its own duration and direction
       - playbackRate eases up while the page is scrolling
       - timelines pause when the hero leaves the viewport and when
         the tab is hidden, so nothing burns frames offscreen
       - reduced motion leaves the wall static */
  function montage() {
    var wall = document.querySelector('.mockwall');
    if (!wall || typeof Element === 'undefined' || !Element.prototype.animate) return;

    var cols = Array.prototype.slice.call(wall.querySelectorAll('.mockwall__col'));
    if (!cols.length) return;
    if (reduced) return;

    var players = [];

    function build() {
      players.forEach(function (p) { p.cancel(); });
      players = cols.map(function (col, i) {
        // Each column holds its children twice, so travelling half the
        // scroll height lands exactly on the duplicate.
        var distance = col.scrollHeight / 2;
        if (!distance) return null;

        var reverse = i % 2 === 1;
        var anim = col.animate(
          [
            { transform: 'translate3d(0, 0, 0)' },
            { transform: 'translate3d(0, ' + (reverse ? distance : -distance) + 'px, 0)' }
          ],
          {
            duration: 42000 + i * 9000,
            iterations: Infinity,
            easing: 'linear'
          }
        );
        anim.startTime = anim.timeline.currentTime - (i * 4000);
        return anim;
      }).filter(Boolean);
    }

    build();

    // Scroll couples into playback rate, then eases back to rest.
    var target = 1, current = 1, ticking = false, idle;
    function ease() {
      current += (target - current) * 0.08;
      players.forEach(function (p) { p.playbackRate = current; });
      if (Math.abs(target - current) > 0.01) {
        requestAnimationFrame(ease);
      } else {
        ticking = false;
      }
    }
    window.addEventListener('scroll', function () {
      target = 2.6;
      clearTimeout(idle);
      idle = setTimeout(function () { target = 1; if (!ticking) { ticking = true; ease(); } }, 140);
      if (!ticking) { ticking = true; ease(); }
    }, { passive: true });

    // Stop when offscreen or backgrounded.
    function set(play) {
      players.forEach(function (p) { play ? p.play() : p.pause(); });
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) { set(e.isIntersecting); });
      }, { threshold: 0 }).observe(wall);
    }
    document.addEventListener('visibilitychange', function () {
      set(document.visibilityState === 'visible');
    });

    var rebuild;
    window.addEventListener('resize', function () {
      clearTimeout(rebuild);
      rebuild = setTimeout(build, 250);
    });
  }

  /* ---- Dynamics ----------------------------------------------
     Runtime behaviour that CSS cannot express: pointer-relative
     transforms, scroll-position maths and value interpolation.
     Everything is batched into a single rAF loop, and the whole
     module is skipped under reduced motion. */
  function dynamics() {
    if (reduced) return;

    var raf = null, jobs = [];
    function schedule() {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = null;
        for (var i = 0; i < jobs.length; i++) jobs[i]();
      });
    }

    /* Scroll progress rail across the top of the page. */
    var rail = document.createElement('div');
    rail.className = 'progress';
    rail.setAttribute('aria-hidden', 'true');
    document.body.appendChild(rail);
    function progress() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var pct = max > 0 ? window.scrollY / max : 0;
      rail.style.transform = 'scaleX(' + pct.toFixed(4) + ')';
    }
    jobs.push(progress);

    /* Parallax. Media drifts against the scroll at its own depth. */
    var layers = Array.prototype.slice.call(
      document.querySelectorAll('.wk__media img, .why__figure img, .ft__figure img, .mrow__figure img')
    );
    layers.forEach(function (el, i) { el.dataset.depth = (0.06 + (i % 3) * 0.04).toFixed(2); });
    function parallax() {
      var vh = window.innerHeight;
      layers.forEach(function (el) {
        var box = el.getBoundingClientRect();
        if (box.bottom < 0 || box.top > vh) return;
        var mid = box.top + box.height / 2;
        var offset = (mid - vh / 2) * parseFloat(el.dataset.depth);
        el.style.transform = 'translate3d(0,' + (-offset).toFixed(2) + 'px,0) scale(1.12)';
      });
    }
    jobs.push(parallax);

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    schedule();

    /* Magnetic pointer. Buttons lean toward the cursor and spring back. */
    var magnets = Array.prototype.slice.call(
      document.querySelectorAll('.pill, .btn, .cta__circle, .tst__btn, .srow__icon, .why__social a')
    );
    magnets.forEach(function (el) {
      var strength = el.classList.contains('cta__circle') ? 0.34 : 0.22;
      el.addEventListener('pointermove', function (e) {
        var b = el.getBoundingClientRect();
        var dx = (e.clientX - (b.left + b.width / 2)) * strength;
        var dy = (e.clientY - (b.top + b.height / 2)) * strength;
        el.style.transform = 'translate3d(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px,0)';
      });
      el.addEventListener('pointerleave', function () {
        el.animate(
          [{ transform: el.style.transform || 'none' }, { transform: 'translate3d(0,0,0)' }],
          { duration: 620, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' }
        );
        el.style.transform = '';
      });
    });

    /* Tilt. Work cards rotate toward the pointer in 3D. */
    Array.prototype.slice.call(document.querySelectorAll('.wk, .bento__cell')).forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var b = card.getBoundingClientRect();
        var rx = ((e.clientY - b.top) / b.height - 0.5) * -7;
        var ry = ((e.clientX - b.left) / b.width - 0.5) * 7;
        card.style.transform = 'perspective(900px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg)';
      });
      card.addEventListener('pointerleave', function () {
        card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        card.style.transform = '';
        setTimeout(function () { card.style.transition = ''; }, 620);
      });
    });

    /* Count up. Any [data-count] interpolates when it first appears. */
    var counters = Array.prototype.slice.call(document.querySelectorAll('[data-count]'));
    if (counters.length && 'IntersectionObserver' in window) {
      var co = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          co.unobserve(el);
          var end = parseFloat(el.dataset.count) || 0;
          var suffix = el.dataset.countSuffix || '';
          var t0 = performance.now();
          (function step(now) {
            var p = Math.min((now - t0) / 1400, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(end * eased) + suffix;
            if (p < 1) requestAnimationFrame(step);
          })(t0);
        });
      }, { threshold: 0.4 });
      counters.forEach(function (el) { co.observe(el); });
    }
  }

  var boot = function () { init(); menu(); tabs(); video(); articles(); montage(); dynamics(); };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
