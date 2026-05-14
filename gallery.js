'use strict';

(function () {
  var CL = 'https://res.cloudinary.com/djcgfqesd/image/upload';

  function cl(transforms, path) {
    return CL + '/' + transforms + '/' + path;
  }

  var PHOTOS = [
    { name: 'v1778701560/microtel-williston-queen-standard-room-bed-desk_vyddn2.jpg',               cap: 'Queen suite — renovated queen bed, work desk and in-room amenities' },
    { name: 'v1778701557/microtel-williston-kitchenette-induction-cooktop-in-use_ex2frz.jpg',        cap: 'Cooktop detail — induction surface, cookware, kettle and knife block in use' },
    { name: 'v1778701564/microtel-williston-queen-kitchenette-suite-full-kitchen_fmxds4.jpg',        cap: 'Kitchenette overview — microwave shelf, fridge and complete appliance setup' },
    { name: 'v1778701570/microtel-williston-kitchenette-suite-full-room-overview_nse08t.jpg',        cap: 'Full suite — queen bed, work desk, 65″ TV and complete kitchen' },
    { name: 'v1778701567/microtel-williston-queen-suite-room-layout-entrance-view_pmwhtv.jpg',       cap: 'Suite from entrance — TV, work desk, kitchenette and queen bed' },
    { name: 'v1778701566/microtel-williston-kitchenette-suite-wide-room-view_eq8hvs.jpg',            cap: 'Wide suite view — full room layout showing all areas' },
    { name: 'v1778701568/microtel-williston-extended-stay-suite-kitchen-bedroom_hld6cm.jpg',         cap: 'Suite layout — queen bed, TV, work desk and kitchenette area' },
    { name: 'v1778701557/microtel-williston-hotel-kitchen-counter-appliances_jlmg9w.jpg',            cap: 'Kitchen counter — clean view of the complete kitchenette' },
    { name: 'v1778701574/microtel-williston-queen-suite-bedroom-kitchenette-area_dh0wft.jpg',        cap: 'Suite overview — complete room with kitchenette and sleeping area' },
    { name: 'v1778711128/double_queen_bed_hmc9sh.avif',                                               cap: 'Double Queen Room — two queen beds with work desk' },
    { name: 'v1778711127/ADA_accesible_lw4kpm.jpg',                                                   cap: 'ADA Accessible Room — roll-in shower and fully accessible layout' },
    { name: 'v1778711129/hotel-outside_image_mwcvl4.avif',                                            cap: 'Microtel Williston — hotel exterior off Highway 85' },
    { name: 'v1778711126/single_queen_bed_ifkki6.avif',                                               cap: 'Queen Room — standard queen bed and work desk' },
    { name: 'v1778766715/microtel-williston-kitchenette-suite-sitting_-area_omkgxx.jpg',             cap: 'Kitchenette suite sitting area — lounge seating and full-kitchen layout' },
    { name: 'v1778766720/microtel-williston-fitness-center-gym-facilities_ma2lj7.jpg',               cap: 'Fitness centre — cardio machines, free weights and gym equipment' },
    { name: 'v1778766602/microtel-williston-room-hotel-balcony-terrace_g6jtfi.jpg',                  cap: 'Hotel balcony and terrace — outdoor view from the room' },
    { name: 'v1778766460/microtel-williston-breakfast-dining-area-angle-2_k8bpuk.jpg',               cap: 'Breakfast dining area — hot breakfast buffet, second view' },
    { name: 'v1778766393/microtel-williston-breakfast-dining-area_um4n1l.jpg',                       cap: 'Breakfast dining area — complimentary hot breakfast served daily' },
    { name: 'v1778767131/microtel-williston-business-facilities_duzfca.jpg',                         cap: 'Business facilities — meeting room and business centre at Microtel Williston' },
    { name: 'v1778768553/microtel-williston-meeting-room-conference-hall-banquet-function_sxwp7q.jpg', cap: 'Meeting room — 800 sq ft conference and banquet space at Microtel Williston' }
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
                 '<img src="' + cl('w_200,f_auto,q_auto', p.name) + '" alt="" loading="lazy" /></button>';
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
    lbImg.src = cl('w_1400,f_auto,q_auto', p.name);
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
      lbImg.src = cl('w_1400,f_auto,q_auto', p.name);
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
      new Image().src = cl('w_1400,f_auto,q_auto', PHOTOS[i].name);
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
