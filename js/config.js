/* js/config.js - EDIT THIS FILE with your real, confirmed business details.
   Every phone, WhatsApp, hours and map link on the site is filled from here. */
window.SITE = {
  name: 'Sankara Narayanna & Co Wood Store',
  address: 'Ilayarasanendal Road, Tippo Road, Kovilpatti, Tamil Nadu, India',
  phoneDisplay: 'Phone number to be added',   // e.g. '+91 98765 43210'
  phoneTel: '+910000000000',                  // PLACEHOLDER - e.g. '+919876543210'
  whatsapp: '910000000000',                   // PLACEHOLDER - country code + number, no + or spaces
  hours: 'Business hours to be confirmed',    // e.g. 'Mon-Sat: 9:00 AM - 7:00 PM'
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Ilayarasanendal+Road+Tippo+Road+Kovilpatti+Tamil+Nadu',
  formEndpoint: ''                            // Optional: Formspree/Getform URL. Empty = form is NOT delivered anywhere.
};

function waLink(text) {
  return 'https://wa.me/' + SITE.whatsapp + '?text=' + encodeURIComponent(text || 'Hello, I would like to enquire about wood products.');
}

/* Fills every element marked data-site="tel|wa|map|phone-text|hours|address" */
function applySiteConfig(root) {
  (root || document).querySelectorAll('[data-site]').forEach(function (el) {
    switch (el.dataset.site) {
      case 'tel': el.href = 'tel:' + SITE.phoneTel; break;
      case 'wa': el.href = waLink(el.dataset.msg); break;
      case 'map': el.href = SITE.mapUrl; break;
      case 'phone-text': el.textContent = SITE.phoneDisplay; break;
      case 'hours': el.textContent = SITE.hours; break;
      case 'address': el.textContent = SITE.address; break;
    }
  });
}
