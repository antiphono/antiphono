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

  var boot = function () { init(); menu(); tabs(); video(); };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
