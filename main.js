/* ═══════════════════════════════════════════════════════════════
   Microtel Inn & Suites by Wyndham — Williston, ND
   main.js  |  Version 2.0 — SEO & Kitchenette Suite Update
   Requires: GSAP 3.12.5 + ScrollTrigger (loaded via HTML <head>)

   Pages managed:
     #landingPg       — Main landing page
     #kitchenettePg   — Queen Kitchenette Suite detail
     #extendedPg      — Weekly & Monthly Rates / Extended Stay
     #detailPg        — Full property detail

   Exported globals (called from inline onclick attributes):
     goHome()
     openDetail()
     openKitchenette()
     openExtended()
     navScrollTo(id)
     closeDrawer()
═══════════════════════════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────────────────────── */
const WYNDHAM_URL =
  'https://www.wyndhamhotels.com/microtel/williston-north-dakota/microtel-williston/overview';

const ALL_PAGES = ['landingPg', 'kitchenettePg', 'extendedPg', 'detailPg'];

/* ─────────────────────────────────────────────────────────────
   LOADER
   Plays once on initial page load. Fades out loader overlay,
   then fires hero entrance + scroll animations.
───────────────────────────────────────────────────────────── */
window.addEventListener('load', () => {
  const tl = gsap.timeline();

  tl.to('#ldLogo', {
      opacity: 1,
      y: 0,
      duration: 0.75,
      ease: 'power3.out'
    })
    .to('#ldBar', {
      width: '100%',
      duration: 1.5,
      ease: 'power2.inOut'
    }, '-=0.3')
    .to('#loader', {
      yPercent: -100,
      duration: 0.9,
      ease: 'power3.inOut',
      delay: 0.2,
      onComplete() {
        const el = document.getElementById('loader');
        if (el) el.style.display = 'none';
        runHeroEntrance();
        initScrollAnimations();
      }
    });
});

/* ─────────────────────────────────────────────────────────────
   HERO ENTRANCE ANIMATION
   Stagger-reveals each hero element after loader exits.
───────────────────────────────────────────────────────────── */
function runHeroEntrance() {
  gsap.to('#hChip',    { opacity: 1, y: 0, duration: 0.75, delay: 0.05, ease: 'power3.out' });
  gsap.to('#hTitle',   { opacity: 1, y: 0, duration: 0.85, delay: 0.22, ease: 'power3.out' });
  gsap.to('#hPara',    { opacity: 1, y: 0, duration: 0.80, delay: 0.38, ease: 'power3.out' });
  gsap.to('#hActions', { opacity: 1, y: 0, duration: 0.75, delay: 0.52, ease: 'power3.out' });
  gsap.to('#hCard', {
    opacity: 1, y: 0, scale: 1,
    duration: 0.85, delay: 0.44, ease: 'power3.out'
  });
  gsap.to('#hScroll', { opacity: 1, duration: 0.6, delay: 0.98, ease: 'power2.out' });

  // Stat bar — stagger each item
  const statEls = ['st0', 'st1', 'st2', 'st3', 'st4']
    .map(id => document.getElementById(id))
    .filter(Boolean);

  if (statEls.length) {
    gsap.to(statEls, {
      opacity: 1, y: 0,
      duration: 0.55,
      stagger: 0.09,
      delay: 0.78,
      ease: 'power3.out'
    });
  }
}

/* ─────────────────────────────────────────────────────────────
   SCROLL-TRIGGERED ANIMATIONS
   Called after loader exit AND after every page transition
   back to the landing page so ScrollTrigger re-attaches.
───────────────────────────────────────────────────────────── */
function initScrollAnimations() {
  // Always kill stale triggers first to avoid memory leaks
  ScrollTrigger.getAll().forEach(t => t.kill());

  /* ── Hero background parallax ── */
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

  /* ── Mid-page parallax quote band ── */
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

  /* ── CTA section parallax ── */
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

  /* ── Generic fade-up reveals (.reveal) ── */
  gsap.utils.toArray('.reveal').forEach(el => {
    // Skip elements already animated by hero entrance
    if (['hChip','hTitle','hPara','hActions','hCard','hScroll']
        .includes(el.id)) return;

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

  /* ── Slide-from-left (.reveal-l) ── */
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

  /* ── Slide-from-right (.reveal-r) ── */
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

  /* ── Staggered card reveals (.reveal-up) ──
     Groups siblings by parent so the stagger fires
     per-row rather than globally. */
  const upParents = new Set();
  gsap.utils.toArray('.reveal-up').forEach(el => {
    upParents.add(el.parentElement);
  });

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

/* ─────────────────────────────────────────────────────────────
   NAVBAR — glass mode toggle
   Dark glass over the hero, light glass when scrolled down.
   On sub-pages always light.
───────────────────────────────────────────────────────────── */
const siteNav = document.getElementById('siteNav');

function updateNavMode() {
  const onLanding  = document.getElementById('landingPg').classList.contains('active');
  const scrolledUp = window.scrollY <= 60;

  if (!onLanding) {
    // Sub-pages: always light glass
    siteNav.classList.add('light');
    return;
  }

  const pastHero = window.scrollY > window.innerHeight * 0.78;
  if (scrolledUp) {
    siteNav.classList.remove('light');   // dark glass in hero zone
  } else {
    siteNav.classList.toggle('light', pastHero);
  }
}

window.addEventListener('scroll', updateNavMode, { passive: true });
updateNavMode(); // run once on init

/* ─────────────────────────────────────────────────────────────
   HAMBURGER / MOBILE DRAWER
───────────────────────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────────────────────
   SMOOTH SCROLL HELPER
   Handles scrolling from any page: if called from a sub-page,
   first navigates home, then scrolls to the target section.
───────────────────────────────────────────────────────────── */
function navScrollTo(sectionId) {
  closeDrawer();

  const onLanding = document.getElementById('landingPg').classList.contains('active');

  if (!onLanding) {
    goHome(() => {
      setTimeout(() => {
        const target = document.getElementById(sectionId);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }, 140);
    });
    return;
  }

  const target = document.getElementById(sectionId);
  if (target) target.scrollIntoView({ behavior: 'smooth' });
}

/* ─────────────────────────────────────────────────────────────
   PAGE TRANSITIONS
   Generic helpers: showPage() handles all transitions.
   Named exports wrap it for each page.
───────────────────────────────────────────────────────────── */

/**
 * Hides all pages, shows the target page with a GSAP fade/slide.
 * @param {string}   targetId  — id of the page element to show
 * @param {string}   [heroBgId] — optional hero bg element to set up parallax on
 * @param {string}   [heroBgUrl] — background-image URL for heroBgId
 * @param {Function} [onDone]  — callback after transition completes
 */
function showPage(targetId, heroBgId, heroBgUrl, onDone) {
  // Find the currently active page
  const currentActive = ALL_PAGES
    .map(id => document.getElementById(id))
    .find(el => el && el.classList.contains('active'));

  if (currentActive && currentActive.id === targetId) {
    // Already on this page — just scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof onDone === 'function') onDone();
    return;
  }

  const target = document.getElementById(targetId);
  if (!target) return;

  // Set hero background before transition if provided
  if (heroBgId && heroBgUrl) {
    const bgEl = document.getElementById(heroBgId);
    if (bgEl) bgEl.style.backgroundImage = `url('${heroBgUrl}')`;
  }

  const doTransition = () => {
    // Hide all pages
    ALL_PAGES.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('active');
    });

    target.classList.add('active');
    window.scrollTo({ top: 0 });
    updateNavMode();

    gsap.fromTo(target,
      { opacity: 0, y: 18 },
      {
        opacity: 1, y: 0,
        duration: 0.55,
        ease: 'power3.out',
        onComplete() {
          // Set up per-page parallax
          ScrollTrigger.getAll().forEach(t => t.kill());

          if (heroBgId) {
            gsap.to(`#${heroBgId}`, {
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

          // If going back to landing, re-init all scroll animations
          if (targetId === 'landingPg') {
            initScrollAnimations();
          }

          if (typeof onDone === 'function') onDone();
        }
      }
    );
  };

  if (currentActive) {
    gsap.to(currentActive, {
      opacity: 0, y: -14,
      duration: 0.34,
      ease: 'power2.in',
      onComplete: doTransition
    });
  } else {
    doTransition();
  }
}

/* ── Named navigation functions called from HTML ── */

/** Return to landing page from any sub-page. */
function goHome(callback) {
  closeDrawer();
  showPage('landingPg', null, null, () => {
    if (typeof callback === 'function') callback();
  });
}

/** Open the full property detail page. */
function openDetail() {
  closeDrawer();
  showPage(
    'detailPg',
    'dHeroBg',
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=2200&q=90'
  );
}

/** Open the Queen Kitchenette Suite detail page. */
function openKitchenette() {
  closeDrawer();
  // The kitchenette hero bg is set in HTML, so no need to pass url
  showPage('kitchenettePg', null, null);
}

/** Open the Extended Stay / Weekly & Monthly Rates page. */
function openExtended() {
  closeDrawer();
  showPage(
    'extendedPg',
    'extHeroBg',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=2200&q=90'
  );
}