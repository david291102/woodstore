/* js/contact.js - enquiry form validation and honest submission feedback.
   A static site cannot deliver a form by itself. Set SITE.formEndpoint (js/config.js) to a form service
   (e.g. Formspree) to receive enquiries. Without it, the visitor is asked to send the enquiry via WhatsApp. */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('enquiryForm');
    if (!form) return;
    var msgBox = document.getElementById('formMsg');
    var waBtn = document.getElementById('waSend');

    // Pre-fill from product enquiry links: contact.html?product=...&cat=...
    var params = new URLSearchParams(location.search);
    if (params.get('cat') && form.category.querySelector('option[value="' + params.get('cat') + '"]')) form.category.value = params.get('cat');
    if (params.get('product')) form.message.value = 'I would like to enquire about: ' + params.get('product') + '.\n';

    var rules = {
      name: function (v) { return v.trim().length >= 2 ? '' : 'Please enter your full name.'; },
      phone: function (v) { return /^(\+91[\s-]?|0)?[6-9]\d{9}$/.test(v.replace(/[\s-]/g, '')) ? '' : 'Enter a valid 10-digit Indian mobile number.'; },
      email: function (v) { return !v.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Enter a valid email address, or leave it blank.'; },
      category: function (v) { return v ? '' : 'Please choose a product category.'; },
      projectType: function (v) { return v ? '' : 'Please choose a project type.'; },
      message: function (v) { return v.trim().length >= 10 ? '' : 'Please describe what you need (at least 10 characters).'; },
      consent: function (v, el) { return el.checked ? '' : 'Please tick the box to allow us to use your details to reply.'; }
    };

    function check(name) {
      var el = form.elements[name], err = rules[name](el.value || '', el);
      var wrap = el.closest('.field') || el.closest('.consent');
      wrap.classList.toggle('invalid', !!err);
      el.setAttribute('aria-invalid', err ? 'true' : 'false');
      var out = document.getElementById('err-' + name);
      if (out) out.textContent = err;
      return !err;
    }
    function validate() {
      var ok = true, first = null;
      Object.keys(rules).forEach(function (n) { if (!check(n)) { ok = false; first = first || form.elements[n]; } });
      if (first) first.focus();
      return ok;
    }
    Object.keys(rules).forEach(function (n) { form.elements[n].addEventListener('blur', function () { check(n); }); });

    function show(type, html) { msgBox.className = 'form-msg show ' + type; msgBox.innerHTML = html; }
    function summary() {
      var f = form.elements, lines = ['Enquiry from ' + f.name.value.trim(), 'Phone: ' + f.phone.value.trim()];
      if (f.email.value.trim()) lines.push('Email: ' + f.email.value.trim());
      lines.push('Category: ' + f.category.options[f.category.selectedIndex].text, 'Project: ' + f.projectType.value);
      if (f.dimensions.value.trim()) lines.push('Dimensions: ' + f.dimensions.value.trim());
      if (f.quantity.value.trim()) lines.push('Quantity: ' + f.quantity.value.trim());
      if (f.budget.value) lines.push('Budget: ' + f.budget.value);
      lines.push('Message: ' + f.message.value.trim());
      return lines.join('\n');
    }

    waBtn.addEventListener('click', function (e) {
      e.preventDefault();
      if (!validate()) { show('bad', 'Please correct the highlighted fields first.'); return; }
      window.open(waLink(summary()), '_blank', 'noopener');
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate()) { show('bad', 'Please correct the highlighted fields and try again.'); return; }
      if (!SITE.formEndpoint) {
        show('info', '<strong>Your enquiry has not been sent yet.</strong> This form is not connected to an inbox. Please use the "Send on WhatsApp" button or call us so we receive your requirement.');
        return;
      }
      show('info', 'Sending your enquiry...');
      var data = new FormData(form);
      fetch(SITE.formEndpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
        .then(function (r) {
          if (!r.ok) throw new Error('HTTP ' + r.status);
          form.reset(); show('ok', '<strong>Thank you.</strong> Your enquiry was sent. We will contact you on the phone number you gave.');
        })
        .catch(function () { show('bad', 'Your enquiry could not be sent. Please try the WhatsApp button or call us.'); });
    });
  });
})();
