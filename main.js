/* ═══════════════════════════════════════════════════════════════
   Microtel Inn & Suites by Wyndham — Williston, ND
   main.js  |  Shared JS — loader, navbar, drawer, scroll animations
═══════════════════════════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);

const WYNDHAM_URL =
  'https://www.wyndhamhotels.com/microtel/williston-north-dakota/microtel-williston/overview';

/* ─────────────────────────────────────────────────────────────
   LOADER (home page only — skipped on sub-pages)
─────────────────────────────────────────────────────────────── */
const loaderEl = document.getElementById('loader');

if (loaderEl) {
  window.addEventListener('load', () => {
    const tl = gsap.timeline();
    tl.to('#ldLogo', { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' })
      .to('#ldBar',  { width: '100%', duration: 1.5, ease: 'power2.inOut' }, '-=0.3')
      .to('#loader', {
        yPercent: -100, duration: 0.9, ease: 'power3.inOut', delay: 0.2,
        onComplete() {
          loaderEl.style.display = 'none';
          runHeroEntrance();
          initScrollAnimations();
        }
      });
  });
} else {
  /* Sub-pages: run scroll animations after DOM is ready */
  window.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
  });
}

/* ─────────────────────────────────────────────────────────────
   HERO ENTRANCE (home page only)
─────────────────────────────────────────────────────────────── */
function runHeroEntrance() {
  gsap.to('#hChip',    { opacity: 1, y: 0, duration: 0.75, delay: 0.05, ease: 'power3.out' });
  gsap.to('#hTitle',   { opacity: 1, y: 0, duration: 0.85, delay: 0.22, ease: 'power3.out' });
  gsap.to('#hPara',    { opacity: 1, y: 0, duration: 0.80, delay: 0.38, ease: 'power3.out' });
  gsap.to('#hActions', { opacity: 1, y: 0, duration: 0.75, delay: 0.52, ease: 'power3.out' });
  gsap.to('#hCard',    { opacity: 1, y: 0, scale: 1, duration: 0.85, delay: 0.44, ease: 'power3.out' });
  gsap.to('#hScroll',  { opacity: 1, duration: 0.6, delay: 0.98, ease: 'power2.out' });

  const statEls = ['st0','st1','st2','st3','st4']
    .map(id => document.getElementById(id)).filter(Boolean);
  if (statEls.length) {
    gsap.to(statEls, { opacity: 1, y: 0, duration: 0.55, stagger: 0.09, delay: 0.78, ease: 'power3.out' });
  }
}

/* ─────────────────────────────────────────────────────────────
   SCROLL-TRIGGERED ANIMATIONS
─────────────────────────────────────────────────────────────── */
function initScrollAnimations() {
  ScrollTrigger.getAll().forEach(t => t.kill());

  const heroBg = document.getElementById('heroBg');
  if (heroBg) {
    gsap.to('#heroBg', {
      yPercent: 22, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });
  }

  const parBg = document.getElementById('parBg');
  if (parBg) {
    gsap.to('#parBg', {
      yPercent: 28, ease: 'none',
      scrollTrigger: { trigger: '#parSec', start: 'top bottom', end: 'bottom top', scrub: true }
    });
  }

  const ctaBg = document.getElementById('ctaBg');
  if (ctaBg) {
    gsap.to('#ctaBg', {
      yPercent: 22, ease: 'none',
      scrollTrigger: { trigger: '.cta-sec', start: 'top bottom', end: 'bottom top', scrub: true }
    });
  }

  const dHeroBg = document.querySelector('.d-hero-bg');
  if (dHeroBg) {
    gsap.to('.d-hero-bg', {
      yPercent: 18, ease: 'none',
      scrollTrigger: { trigger: '.d-hero', start: 'top top', end: 'bottom top', scrub: true }
    });
  }

  /* Generic fade-up .reveal */
  gsap.utils.toArray('.reveal').forEach(el => {
    if (['hChip','hTitle','hPara','hActions','hCard','hScroll'].includes(el.id)) return;
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.88, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 91%', once: true }
    });
  });

  /* Slide-from-left .reveal-l */
  gsap.utils.toArray('.reveal-l').forEach(el => {
    gsap.to(el, {
      opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 89%', once: true }
    });
  });

  /* Slide-from-right .reveal-r */
  gsap.utils.toArray('.reveal-r').forEach(el => {
    gsap.to(el, {
      opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 89%', once: true }
    });
  });

  /* Staggered .reveal-up cards */
  const upParents = new Set();
  gsap.utils.toArray('.reveal-up').forEach(el => upParents.add(el.parentElement));
  upParents.forEach(parent => {
    const children = parent.querySelectorAll('.reveal-up');
    gsap.to(children, {
      opacity: 1, y: 0, duration: 0.78, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: parent, start: 'top 88%', once: true }
    });
  });
}

/* ─────────────────────────────────────────────────────────────
   NAVBAR — glass mode toggle
─────────────────────────────────────────────────────────────── */
const siteNav = document.getElementById('siteNav');
const isHomePage = !!document.getElementById('heroSec');

function updateNavMode() {
  if (!isHomePage) {
    siteNav.classList.add('light');
    return;
  }
  const pastHero = window.scrollY > window.innerHeight * 0.78;
  const scrolledUp = window.scrollY <= 60;
  if (scrolledUp) {
    siteNav.classList.remove('light');
  } else {
    siteNav.classList.toggle('light', pastHero);
  }
}

window.addEventListener('scroll', updateNavMode, { passive: true });
updateNavMode();

/* ─────────────────────────────────────────────────────────────
   HAMBURGER / MOBILE DRAWER
─────────────────────────────────────────────────────────────── */
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

if (navHam)   navHam.addEventListener('click', openDrawer);
if (mobClose) mobClose.addEventListener('click', closeDrawer);

/* Close drawer when clicking a link */
if (mobDrawer) {
  mobDrawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeDrawer);
  });
}
