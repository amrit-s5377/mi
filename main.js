/* ═══════════════════════════════════════════════════════
   Microtel Inn & Suites by Wyndham — Williston, ND
   main.js  |  Requires: GSAP 3 + ScrollTrigger (via CDN)
═══════════════════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────────────────────
   LOADER
──────────────────────────────────────── */
window.addEventListener('load', () => {
  const tl = gsap.timeline();

  tl.to('#ldLogo',  { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' })
    .to('#ldBar',   { width: '100%', duration: 1.5, ease: 'power2.inOut' }, '-=0.3')
    .to('#loader',  {
      yPercent: -100,
      duration: 0.9,
      ease: 'power3.inOut',
      delay: 0.25,
      onComplete() {
        document.getElementById('loader').style.display = 'none';
        runHeroEntrance();
        initScrollAnimations();
      }
    });
});

/* ────────────────────────────────────────
   HERO ENTRANCE
──────────────────────────────────────── */
function runHeroEntrance() {
  // Staggered reveal of hero elements
  gsap.to('#hChip',    { opacity: 1, y: 0, duration: 0.75, delay: 0.05, ease: 'power3.out' });
  gsap.to('#hTitle',   { opacity: 1, y: 0, duration: 0.85, delay: 0.20, ease: 'power3.out' });
  gsap.to('#hPara',    { opacity: 1, y: 0, duration: 0.80, delay: 0.36, ease: 'power3.out' });
  gsap.to('#hActions', { opacity: 1, y: 0, duration: 0.75, delay: 0.50, ease: 'power3.out' });
  gsap.to('#hCard',    { opacity: 1, y: 0, scale: 1, duration: 0.85, delay: 0.42, ease: 'power3.out' });
  gsap.to('#hScroll',  { opacity: 1, duration: 0.6, delay: 0.95, ease: 'power2.out' });

  // Stat bar items stagger in
  gsap.to([
    document.getElementById('st0'),
    document.getElementById('st1'),
    document.getElementById('st2'),
    document.getElementById('st3'),
    document.getElementById('st4')
  ], {
    opacity: 1, y: 0,
    duration: 0.55,
    stagger: 0.09,
    delay: 0.75,
    ease: 'power3.out'
  });
}

/* ────────────────────────────────────────
   SCROLL-TRIGGERED ANIMATIONS
──────────────────────────────────────── */
function initScrollAnimations() {
  // Kill existing triggers before re-initialising (needed after page transitions)
  ScrollTrigger.getAll().forEach(t => t.kill());

  /* ── Parallax: hero background ── */
  gsap.to('#heroBg', {
    yPercent: 22,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  /* ── Parallax: mid-page quote band ── */
  gsap.to('#parBg', {
    yPercent: 28,
    ease: 'none',
    scrollTrigger: {
      trigger: '#parSec',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });

  /* ── Parallax: CTA section background ── */
  gsap.to('#ctaBg', {
    yPercent: 22,
    ease: 'none',
    scrollTrigger: {
      trigger: '.cta-sec',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });

  /* ── Generic .reveal (fade-up) ── */
  gsap.utils.toArray('.reveal').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.88,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 91%',
        once: true
      }
    });
  });

  /* ── .reveal-l (slide from left) ── */
  gsap.utils.toArray('.reveal-l').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      x: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 89%',
        once: true
      }
    });
  });

  /* ── .reveal-r (slide from right) ── */
  gsap.utils.toArray('.reveal-r').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      x: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 89%',
        once: true
      }
    });
  });

  /* ── .reveal-up (cards with stagger) ── */
  // Group siblings under the same parent for staggered effect
  const upParents = new Set();
  gsap.utils.toArray('.reveal-up').forEach(el => upParents.add(el.parentElement));

  upParents.forEach(parent => {
    const children = parent.querySelectorAll('.reveal-up');
    gsap.to(children, {
      opacity: 1,
      y: 0,
      duration: 0.78,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: parent,
        start: 'top 88%',
        once: true
      }
    });
  });
}

/* ────────────────────────────────────────
   NAVBAR — glass mode toggle
──────────────────────────────────────── */
const siteNav = document.getElementById('siteNav');

function updateNavMode() {
  const heroHeight = window.innerHeight * 0.78;
  const scrolled   = window.scrollY > heroHeight;
  const isDetail   = document.getElementById('detailPg').classList.contains('active');

  if (isDetail) {
    siteNav.classList.add('light');
    return;
  }
  siteNav.classList.toggle('light', scrolled && window.scrollY > 60);

  // Always show dark glass while in hero zone
  if (window.scrollY <= 60) siteNav.classList.remove('light');
}

window.addEventListener('scroll', updateNavMode, { passive: true });
updateNavMode(); // run once on init

/* ────────────────────────────────────────
   HAMBURGER / MOBILE DRAWER
──────────────────────────────────────── */
const navHam    = document.getElementById('navHam');
const mobDrawer = document.getElementById('mobDrawer');
const mobClose  = document.getElementById('mobClose');

function openDrawer() {
  navHam.classList.add('open');
  mobDrawer.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  navHam.classList.remove('open');
  mobDrawer.classList.remove('open');
  document.body.style.overflow = '';
}

navHam.addEventListener('click', openDrawer);
mobClose.addEventListener('click', closeDrawer);

/* ────────────────────────────────────────
   SMOOTH SCROLL HELPER
   Handles both landing and detail page states
──────────────────────────────────────── */
function navScrollTo(sectionId) {
  closeDrawer();

  const landingIsActive = document.getElementById('landingPg').classList.contains('active');

  if (!landingIsActive) {
    // We are on the detail page — go home first, then scroll after transition
    goHome(() => {
      setTimeout(() => {
        const target = document.getElementById(sectionId);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    });
    return;
  }

  const target = document.getElementById(sectionId);
  if (target) target.scrollIntoView({ behavior: 'smooth' });
}

/* ────────────────────────────────────────
   PAGE TRANSITIONS
──────────────────────────────────────── */
function goHome(callback) {
  closeDrawer();

  const detailPg  = document.getElementById('detailPg');
  const landingPg = document.getElementById('landingPg');

  if (!detailPg.classList.contains('active')) {
    // Already on landing — just scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof callback === 'function') callback();
    return;
  }

  gsap.to(detailPg, {
    opacity: 0,
    y: 16,
    duration: 0.38,
    ease: 'power2.in',
    onComplete() {
      detailPg.classList.remove('active');
      landingPg.classList.add('active');
      window.scrollTo({ top: 0 });

      gsap.fromTo(landingPg,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' }
      );

      updateNavMode();
      setTimeout(() => {
        initScrollAnimations();
        if (typeof callback === 'function') callback();
      }, 80);
    }
  });
}

function openDetail() {
  closeDrawer();

  const landingPg = document.getElementById('landingPg');
  const detailPg  = document.getElementById('detailPg');

  // Set the detail hero image
  document.getElementById('dHeroBg').style.backgroundImage =
    "url('https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=2200&q=90')";

  gsap.to(landingPg, {
    opacity: 0,
    y: -14,
    duration: 0.38,
    ease: 'power2.in',
    onComplete() {
      landingPg.classList.remove('active');
      detailPg.classList.add('active');
      window.scrollTo({ top: 0 });

      siteNav.classList.add('light');

      gsap.fromTo(detailPg,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }
      );

      // Detail hero parallax
      ScrollTrigger.getAll().forEach(t => t.kill());

      gsap.to('#dHeroBg', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: '.d-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }
  });
}