'use strict';

(function () {
  var PHOTOS = [
    { src: 'assets/3rd.jpg',  cap: 'Full kitchenette — 2-burner cooktop, gooseneck sink, dishwasher and full-size refrigerator' },
    { src: 'assets/8th.jpg',  cap: 'Cooktop detail — induction surface, cookware, kettle and knife block in use' },
    { src: 'assets/1st.jpg',  cap: 'Kitchenette overview — microwave shelf, fridge and complete appliance setup' },
    { src: 'assets/2nd.jpg',  cap: 'Full suite — queen bed, work desk, 65″ TV and complete kitchen' },
    { src: 'assets/4th.jpg',  cap: 'Suite from entrance — TV, work desk, kitchenette and queen bed' },
    { src: 'assets/6th.jpg',  cap: 'Wide suite view — full room layout showing all areas' },
    { src: 'assets/5th.jpg',  cap: 'Suite layout — queen bed, TV, work desk and kitchenette area' },
    { src: 'assets/7th.jpg',  cap: 'Kitchen counter — clean view of the complete kitchenette' },
    { src: 'assets/9th.jpg',  cap: 'Suite overview — complete room with kitchenette and sleeping area' }
  ];

  var overlay, lbImg, lbCounter, lbCaption, lbThumbs;
  var current = 0;
  var startX  = 0;

  function buildOverlay() {
    overlay = document.createElement('div');
    overlay.className = 'lb-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Suite photo viewer');

    overlay.innerHTML =
      '<div class="lb-topbar">' +
        '<span class="lb-counter"></span>' +
        '<button class="lb-close" aria-label="Close photo viewer">' +
          '<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 3l12 12M15 3L3 15"/></svg>' +
        '</button>' +
      '</div>' +
      '<div class="lb-stage">' +
        '<button class="lb-prev" aria-label="Previous photo">' +
          '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M13 4l-6 6 6 6"/></svg>' +
        '</button>' +
        '<div class="lb-img-wrap"><img src="" alt="" /></div>' +
        '<button class="lb-next" aria-label="Next photo">' +
          '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M7 4l6 6-6 6"/></svg>' +
        '</button>' +
      '</div>' +
      '<div class="lb-caption"></div>' +
      '<div class="lb-thumbs">' +
        PHOTOS.map(function (p, i) {
          return '<button class="lb-thumb" data-idx="' + i + '" aria-label="View photo ' + (i + 1) + '">' +
                 '<img src="' + p.src + '" alt="" loading="lazy" /></button>';
        }).join('') +
      '</div>';

    document.body.appendChild(overlay);

    lbImg     = overlay.querySelector('.lb-img-wrap img');
    lbCounter = overlay.querySelector('.lb-counter');
    lbCaption = overlay.querySelector('.lb-caption');
    lbThumbs  = overlay.querySelector('.lb-thumbs');

    overlay.querySelector('.lb-close').addEventListener('click', closeLb);
    overlay.querySelector('.lb-prev').addEventListener('click', function () { goTo(current - 1); });
    overlay.querySelector('.lb-next').addEventListener('click', function () { goTo(current + 1); });
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeLb(); });

    lbThumbs.querySelectorAll('.lb-thumb').forEach(function (t) {
      t.addEventListener('click', function () { goTo(+t.dataset.idx); });
    });

    overlay.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
    }, { passive: true });
    overlay.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 44) goTo(current + (dx < 0 ? 1 : -1));
    });
  }

  function openLb(idx) {
    if (!overlay) buildOverlay();
    current = ((idx % PHOTOS.length) + PHOTOS.length) % PHOTOS.length;
    var p = PHOTOS[current];
    lbImg.src = p.src;
    lbImg.alt = p.cap;
    lbCaption.textContent = p.cap;
    updateUI();
    overlay.classList.add('lb-open');
    document.body.style.overflow = 'hidden';
    preload(current);
  }

  function closeLb() {
    overlay.classList.remove('lb-open');
    document.body.style.overflow = '';
  }

  function goTo(idx) {
    current = ((idx % PHOTOS.length) + PHOTOS.length) % PHOTOS.length;
    var p = PHOTOS[current];
    lbImg.classList.add('lb-fading');
    setTimeout(function () {
      lbImg.src = p.src;
      lbImg.alt = p.cap;
      lbCaption.textContent = p.cap;
      updateUI();
      requestAnimationFrame(function () { lbImg.classList.remove('lb-fading'); });
    }, 180);
    preload(current);
  }

  function updateUI() {
    lbCounter.textContent = (current + 1) + ' / ' + PHOTOS.length;
    lbThumbs.querySelectorAll('.lb-thumb').forEach(function (t, i) {
      t.classList.toggle('lb-thumb-active', i === current);
    });
    var active = lbThumbs.querySelector('.lb-thumb-active');
    if (active) active.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  function preload(idx) {
    [-1, 1].forEach(function (d) {
      var i = (((idx + d) % PHOTOS.length) + PHOTOS.length) % PHOTOS.length;
      new Image().src = PHOTOS[i].src;
    });
  }

  document.addEventListener('keydown', function (e) {
    if (!overlay || !overlay.classList.contains('lb-open')) return;
    if (e.key === 'Escape')     closeLb();
    if (e.key === 'ArrowLeft')  goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });

  window.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-lb-idx]').forEach(function (el) {
      el.style.cursor = 'zoom-in';
      el.addEventListener('click', function () { openLb(+el.dataset.lbIdx); });
    });
    document.querySelectorAll('[data-lb-open]').forEach(function (el) {
      el.addEventListener('click', function () { openLb(+(el.dataset.lbOpen || 0)); });
    });
  });
})();
