/* navbar/navbar.js - loads header, navbar and footer into every page, then wires up the menu.
   NOTE: fetch() needs a web server. Opening the HTML files with file:// will NOT work (see README). */
(function () {
  if (window.__siteComponentsInit) return;           // avoid duplicate initialisation / listeners
  window.__siteComponentsInit = true;

  /* Built-in copies of header.html / navbar.html / footer.html, used when fetch() is blocked (opening files directly with file://).
     When served by a web server, the real files in this folder are loaded instead. If you edit those files, update these copies too. */
  var FALLBACK = {
  "header": "<!-- navbar/header.html : top information bar (contact values are filled from js/config.js) -->\n<a class=\"skip-link\" href=\"#main\">Skip to main content</a>\n<div class=\"site-header\">\n  <div class=\"wrap header-inner\">\n    <p class=\"header-name\"><strong>Sankara Narayanna &amp; Co Wood Store</strong><span class=\"header-tag\">Quality wood for every home project</span></p>\n    <ul class=\"header-contact\">\n      <li><i class=\"bi bi-geo-alt\" aria-hidden=\"true\"></i> Kovilpatti, Tamil Nadu</li>\n      <li><a data-site=\"tel\" href=\"#\"><i class=\"bi bi-telephone\" aria-hidden=\"true\"></i> <span data-site=\"phone-text\">Phone number to be added</span></a></li>\n      <li><a data-site=\"wa\" data-msg=\"Hello, I would like to enquire about wood products.\" href=\"#\" target=\"_blank\" rel=\"noopener\"><i class=\"bi bi-whatsapp\" aria-hidden=\"true\"></i> WhatsApp enquiry</a></li>\n    </ul>\n  </div>\n</div>\n",
  "navbar": "<!-- navbar/navbar.html : main navigation. Active link is set by navbar.js -->\n<nav class=\"navbar\" aria-label=\"Main navigation\">\n  <div class=\"wrap nav-inner\">\n    <a class=\"nav-logo\" href=\"index.html\" aria-label=\"Sankara Narayanna &amp; Co Wood Store - Home\">\n      <img src=\"images/logo.png\" alt=\"Sankara Narayanna &amp; Co logo\" width=\"44\" height=\"44\">\n      <span>Sankara Narayanna<small>&amp; Co Wood Store</small></span>\n    </a>\n    <button class=\"nav-toggle\" id=\"navToggle\" type=\"button\" aria-expanded=\"false\" aria-controls=\"navMenu\" aria-label=\"Open menu\">\n      <span class=\"bar\"></span><span class=\"bar\"></span><span class=\"bar\"></span>\n    </button>\n    <div class=\"nav-menu\" id=\"navMenu\">\n      <ul class=\"nav-links\">\n        <li><a href=\"index.html\">Home</a></li>\n        <li><a href=\"about.html\">About Us</a></li>\n        <li><a href=\"products.html\">Products</a></li>\n        <li><a href=\"wooden-doors.html\">Wooden Doors</a></li>\n        <li><a href=\"wooden-windows.html\">Wooden Windows</a></li>\n        <li><a href=\"timber-wood.html\">Timber &amp; Wood</a></li>\n        <li><a href=\"home-interior-wood.html\">Home Interior Wood</a></li>\n        <li><a href=\"gallery.html\">Gallery</a></li>\n        <li><a href=\"contact.html\">Contact Us</a></li>\n      </ul>\n      <a class=\"nav-quote\" href=\"contact.html#enquiry\">Get a Quote</a>\n    </div>\n  </div>\n</nav>\n",
  "footer": "<!-- navbar/footer.html : shared footer -->\n<footer class=\"site-footer\">\n  <div class=\"wrap footer-grid\">\n    <section>\n      <h2>Sankara Narayanna &amp; Co Wood Store</h2>\n      <p>A wood store in Kovilpatti for timber, wooden doors, windows and home wood products. Tell us your requirement and we will help you with suitable options.</p>\n    </section>\n    <section>\n      <h2>Quick links</h2>\n      <ul>\n        <li><a href=\"index.html\">Home</a></li><li><a href=\"about.html\">About Us</a></li>\n        <li><a href=\"products.html\">Products</a></li><li><a href=\"gallery.html\">Gallery</a></li>\n        <li><a href=\"contact.html\">Contact Us</a></li>\n      </ul>\n    </section>\n    <section>\n      <h2>Wood products</h2>\n      <ul>\n        <li><a href=\"wooden-doors.html\">Wooden Doors</a></li><li><a href=\"wooden-windows.html\">Wooden Windows</a></li>\n        <li><a href=\"timber-wood.html\">Timber &amp; Wood</a></li><li><a href=\"home-interior-wood.html\">Home Interior Wood</a></li>\n      </ul>\n    </section>\n    <section>\n      <h2>Visit or contact us</h2>\n      <address>\n        <p data-site=\"address\">Ilayarasanendal Road, Tippo Road, Kovilpatti, Tamil Nadu, India</p>\n        <p><a data-site=\"tel\" href=\"#\"><span data-site=\"phone-text\">Phone number to be added</span></a></p>\n        <p><a data-site=\"wa\" data-msg=\"Hello, I would like to enquire about wood products.\" href=\"#\" target=\"_blank\" rel=\"noopener\">WhatsApp enquiry</a></p>\n        <p data-site=\"hours\">Business hours to be confirmed</p>\n        <p><a data-site=\"map\" href=\"#\" target=\"_blank\" rel=\"noopener\">Open in Google Maps</a></p>\n      </address>\n    </section>\n  </div>\n  <div class=\"footer-bottom\"><div class=\"wrap\">&copy; <span id=\"footerYear\">2026</span> Sankara Narayanna &amp; Co Wood Store, Kovilpatti. All rights reserved.</div></div>\n</footer>\n"
};

  var PARTS = [
    ['site-header', 'navbar/header.html'],
    ['site-navbar', 'navbar/navbar.html'],
    ['site-footer', 'navbar/footer.html']
  ];

  function loadPart(part) {
    var host = document.getElementById(part[0]);
    if (!host) return Promise.resolve();
    var key = part[1].split('/').pop().replace('.html', '');
    function useFallback(err) {
      if (err) console.warn('Using built-in ' + key + ' (fetch failed).', err);
      host.innerHTML = FALLBACK[key];
    }
    if (location.protocol === 'file:') { useFallback(); return Promise.resolve(); }   // fetch is blocked on file://
    return fetch(part[1])
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
      .then(function (html) { host.innerHTML = html; })
      .catch(useFallback);
  }

  function initNavigation() {
    var toggle = document.getElementById('navToggle');
    var menu = document.getElementById('navMenu');
    var nav = document.querySelector('.navbar');
    if (!toggle || !menu) return;

    function setOpen(open) {
      menu.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
    toggle.addEventListener('click', function () { setOpen(!menu.classList.contains('open')); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });  // close after choosing a link
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { setOpen(false); toggle.focus(); } });
    document.addEventListener('click', function (e) { if (!e.target.closest('.navbar')) setOpen(false); });

    // Highlight the current page
    var current = location.pathname.split('/').pop() || 'index.html';
    menu.querySelectorAll('.nav-links a').forEach(function (a) {
      var active = a.getAttribute('href') === current;
      a.classList.toggle('active', active);
      if (active) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });

    // Shadow when scrolled (the bar itself is sticky via CSS)
    function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 10); }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  document.addEventListener('DOMContentLoaded', function () {
    Promise.all(PARTS.map(loadPart)).then(function () {
      if (typeof applySiteConfig === 'function') applySiteConfig(document);
      var y = document.getElementById('footerYear');
      if (y) y.textContent = new Date().getFullYear();
      initNavigation();
      document.dispatchEvent(new Event('components:loaded'));
    });
  });
})();
