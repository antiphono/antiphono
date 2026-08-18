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



  /* ============================================================
     ANTIPHONO MODULES
     ------------------------------------------------------------
     Merged from script.js on 18 August 2026 so the site has one
     behaviour file. Every module below early-returns when its
     elements are absent, so each page runs only what it has.

     `reduced` is not redeclared here; it comes from the Apex
     scope above. script.js's `root` was renamed `docEl` so it
     cannot shadow anything.
     ============================================================ */


  var docEl = document.documentElement;
  docEl.classList.remove('no-js');

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
    // Pages name the panel differently: index uses #menu, /about uses
    // #mobileMenu. Accept either, and fall back to the toggle's own
    // aria-controls so new pages need no change here.
    var toggle = document.getElementById('navToggle');
    if (!toggle) return;
    var controls = toggle.getAttribute('aria-controls');
    var panel = (controls && document.getElementById(controls))
             || document.getElementById('menu')
             || document.getElementById('mobileMenu')
             || document.querySelector('.mobile-menu');
    if (!panel) return;

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

  /* ---- Hero 3D screen deck -----------------------------------
     A real 3D presentation: each screen is positioned in the stage's
     perspective space and animated on the Y axis with depth.

     One screen faces the camera at a time. Advancing rotates the
     outgoing screen away and pushes it back along Z while the next
     rotates in from the opposite side. Every keyframe is driven
     through the Web Animations API so the timelines can be
     interrupted mid-flight when someone drags or clicks.

     Reduced motion shows the first screen, still. */
  function deck() {
    var el = document.getElementById('deck');
    if (!el || !Element.prototype.animate) return;

    var screens = Array.prototype.slice.call(el.querySelectorAll('.screen'));
    if (!screens.length) return;

    var caption = document.getElementById('deckCaption');
    var labels = (el.dataset.captions || '').split('|').map(function (t) { return t.trim(); });

    var EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';
    var IN_DUR = 1500, OUT_DUR = 1100, HOLD = 3400;
    var index = 0, timer = null, busy = false;

    // Resting pose: face on, slight tilt so it reads as an object in space.
    var REST = 'translate3d(0,0,0) rotateY(0deg) rotateX(2deg) scale(1)';

    function place(node, pose, opacity) {
      node.style.transform = pose;
      node.style.opacity = opacity;
    }

    // Start every screen parked off to the right, deep in Z.
    screens.forEach(function (sc) {
      place(sc, 'translate3d(58%, 0, -900px) rotateY(52deg) rotateX(2deg) scale(0.82)', 0);
    });
    place(screens[0], REST, 1);
    if (caption) caption.textContent = labels[0] || '';

    if (reduced) return;

    function show(next) {
      if (busy || next === index) return;
      busy = true;

      var out = screens[index];
      var incoming = screens[next];

      out.animate([
        { transform: REST, opacity: 1 },
        { transform: 'translate3d(-58%, 0, -900px) rotateY(-52deg) rotateX(2deg) scale(0.82)', opacity: 0 }
      ], { duration: OUT_DUR, easing: EASE, fill: 'forwards' });

      incoming.animate([
        { transform: 'translate3d(58%, 0, -900px) rotateY(52deg) rotateX(2deg) scale(0.82)', opacity: 0 },
        { transform: REST, opacity: 1 }
      ], { duration: IN_DUR, easing: EASE, fill: 'forwards' }).finished
        .then(function () { busy = false; })
        .catch(function () { busy = false; });

      if (caption) {
        caption.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 240, easing: EASE, fill: 'forwards' }).finished
          .then(function () {
            caption.textContent = labels[next] || '';
            caption.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 420, easing: EASE, fill: 'forwards' });
          }).catch(function () {});
      }

      index = next;
    }

    function advance() { show((index + 1) % screens.length); }
    function start() { stop(); timer = setInterval(advance, HOLD); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }

    // A slow float on the whole deck, so the stage is never dead still.
    el.animate([
      { transform: 'rotateY(-3deg) rotateX(0.5deg)' },
      { transform: 'rotateY(3deg) rotateX(-0.5deg)' },
      { transform: 'rotateY(-3deg) rotateX(0.5deg)' }
    ], { duration: 16000, iterations: Infinity, easing: 'ease-in-out' });

    // Pointer parallax: the camera leans toward the cursor.
    var hero = el.closest('.herov') || document.body;
    hero.addEventListener('pointermove', function (e) {
      var b = hero.getBoundingClientRect();
      var px = (e.clientX - b.left) / b.width - 0.5;
      var py = (e.clientY - b.top) / b.height - 0.5;
      el.parentElement.style.perspectiveOrigin =
        (50 + px * 18).toFixed(1) + '% ' + (45 + py * 14).toFixed(1) + '%';
    });

    // Drag to scrub between screens.
    var downX = null;
    el.addEventListener('pointerdown', function (e) { downX = e.clientX; stop(); });
    window.addEventListener('pointerup', function (e) {
      if (downX === null) return;
      var dx = e.clientX - downX;
      if (Math.abs(dx) > 60) {
        show(dx < 0 ? (index + 1) % screens.length
                    : (index - 1 + screens.length) % screens.length);
      }
      downX = null;
      start();
    });

    // Only run while the hero is on screen and the tab is visible.
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (entry) { entry.isIntersecting ? start() : stop(); });
      }, { threshold: 0.15 }).observe(el);
    } else {
      start();
    }
    document.addEventListener('visibilitychange', function () {
      document.visibilityState === 'visible' ? start() : stop();
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
      document.querySelectorAll('.wk__media, .why__figure img, .ft__figure img, .mrow__figure img')
    );
    layers.forEach(function (el, i) { el.dataset.depth = (0.06 + (i % 3) * 0.04).toFixed(2); });
    function parallax() {
      var vh = window.innerHeight;
      layers.forEach(function (el) {
        var box = el.getBoundingClientRect();
        if (box.bottom < 0 || box.top > vh) return;
        var mid = box.top + box.height / 2;
        var offset = (mid - vh / 2) * parseFloat(el.dataset.depth);
        // Wrappers only translate. Scale stays on the child so hover
        // transforms are not overwritten by this inline style.
        var scale = el.classList.contains('wk__media') ? '' : ' scale(1.12)';
        el.style.transform = 'translate3d(0,' + (-offset).toFixed(2) + 'px,0)' + scale;
      });
    }
    jobs.push(parallax);

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    schedule();

    /* Magnetic pointer. Buttons lean toward the cursor and spring back. */
    var magnets = Array.prototype.slice.call(
      document.querySelectorAll('.pill, .btn, .cta__circle')
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

    // Antiphono modules. Each is a no-op on pages without its markup.
    init();
    menu();
    tabs();
    video();
    articles();
    deck();
    dynamics();

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
