// ===== Footer year =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Custom Cursor =====
const cursor = document.getElementById('cursor');
if (cursor && window.matchMedia('(pointer: fine)').matches) {
  let cx = 0, cy = 0, tx = 0, ty = 0;
  document.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
  const animCursor = () => {
    cx += (tx - cx) * 0.12;
    cy += (ty - cy) * 0.12;
    cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    requestAnimationFrame(animCursor);
  };
  animCursor();
  document.querySelectorAll('a, button, .capability, .work-item, .process-item, .footer-nav-large a').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
  });
}

// ===== Sticky nav: scrolled + on-light detection =====
const topnav = document.getElementById('topnav');
if (topnav) {
  // Sections that are white background — nav text should flip dark
  const lightSections = document.querySelectorAll('.manifesto, .stats-section, .thinking-section');

  const navH = topnav.offsetHeight || 64;

  const updateNav = () => {
    const scrollY = window.scrollY;
    topnav.classList.toggle('is-scrolled', scrollY > 20);
    topnav.classList.toggle('is-compact', scrollY > 20); // legacy alias

    // Detect if we're over a light section
    let onLight = false;
    lightSections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top < navH && rect.bottom > 0) onLight = true;
    });
    topnav.classList.toggle('on-light', onLight);
  };

  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });
}

// ===== Hero wordmark — per-character reveal =====
const wordmark = document.querySelector('.hero__wordmark');
if (wordmark) {
  // Wrap each character in a .char span (text may already have this in HTML, but do it here as fallback)
  const rawText = wordmark.textContent;
  const alreadyWrapped = wordmark.querySelector('.char');
  if (!alreadyWrapped) {
    wordmark.innerHTML = rawText.split('').map(c =>
      `<span class="char" aria-hidden="true">${c === ' ' ? '&nbsp;' : c}</span>`
    ).join('');
    wordmark.setAttribute('aria-label', rawText);
  }

  const chars = wordmark.querySelectorAll('.char');
  // Stagger each character
  chars.forEach((ch, i) => {
    ch.style.transitionDelay = `${80 + i * 45}ms`;
  });

  // Trigger on next tick so CSS is parsed
  requestAnimationFrame(() => {
    setTimeout(() => {
      wordmark.classList.add('is-visible');
    }, 120);
  });
}

// Eyebrow + hero footer
setTimeout(() => {
  const eyebrow = document.getElementById('heroEyebrow');
  if (eyebrow) eyebrow.classList.add('is-visible');
  document.querySelectorAll('.hero__foot').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(8px)';
    el.style.transition = 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)';
    el.style.transitionDelay = '800ms';
    setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }, 50);
  });
}, 100);

// ===== Scroll reveal — IntersectionObserver =====
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.10, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.fade-up, .img-reveal, .text-reveal').forEach(el => revealObs.observe(el));

// Process items — data-reveal
const processObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      processObs.unobserve(e.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });

document.querySelectorAll('[data-reveal], .process-item').forEach(el => processObs.observe(el));

// Legacy .reveal-legacy
const legacyRevealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      legacyRevealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal-legacy').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 6) * 60}ms`;
  legacyRevealObs.observe(el);
});

// ===== Layout system reveals — .reveal / .rise / .wipe get .is-started =====
const systemRevealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('is-started');
    systemRevealObs.unobserve(e.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });

// Exposed so pages that render rows from data.js can register them once drawn
window.observeReveals = function(root) {
  const scope = root || document;
  scope.querySelectorAll('[data-stagger]').forEach(group => {
    Array.from(group.children).forEach((child, i) => child.style.setProperty('--i', i));
  });
  scope.querySelectorAll('.reveal').forEach(block => {
    block.querySelectorAll('.line-w').forEach((w, i) => w.style.setProperty('--i', i));
  });
  scope.querySelectorAll('.reveal, .rise, .wipe').forEach(el => {
    if (!el.classList.contains('is-started')) systemRevealObs.observe(el);
  });
};

// Runs after the render listeners registered earlier in the document
document.addEventListener('DOMContentLoaded', () => window.observeReveals());

// Manifesto statement lines — staggered text reveal
const manifestoObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.text-reveal').forEach((line, i) => {
        setTimeout(() => line.classList.add('is-visible'), i * 120);
      });
      manifestoObs.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });

const manifestoSection = document.querySelector('.manifesto');
if (manifestoSection) manifestoObs.observe(manifestoSection);

// Book section text reveal
const bookRevealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.text-reveal').forEach((el, i) => {
        setTimeout(() => el.classList.add('is-visible'), i * 150);
      });
      bookRevealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });

const bookSection = document.querySelector('.book-section');
if (bookSection) bookRevealObs.observe(bookSection);

// ===== Counter animation (.js-counter) =====
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = parseFloat(el.dataset.target || el.textContent);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();
    const isDecimal = target % 1 !== 0;

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo
      const ease = 1 - Math.pow(1 - progress, 4);
      const current = target * ease;
      el.textContent = (isDecimal ? current.toFixed(1) : Math.round(current)) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    counterObs.unobserve(el);
  });
}, { threshold: 0.5 });

document.querySelectorAll('.js-counter').forEach(el => {
  // Initialise to 0 so there's no flash of the final value
  const suffix = el.dataset.suffix || '';
  el.textContent = '0' + suffix;
  counterObs.observe(el);
});

// ===== Parallax =====
const parallaxItems = [];

// Work item images (.parallax-img class)
document.querySelectorAll('.work-item__img, .parallax-img').forEach(el => {
  if (!parallaxItems.find(p => p.el === el)) {
    parallaxItems.push({ el, parent: el.closest('.work-item') || el.parentElement, speed: 0.13 });
  }
});

// All .parallax-bg elements — covers hero-image__inner, process__image-inner, etc.
document.querySelectorAll('.parallax-bg').forEach(el => {
  const parent = el.closest('.hero-image') || el.closest('.process__image') || el.parentElement;
  parallaxItems.push({ el, parent, speed: 0.10 });
});

const runParallax = () => {
  const wh = window.innerHeight;
  parallaxItems.forEach(({ el, parent, speed }) => {
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    if (rect.bottom < -100 || rect.top > wh + 100) return; // off-screen skip
    const mid = rect.top + rect.height / 2;
    const offset = (mid - wh / 2) * speed;
    el.style.transform = `translateY(${offset}px) scale(1.15)`;
  });
};

window.addEventListener('scroll', runParallax, { passive: true });
runParallax();

// ===== Work item hover effect — animate bg scale =====
document.querySelectorAll('.work-item').forEach(item => {
  const img = item.querySelector('.work-item__img');
  if (!img) return;
  item.addEventListener('mouseenter', () => { img.style.transform = 'scale(1.0) translateY(0)'; });
  item.addEventListener('mouseleave', () => { runParallax(); }); // restore parallax state
});

// ===== Work scroll: sync sticky stage with scrolled chapters (for work.html) =====
const workChapterEls = document.querySelectorAll('.work-chapter');
const workFrameEls   = document.querySelectorAll('.work-frame');
const workDotEls     = document.querySelectorAll('.work-scroll__dot');
const workScrollCounter = document.getElementById('workScrollCounter');

if (workChapterEls.length && workFrameEls.length) {
  const activateProject = (idx) => {
    workFrameEls.forEach((f, i) => f.classList.toggle('is-active', i === idx));
    workChapterEls.forEach((c, i) => c.classList.toggle('is-active', i === idx));
    workDotEls.forEach((d, i) => d.classList.toggle('is-active', i === idx));
    if (workScrollCounter) {
      workScrollCounter.textContent =
        `${String(idx + 1).padStart(2, '0')} / ${String(workChapterEls.length).padStart(2, '0')}`;
    }
  };

  const chapterIO = new IntersectionObserver(
    (entries) => {
      let best = null, bestRatio = 0;
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
          best = entry; bestRatio = entry.intersectionRatio;
        }
      });
      if (best) activateProject(parseInt(best.target.dataset.index, 10));
    },
    { threshold: [0.3, 0.5, 0.7], rootMargin: '0px 0px -25% 0px' }
  );
  workChapterEls.forEach(ch => chapterIO.observe(ch));

  workDotEls.forEach((dot, i) => {
    dot.addEventListener('click', () =>
      workChapterEls[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    );
  });
}

// ===== Mobile nav: hamburger toggle =====
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (navToggle && mobileMenu) {
  const closeMenu = () => {
    navToggle.classList.remove('is-open');
    mobileMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  };
  const openMenu = () => {
    navToggle.classList.add('is-open');
    mobileMenu.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open');
  };
  navToggle.addEventListener('click', () => {
    if (mobileMenu.classList.contains('is-open')) closeMenu(); else openMenu();
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
}
