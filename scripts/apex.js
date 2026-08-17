/* ============================================================
   APEX ROADSTER: motion and interaction for /homepage2 only.

   Vanilla port of the package's React components, in page.tsx
   order: MotionProvider, CustomCursor, Header, MobileMenu, Hero,
   VisionIntro, DriverEngineering, CinematicInterlude, Manifesto,
   RoadsterSystems, MaterialInterlude, PurposeSection, JournalList,
   ReservationSection, Footer.

   Contract:
   - No content is rendered here. Everything this file touches is
     already in homepage2.html and readable with JavaScript off.
   - prefers-reduced-motion disables Lenis and every scroll
     animation. Navigation and the menu still work.
   - If GSAP or Lenis fail to load, the page still reads and the
     menu still opens.
   ============================================================ */

(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGsap = typeof window.gsap !== 'undefined';
  var hasST = hasGsap && typeof window.ScrollTrigger !== 'undefined';
  var hasLenis = typeof window.Lenis !== 'undefined';
  var gsap = window.gsap;

  if (hasST) gsap.registerPlugin(window.ScrollTrigger);

  var lenis = null;

  /* ---------------------------------------------------------
     MotionProvider
     Lenis smooth scroll wired into the GSAP ticker and
     ScrollTrigger. Anchor clicks route through Lenis.
     --------------------------------------------------------- */
  function initMotionProvider() {
    if (reduced || !hasLenis || !hasGsap) return;

    lenis = new window.Lenis({
      duration: 1.15,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true,
      touchMultiplier: 1.6
    });

    if (hasST) lenis.on('scroll', window.ScrollTrigger.update);

    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  // Anchor navigation. Uses Lenis when it is running, native
  // smooth scroll otherwise, so links work in every case.
  function initAnchors() {
    document.addEventListener('click', function (e) {
      var anchor = e.target.closest && e.target.closest('a[href^="#"]');
      if (!anchor) return;
      var id = anchor.getAttribute('href');
      if (!id || id === '#') return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(el, { duration: 1.4 });
      } else {
        el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
      }
    });
  }

  /* ---------------------------------------------------------
     CustomCursor
     Delayed ring follow, centre dot, contextual label,
     difference blend. Disabled on touch.
     --------------------------------------------------------- */
  function initCursor() {
    var isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (isTouch) return;

    var root = document.querySelector('.apex-cursor');
    if (!root) return;
    var ring = root.querySelector('.apex-cursor__ring');
    var dot = root.querySelector('.apex-cursor__dot');
    var label = root.querySelector('.apex-cursor__label');
    if (!ring || !dot || !label) return;

    document.body.classList.add('has-custom-cursor');

    var x = window.innerWidth / 2;
    var y = window.innerHeight / 2;
    var ringX = x, ringY = y;
    var visible = false;

    root.style.opacity = '0';
    root.style.transition = 'opacity 300ms ease';

    window.addEventListener('mousemove', function (e) {
      x = e.clientX;
      y = e.clientY;
      if (!visible) {
        visible = true;
        root.style.opacity = '1';
        ringX = x; ringY = y;
      }

      var t = e.target;
      var interactive = t.closest && t.closest('a, button, [data-cursor]');
      var labelTarget = t.closest && t.closest('[data-cursor-label]');

      if (labelTarget) {
        root.classList.add('has-label');
        root.classList.remove('is-active');
        label.textContent = labelTarget.dataset.cursorLabel || '';
      } else if (interactive) {
        root.classList.add('is-active');
        root.classList.remove('has-label');
      } else {
        root.classList.remove('is-active', 'has-label');
      }
    }, { passive: true });

    (function loop() {
      ringX += (x - ringX) * 0.16;
      ringY += (y - ringY) * 0.16;
      ring.style.transform = 'translate(' + ringX + 'px, ' + ringY + 'px) translate(-50%, -50%)';
      dot.style.transform = 'translate(' + x + 'px, ' + y + 'px) translate(-50%, -50%)';
      requestAnimationFrame(loop);
    })();
  }

  /* ---------------------------------------------------------
     Header
     Transparent over the hero, flips to dark text over light
     sections.

     The source sampled document.elementFromPoint() to decide
     the theme, but the fixed header itself sits at that point,
     so the sample always returned the header and the theme
     never changed. This reads the section geometry instead,
     which is what the reference calls for.
     --------------------------------------------------------- */
  function initHeader() {
    var header = document.querySelector('.apex-header');
    if (!header) return;

    var sections = Array.prototype.slice.call(document.querySelectorAll('[data-theme]'));
    if (!sections.length) return;

    var probeY = 40; // header centre line
    var current = null;

    function update() {
      var theme = 'dark';
      for (var i = 0; i < sections.length; i++) {
        var r = sections[i].getBoundingClientRect();
        if (r.top <= probeY && r.bottom > probeY) {
          theme = sections[i].getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        }
      }
      if (theme !== current) {
        current = theme;
        header.setAttribute('data-header-theme', theme);
      }
    }

    update();

    // Driven from the GSAP ticker rather than a scroll event, and
    // gated on the scroll position actually changing. Lenis, native
    // scrolling, anchor jumps and programmatic scrollTo all move the
    // page by different routes, and only the ticker sees all of them.
    var lastY = -1;
    function tick() {
      var y = window.scrollY;
      if (y === lastY) return;
      lastY = y;
      update();
    }

    if (hasGsap) {
      gsap.ticker.add(tick);
    } else {
      window.addEventListener('scroll', update, { passive: true });
    }
    window.addEventListener('resize', function () { lastY = -1; update(); });
  }

  /* ---------------------------------------------------------
     MobileMenu
     Clip-path wipe with staggered link reveal. Escape closes.
     Falls back to a plain show/hide without GSAP.
     --------------------------------------------------------- */
  function initMobileMenu() {
    var menu = document.getElementById('apex-mobile-menu');
    var burger = document.querySelector('[data-menu-open]');
    if (!menu || !burger) return;

    var links = menu.querySelectorAll('.mobile-menu__link > span');
    var closeBtn = menu.querySelector('[data-menu-close]');
    var open = false;

    menu.inert = true;

    function setOpen(next) {
      if (next === open) return;
      open = next;
      burger.setAttribute('aria-expanded', String(open));
      menu.inert = !open;

      if (!hasGsap || reduced) {
        menu.style.visibility = open ? 'visible' : 'hidden';
        menu.style.clipPath = open ? 'inset(0% 0 0% 0)' : 'inset(0 0 100% 0)';
        if (open && closeBtn) closeBtn.focus();
        else if (!open) burger.focus();
        return;
      }

      if (open) {
        gsap.set(menu, { visibility: 'visible' });
        gsap.timeline()
          .to(menu, { clipPath: 'inset(0% 0 0% 0)', duration: 0.7, ease: 'power4.inOut' })
          .fromTo(links,
            { yPercent: 110 },
            { yPercent: 0, duration: 0.8, ease: 'power4.out', stagger: 0.06 },
            '-=0.25');
        if (closeBtn) closeBtn.focus();
      } else {
        gsap.to(menu, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.55,
          ease: 'power4.inOut',
          onComplete: function () { gsap.set(menu, { visibility: 'hidden' }); }
        });
        burger.focus();
      }
    }

    burger.addEventListener('click', function () { setOpen(true); });
    Array.prototype.forEach.call(menu.querySelectorAll('[data-menu-close]'), function (el) {
      el.addEventListener('click', function () { setOpen(false); });
    });
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && open) setOpen(false);
    });
  }

  /* ---------------------------------------------------------
     Hero
     Composed load: media mask + video scale, masked line
     entrance, staggered support copy.
     --------------------------------------------------------- */
  function initHero() {
    var root = document.querySelector('.hero');
    if (!root || reduced || !hasGsap) return;

    gsap.context(function () {
      gsap.timeline({ delay: 0.25 })
        .fromTo('.hero__media-mask',
          { clipPath: 'inset(8% 6% 8% 6%)', scale: 1.04 },
          { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1.5, ease: 'power4.inOut' })
        .fromTo('.hero__video',
          { scale: 1.12 },
          { scale: 1, duration: 1.9, ease: 'power3.out' }, 0)
        .fromTo('.hero__line > span',
          { yPercent: 110 },
          { yPercent: 0, duration: 1.05, ease: 'power4.out', stagger: 0.09 }, 0.55)
        .fromTo(['.hero__support', '.hero__meta', '.hero__cta'],
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.09 }, 0.95);
    }, root);
  }

  /* ---------------------------------------------------------
     VisionIntro
     Masked headline, copy fade, floating media wipe + parallax.
     --------------------------------------------------------- */
  function initVision() {
    var root = document.querySelector('.vision');
    if (!root || reduced || !hasST) return;

    gsap.context(function () {
      gsap.fromTo('.vision__line > span',
        { yPercent: 110 },
        { yPercent: 0, duration: 1.05, ease: 'power4.out', stagger: 0.09,
          scrollTrigger: { trigger: root, start: 'top 72%' } });

      gsap.fromTo(['.vision__body', '.vision__label'],
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: root, start: 'top 66%' } });

      gsap.fromTo('.vision__float',
        { clipPath: 'inset(100% 0 0 0)' },
        { clipPath: 'inset(0% 0 0 0)', duration: 1.3, ease: 'power4.inOut',
          scrollTrigger: { trigger: root, start: 'top 60%' } });

      gsap.to('.vision__float', {
        yPercent: -14, ease: 'none',
        scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    }, root);
  }

  /* ---------------------------------------------------------
     DriverEngineering
     Media wipe + scale, staggered copy reveal.
     --------------------------------------------------------- */
  function initDriver() {
    var root = document.querySelector('.driver');
    if (!root || reduced || !hasST) return;

    gsap.context(function () {
      gsap.fromTo('.driver__media',
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 1.35, ease: 'power4.inOut',
          scrollTrigger: { trigger: root, start: 'top 70%' } });

      gsap.fromTo('.driver__media img',
        { scale: 1.08 },
        { scale: 1, duration: 1.6, ease: 'power3.out',
          scrollTrigger: { trigger: root, start: 'top 70%' } });

      gsap.fromTo('.driver__reveal',
        { autoAlpha: 0, y: 26 },
        { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.09,
          scrollTrigger: { trigger: '.driver__copy', start: 'top 74%' } });
    }, root);
  }

  /* ---------------------------------------------------------
     CinematicInterlude
     Inset ultrawide band scroll-scales to full bleed, pinned.
     --------------------------------------------------------- */
  function initCinematic() {
    var root = document.querySelector('.cine');
    if (!root || reduced || !hasST) return;

    gsap.context(function () {
      var media = '.cine__media';
      gsap.set(media, { clipPath: 'inset(12% 8% 12% 8% round 18px)', scale: 0.94 });
      gsap.timeline({
        scrollTrigger: {
          trigger: root, start: 'top top', end: '+=120%',
          scrub: true, pin: true, anticipatePin: 1
        }
      })
        .to(media, { clipPath: 'inset(0% 0% 0% 0% round 0px)', scale: 1, ease: 'none' })
        .to(media, { scale: 1.04, ease: 'none' });
    }, root);
  }

  /* ---------------------------------------------------------
     Manifesto
     Masked headline, copy fade, three layered images at
     differential parallax rates.
     --------------------------------------------------------- */
  function initManifesto() {
    var root = document.querySelector('.mani');
    if (!root || reduced || !hasST) return;

    gsap.context(function () {
      gsap.fromTo('.mani__line > span',
        { yPercent: 110 },
        { yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: 0.1,
          scrollTrigger: { trigger: root, start: 'top 68%' } });

      gsap.fromTo(['.mani__body', '.mani__statement', '.mani__label'],
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: root, start: 'top 60%' } });

      var floats = [
        ['.mani__img--wide', -18],
        ['.mani__img--small', -34],
        ['.mani__img--vertical', -10]
      ];
      floats.forEach(function (pair) {
        var sel = pair[0], amt = pair[1];
        gsap.to(sel, {
          yPercent: amt, ease: 'none',
          scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: true }
        });
        gsap.fromTo(sel,
          { clipPath: 'inset(100% 0 0 0)' },
          { clipPath: 'inset(0% 0 0 0)', duration: 1.3, ease: 'power4.inOut',
            scrollTrigger: { trigger: root, start: 'top 62%' } });
      });
    }, root);
  }

  /* ---------------------------------------------------------
     RoadsterSystems
     Per-card media wipe + scale and staggered content reveal.
     --------------------------------------------------------- */
  function initSystems() {
    var root = document.querySelector('.systems');
    if (!root || reduced || !hasST) return;

    gsap.context(function () {
      gsap.utils.toArray('.system-card').forEach(function (card) {
        var mediaBox = card.querySelector('.system-card__media');
        var media = card.querySelector('.system-card__media img');
        var reveals = card.querySelectorAll('.system-card__reveal');

        gsap.fromTo(mediaBox,
          { clipPath: 'inset(0 0 100% 0)' },
          { clipPath: 'inset(0 0 0% 0)', duration: 1.2, ease: 'power4.inOut',
            scrollTrigger: { trigger: card, start: 'top 72%' } });

        if (media) {
          gsap.fromTo(media,
            { scale: 1.1 },
            { scale: 1, duration: 1.5, ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 72%' } });
        }

        gsap.fromTo(reveals,
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.85, ease: 'power3.out', stagger: 0.08,
            scrollTrigger: { trigger: card, start: 'top 66%' } });
      });
    }, root);
  }

  /* ---------------------------------------------------------
     MaterialInterlude
     Scrubbed scale, breathing space between blocks.
     --------------------------------------------------------- */
  function initMaterial() {
    var root = document.querySelector('.material');
    if (!root || reduced || !hasST) return;

    gsap.context(function () {
      gsap.fromTo('.material__img',
        { scale: 1.12 },
        { scale: 1, ease: 'none',
          scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: true } });
    }, root);
  }

  /* ---------------------------------------------------------
     PurposeSection
     Pinned centre copy while the mosaic scrubs horizontally
     behind it.

     The pin runs above 700px only. At and below that width the
     stylesheet turns the track into a native scroll-snap strip,
     and pinning would fight it.
     --------------------------------------------------------- */
  function initPurpose() {
    var root = document.querySelector('.purpose');
    if (!root || reduced || !hasST) return;

    gsap.context(function () {
      gsap.fromTo('.purpose__line > span',
        { yPercent: 110 },
        { yPercent: 0, duration: 1, ease: 'power4.out', stagger: 0.09,
          scrollTrigger: { trigger: root, start: 'top 70%' } });
    }, root);

    if (typeof gsap.matchMedia !== 'function') return;

    gsap.matchMedia().add('(min-width: 701px)', function () {
      var track = root.querySelector('.purpose__track');
      if (!track) return;

      var getAmount = function () {
        return Math.max(0, track.scrollWidth - window.innerWidth);
      };

      gsap.to(track, {
        x: function () { return -getAmount(); },
        ease: 'none',
        scrollTrigger: {
          trigger: root, start: 'top top',
          end: function () { return '+=' + getAmount(); },
          scrub: true, pin: true, anticipatePin: 1, invalidateOnRefresh: true
        }
      });

      gsap.utils.toArray('.purpose__card').forEach(function (card, i) {
        gsap.to(card, {
          yPercent: i % 2 ? -12 : 12,
          ease: 'none',
          scrollTrigger: {
            trigger: root, start: 'top top',
            end: function () { return '+=' + getAmount(); },
            scrub: true
          }
        });
      });
    });
  }

  /* ---------------------------------------------------------
     JournalList
     Staggered row entrance. Hover states are CSS.
     --------------------------------------------------------- */
  function initJournal() {
    var root = document.querySelector('.journal');
    if (!root || reduced || !hasST) return;

    gsap.context(function () {
      gsap.fromTo('.journal__row',
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08,
          scrollTrigger: { trigger: root, start: 'top 72%' } });
    }, root);
  }

  /* ---------------------------------------------------------
     ReservationSection
     Masked headline, copy reveal, magnetic circular CTA.
     --------------------------------------------------------- */
  function initReservation() {
    var root = document.querySelector('.res');
    if (!root || reduced || !hasGsap) return;

    if (hasST) {
      gsap.context(function () {
        gsap.fromTo('.res__line > span',
          { yPercent: 110 },
          { yPercent: 0, duration: 1.05, ease: 'power4.out', stagger: 0.1,
            scrollTrigger: { trigger: root, start: 'top 70%' } });

        gsap.fromTo(['.res__body', '.res__cta', '.res__secondary'],
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1,
            scrollTrigger: { trigger: root, start: 'top 62%' } });
      }, root);
    }

    var cta = root.querySelector('.circle-cta');
    if (!cta || typeof gsap.quickTo !== 'function') return;
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

    var xTo = gsap.quickTo(cta, 'x', { duration: 0.5, ease: 'power3.out' });
    var yTo = gsap.quickTo(cta, 'y', { duration: 0.5, ease: 'power3.out' });

    window.addEventListener('mousemove', function (e) {
      var r = cta.getBoundingClientRect();
      var dx = e.clientX - (r.left + r.width / 2);
      var dy = e.clientY - (r.top + r.height / 2);
      var dist = Math.hypot(dx, dy);
      var radius = 140;
      if (dist < radius) {
        var pull = (1 - dist / radius) * 0.35;
        xTo(dx * pull);
        yTo(dy * pull);
      } else {
        xTo(0);
        yTo(0);
      }
    }, { passive: true });

    cta.addEventListener('mouseleave', function () { xTo(0); yTo(0); });
  }

  /* ---------------------------------------------------------
     Footer
     Back to top, routed through Lenis when it is running.
     --------------------------------------------------------- */
  function initFooter() {
    var btn = document.querySelector('[data-to-top]');
    if (!btn) return;
    btn.addEventListener('click', function () {
      if (lenis) lenis.scrollTo(0, { duration: 1.4 });
      else window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    });
  }

  /* --------------------------------------------------------- */

  function boot() {
    initMotionProvider();
    initAnchors();
    initCursor();
    initHeader();
    initMobileMenu();
    initHero();
    initVision();
    initDriver();
    initCinematic();
    initManifesto();
    initSystems();
    initMaterial();
    initPurpose();
    initJournal();
    initReservation();
    initFooter();

    // Pinned sections change document height as media decodes.
    if (hasST) {
      window.addEventListener('load', function () { window.ScrollTrigger.refresh(); });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
