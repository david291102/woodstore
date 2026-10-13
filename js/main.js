/* js/main.js - product data, product cards, filters, search, gallery lightbox.
   !! PRODUCTS below are SAMPLE entries so the site works during development.
   !! Replace names, descriptions, specs and images with your verified stock (see README). */
(function () {
  var CATS = { doors: 'Wooden Doors', windows: 'Wooden Windows', timber: 'Timber & Wood', interior: 'Home Interior Wood', carpentry: 'Carpentry Wood', custom: 'Custom Requirements' };
  var TBC = 'Wood type: ask us for available options';

  var PRODUCTS = [
    { cat: 'doors', name: 'Main Entrance Wooden Door', img: 'images/wooden-doors/main-entrance-door.jpg', feat: true, alt: 'Illustration of a wooden main entrance door',
      desc: 'A strong front door for the entrance of a new home or a renovation. Tell us the frame size and the look you want.', specs: ['Size: as per your opening', TBC] },
    { cat: 'doors', name: 'Internal Room Door', img: 'images/wooden-doors/internal-room-door.jpg', alt: 'Illustration of an internal wooden room door',
      desc: 'Doors for bedrooms, bathrooms and utility rooms, chosen to match your budget and interior style.', specs: ['Size: standard or custom', TBC] },
    { cat: 'doors', name: 'Traditional Panel Door', img: 'images/wooden-doors/traditional-panel-door.jpg', alt: 'Illustration of a traditional panelled wooden door',
      desc: 'Classic panelled style for homes that prefer a traditional look. Ask which designs are currently available.', specs: ['Design: ask for current options', TBC] },
    { cat: 'windows', name: 'Casement Wooden Window', img: 'images/wooden-windows/casement-window.jpg', feat: true, alt: 'Illustration of a wooden casement window',
      desc: 'Opening windows for ventilation and light. Share the opening size and we will discuss suitable options.', specs: ['Size: as per your opening', TBC] },
    { cat: 'windows', name: 'Fixed and Grill-Style Window', img: 'images/wooden-windows/fixed-grill-window.jpg', alt: 'Illustration of a wooden fixed window',
      desc: 'Practical window styles for rooms where light matters more than airflow, or where a decorative frame is wanted.', specs: ['Style: ask for options', TBC] },
    { cat: 'windows', name: 'Window Frames', img: 'images/wooden-windows/window-frames.jpg', alt: 'Illustration of wooden window frames',
      desc: 'Frames cut to the size of your construction opening. Confirm dimensions before ordering.', specs: ['Size: made to requirement', TBC] },
    { cat: 'timber', name: 'Timber Planks and Boards', img: 'images/timber-wood/timber-planks.jpg', feat: true, alt: 'Illustration of stacked timber planks',
      desc: 'Planks and boards for furniture, flooring and general carpentry. Share thickness, width and length.', specs: ['Dimensions: as required', TBC] },
    { cat: 'timber', name: 'Beams and Rafters', img: 'images/timber-wood/timber-beams.jpg', alt: 'Illustration of timber beams',
      desc: 'Structural timber for roofing and framing work. Please discuss load and span needs with your builder.', specs: ['Dimensions: as required', TBC] },
    { cat: 'timber', name: 'Battens and Small Sections', img: 'images/timber-wood/timber-battens.jpg', alt: 'Illustration of timber battens',
      desc: 'Smaller sections for frames, supports and finishing work.', specs: ['Dimensions: as required', TBC] },
    { cat: 'interior', name: 'Wardrobe and Cupboard Wood', img: 'images/home-interior/wardrobe-wood.jpg', feat: true, alt: 'Illustration of wood for wardrobes',
      desc: 'Wood for wardrobe and cupboard work. Ask us what to use for frames, shelves and shutters.', specs: ['Material: ask for options'] },
    { cat: 'interior', name: 'Shelving and Storage Wood', img: 'images/home-interior/shelving-wood.jpg', alt: 'Illustration of wooden shelving',
      desc: 'Wood for shelves, racks and storage units for living areas, kitchens and study rooms.', specs: ['Material: ask for options'] },
    { cat: 'interior', name: 'Wooden Frames and Mouldings', img: 'images/home-interior/wooden-frames.jpg', alt: 'Illustration of wooden frames',
      desc: 'Frames and finishing wood for interior detailing. Availability depends on stock; please enquire.', specs: ['Availability: please confirm'] },
    { cat: 'carpentry', name: 'Wood for Carpentry Projects', img: 'images/timber-wood/carpentry-wood.jpg', feat: true, alt: 'Illustration of wood for carpentry work',
      desc: 'Tell us what your carpenter is building and we will help you list the wood you need.', specs: ['Quantity: as required'] },
    { cat: 'carpentry', name: 'Furniture-Making Wood', img: 'images/timber-wood/furniture-wood.jpg', alt: 'Illustration of wood for furniture making',
      desc: 'Wood for tables, cots, chairs and other furniture, selected for finish and strength.', specs: ['Quantity: as required'] },
    { cat: 'custom', name: 'Custom Wooden Requirement', img: 'images/home-interior/custom-wood.jpg', alt: 'Illustration for a custom wood requirement',
      desc: 'Need something specific? Describe it and we will confirm whether we can supply it or arrange it.', specs: ['Availability: on enquiry'] }
  ];

  var GALLERY = PRODUCTS.map(function (p) { return { src: p.img, alt: p.alt, cat: p.cat }; })
    .concat([1, 2, 3, 4, 5, 6].map(function (n) { return { src: 'images/gallery/gallery-' + n + '.jpg', alt: 'Illustration of timber and wood, view ' + n, cat: 'timber' }; }));

  var PAGES = { doors: 'wooden-doors.html', windows: 'wooden-windows.html', timber: 'timber-wood.html', interior: 'home-interior-wood.html', carpentry: 'products.html#carpentry', custom: 'contact.html#enquiry' };

  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  function card(p) {
    var msg = 'Hello, I would like to enquire about: ' + p.name;
    return '<article class="card product-card"><img src="' + p.img + '" alt="' + p.alt + '" width="600" height="400" loading="lazy">' +
      '<div class="card-body"><span class="tag">' + CATS[p.cat] + '</span><h3>' + p.name + '</h3><p>' + p.desc + '</p>' +
      '<ul class="specs">' + p.specs.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ul>' +
      '<p class="price">Contact us for current pricing.</p>' +
      '<div class="btn-row"><a class="btn btn-primary btn-sm" href="contact.html?product=' + encodeURIComponent(p.name) + '&cat=' + p.cat + '#enquiry">Enquire Now</a>' +
      '<a class="btn btn-outline btn-sm" data-site="wa" data-msg="' + msg + '" href="#" target="_blank" rel="noopener">WhatsApp</a></div></div></article>';
  }

  function renderGrid(host, list) {
    host.innerHTML = list.length ? list.map(card).join('') : '<p class="empty">No products match your search. Try another word, or <a href="contact.html#enquiry">send us your requirement</a>.</p>';
    applySiteConfig(host);
    if (window.revealScan) window.revealScan(host);
  }

  function initProducts() {
    $$('[data-products]').forEach(function (host) {
      var cat = host.dataset.cat || 'all';
      var list = PRODUCTS.filter(function (p) {
        if (host.dataset.featured) return p.feat;
        return cat === 'all' || p.cat === cat;
      });
      if (!host.dataset.interactive) { renderGrid(host, list); return; }

      // Products page: filters + search
      var state = { cat: (location.hash || '').replace('#', ''), q: '' };
      if (!CATS[state.cat]) state.cat = 'all';
      var bar = document.getElementById('filters'), search = document.getElementById('search'), count = document.getElementById('count');
      bar.innerHTML = ['all'].concat(Object.keys(CATS)).map(function (k) {
        return '<button class="filter-btn" type="button" data-cat="' + k + '">' + (k === 'all' ? 'All products' : CATS[k]) + '</button>';
      }).join('');
      function update() {
        $$('.filter-btn', bar).forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.cat === state.cat)); });
        var q = state.q.toLowerCase().trim();
        var res = PRODUCTS.filter(function (p) {
          return (state.cat === 'all' || p.cat === state.cat) && (!q || (p.name + ' ' + p.desc + ' ' + CATS[p.cat]).toLowerCase().indexOf(q) > -1);
        });
        renderGrid(host, res);
        count.textContent = res.length + ' item' + (res.length === 1 ? '' : 's') + ' shown';
      }
      bar.addEventListener('click', function (e) { var b = e.target.closest('.filter-btn'); if (b) { state.cat = b.dataset.cat; update(); } });
      search.addEventListener('input', function () { state.q = search.value; update(); });
      update();
    });
  }

  function initGallery() {
    var host = document.querySelector('[data-gallery]');
    if (!host) return;
    host.innerHTML = GALLERY.map(function (g, i) {
      return '<button type="button" data-i="' + i + '" aria-label="View larger: ' + g.alt + '"><img src="' + g.src + '" alt="' + g.alt + '" width="600" height="450" loading="lazy"></button>';
    }).join('');
    var lb = document.createElement('div');
    lb.className = 'lightbox'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Image viewer');
    lb.innerHTML = '<button class="lb-btn lb-close" type="button" aria-label="Close">&times;</button><button class="lb-btn lb-prev" type="button" aria-label="Previous image">&lsaquo;</button><img alt=""><p></p><button class="lb-btn lb-next" type="button" aria-label="Next image">&rsaquo;</button>';
    document.body.appendChild(lb);
    var idx = 0, opener = null, img = lb.querySelector('img'), cap = lb.querySelector('p');
    function show(i) {
      idx = (i + GALLERY.length) % GALLERY.length; var g = GALLERY[idx];
      img.src = g.src; img.alt = g.alt;
      cap.innerHTML = g.alt + ' &middot; <a class="lb-link" href="' + PAGES[g.cat] + '">See ' + CATS[g.cat] + '</a>';
    }
    function close() { lb.classList.remove('open'); if (opener) opener.focus(); }
    host.addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; opener = b; show(+b.dataset.i); lb.classList.add('open'); lb.querySelector('.lb-close').focus(); });
    lb.addEventListener('click', function (e) {
      if (e.target.closest('.lb-close') || e.target === lb) close();
      else if (e.target.closest('.lb-prev')) show(idx - 1);
      else if (e.target.closest('.lb-next')) show(idx + 1);
    });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close(); if (e.key === 'ArrowLeft') show(idx - 1); if (e.key === 'ArrowRight') show(idx + 1);
    });
  }


  /* Scroll reveal: elements fade and rise once as they enter the screen. Skipped for people who prefer reduced motion. */
  function initReveal() {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.documentElement.classList.add('js-reveal');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    window.revealScan = function (root) {
      $$('.section-head, .quick-link, .card, .info-card, .steps li, .split > *, .gallery button, .faq details, .form-card, .cta .wrap, .contact-list', root).forEach(function (el) {
        if (el.classList.contains('reveal')) return;
        el.classList.add('reveal');
        var pos = Array.prototype.indexOf.call(el.parentNode.children, el);
        el.style.setProperty('--d', (Math.min(pos, 5) * 0.08) + 's');
        io.observe(el);
      });
    };
    window.revealScan(document);
  }

  /* Floating WhatsApp / Call buttons and back-to-top, so help is always one tap away */
  function initFab() {
    var box = document.createElement('div');
    box.className = 'fab';
    box.innerHTML = '<a class="fab-btn fab-wa" data-site="wa" data-msg="Hello, I would like to enquire about wood products." href="#" target="_blank" rel="noopener"><i class="bi bi-whatsapp" aria-hidden="true"></i><span>WhatsApp</span></a>' +
      '<a class="fab-btn fab-call" data-site="tel" href="#"><i class="bi bi-telephone-fill" aria-hidden="true"></i><span>Call</span></a>' +
      '<button class="fab-top" type="button" aria-label="Back to top" hidden><i class="bi bi-arrow-up" aria-hidden="true"></i></button>';
    document.body.appendChild(box);
    applySiteConfig(box);
    var top = box.querySelector('.fab-top');
    window.addEventListener('scroll', function () { top.hidden = window.scrollY < 700; }, { passive: true });
    top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    applySiteConfig(document);   // page-level buttons (the shared parts are filled by navbar.js)
    initProducts();
    initGallery();
    initFab();
    initReveal();   // last, so it also picks up cards and gallery items rendered above
  });
})();
