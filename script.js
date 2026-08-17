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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
