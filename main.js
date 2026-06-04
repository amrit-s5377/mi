/* ═══════════════════════════════════════════════════════════════
   Microtel Inn & Suites by Wyndham — Williston, ND
   main.js  |  Shared JS — loader, navbar, drawer, scroll animations
═══════════════════════════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);

const WYNDHAM_URL =
  'https://www.wyndhamhotels.com/microtel/williston-north-dakota/microtel-williston/overview';

/* ─────────────────────────────────────────────────────────────
   REDUCED MOTION — check once at startup
   CSS already sets animated elements to opacity:1/transform:none
   when this is true; JS skips the GSAP calls entirely.
─────────────────────────────────────────────────────────────── */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ─────────────────────────────────────────────────────────────
   LOADER (home page only — skipped on sub-pages)
─────────────────────────────────────────────────────────────── */
const loaderEl = document.getElementById('loader');

if (loaderEl) {
  const alreadySeen = sessionStorage.getItem('loaderShown');

  if (alreadySeen || prefersReducedMotion) {
    /* Skip loader: return visits or user prefers reduced motion */
    loaderEl.style.display = 'none';
    sessionStorage.setItem('loaderShown', '1');
    window.addEventListener('DOMContentLoaded', () => {
      if (!prefersReducedMotion) runHeroEntrance();
      initScrollAnimations();
      scrollToHash();
    });
  } else {
    window.addEventListener('load', () => {
      const tl = gsap.timeline();
      tl.to('#ldLogo', { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' })
        .to('#ldBar',  { width: '100%', duration: 1.5, ease: 'power2.inOut' }, '-=0.3')
        .to('#loader', {
          yPercent: -100, duration: 0.9, ease: 'power3.inOut', delay: 0.2,
          onComplete() {
            loaderEl.style.display = 'none';
            sessionStorage.setItem('loaderShown', '1');
            runHeroEntrance();
            initScrollAnimations();
            scrollToHash();
          }
        });
    });
  }
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

  /* Skip all parallax and reveal animations for reduced-motion users.
     CSS rules in style.css / home.css already set elements to their
     visible final state, so no GSAP calls are needed. */
  if (prefersReducedMotion) return;

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
  const pastHero  = window.scrollY > window.innerHeight * 0.78;
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
  navHam.setAttribute('aria-expanded', 'true');
  navHam.setAttribute('aria-label', 'Close navigation menu');
  mobDrawer.classList.add('open');
  mobDrawer.removeAttribute('aria-hidden');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  navHam.classList.remove('open');
  navHam.setAttribute('aria-expanded', 'false');
  navHam.setAttribute('aria-label', 'Open navigation menu');
  mobDrawer.classList.remove('open');
  mobDrawer.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

if (navHam)   navHam.addEventListener('click', openDrawer);
if (mobClose) mobClose.addEventListener('click', closeDrawer);

/* Close drawer when clicking a nav link */
if (mobDrawer) {
  mobDrawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeDrawer);
  });
  /* Close when clicking the dark backdrop (not the nav content) */
  mobDrawer.addEventListener('click', function (e) {
    if (e.target === mobDrawer) closeDrawer();
  });
}

/* Escape key closes drawer */
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && mobDrawer && mobDrawer.classList.contains('open')) closeDrawer();
});

/* ─────────────────────────────────────────────────────────────
   NAV DROPDOWN CHEVRONS
   Each chevron button toggles the dropdown independently of the
   main navigation link, so the link ALWAYS navigates on click.
   CSS :hover still drives the dropdown for pointer devices;
   this JS layer adds support for touch/keyboard/non-hover.
─────────────────────────────────────────────────────────────── */
document.querySelectorAll('.nav-dd-btn').forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    var dropdown = this.closest('.nav-dropdown');
    var isOpen   = dropdown.classList.toggle('dd-open');
    this.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    /* Close any other open dropdowns */
    document.querySelectorAll('.nav-dropdown.dd-open').forEach(function (dd) {
      if (dd !== dropdown) {
        dd.classList.remove('dd-open');
        var chevron = dd.querySelector('.nav-dd-btn');
        if (chevron) chevron.setAttribute('aria-expanded', 'false');
      }
    });
  });
});

/* Close all dropdowns on outside click */
document.addEventListener('click', function (e) {
  if (!e.target.closest('.nav-dropdown')) {
    document.querySelectorAll('.nav-dropdown.dd-open').forEach(function (dd) {
      dd.classList.remove('dd-open');
      var chevron = dd.querySelector('.nav-dd-btn');
      if (chevron) chevron.setAttribute('aria-expanded', 'false');
    });
  }
});

/* ─────────────────────────────────────────────────────────────
   HASH SCROLL — scroll to #anchor after GSAP init completes
   Needed because the loader animation blocks the browser's
   native anchor scroll when navigating to /#section from subpages
─────────────────────────────────────────────────────────────── */
function scrollToHash() {
  var hash = window.location.hash;
  if (!hash) return;
  var target = document.querySelector(hash);
  if (!target) return;
  setTimeout(function () {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 120);
}

/* On the homepage, intercept footer /#anchor clicks so they
   smooth-scroll in place instead of reloading the page */
if (loaderEl) {
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href || !href.startsWith('/#')) return;
    var id = href.slice(2); /* strip leading /# */
    var target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    history.pushState(null, '', href);
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

/* ─────────────────────────────────────────────────────────────
   ANCHOR NAV — active link highlight on scroll (all pages)
─────────────────────────────────────────────────────────────── */
['.amen-anchor-link', '.page-anchor-link'].forEach(function (selector) {
  var links = Array.from(document.querySelectorAll(selector));
  if (!links.length) return;

  var sections = links
    .map(function (l) { return document.getElementById(l.getAttribute('href').replace('#', '')); })
    .filter(Boolean);

  function updateNav() {
    var scrollY  = window.scrollY;
    var offset   = 140;
    var activeId = null;
    sections.forEach(function (sec) {
      if (scrollY + offset >= sec.offsetTop) activeId = sec.id;
    });
    links.forEach(function (link) {
      var href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', href === activeId);
    });
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
});
