# Sankara Narayanna & Co Wood Store - Website

Static website (HTML5, CSS3, JavaScript). No build step.

## 1. Run it locally (required)
The shared header, navbar and footer load from the `navbar` folder with `fetch()`. A web server is recommended (Live Server or the command below). If you open a file directly (`file://`), `navbar.js` uses built-in copies so the pages still work; if you edit the files in `navbar/`, update the `FALLBACK` copies in `navbar/navbar.js` too.

    cd sankara-wood-store
    python3 -m http.server 8000      # then open http://localhost:8000
(or use the VS Code "Live Server" extension)

## 2. Replace placeholders (do this before going live)
Edit **js/config.js**: phone (`phoneTel`, `phoneDisplay`), WhatsApp number (`whatsapp`, country code, no `+`), business hours, and check the map link. Phone, WhatsApp, hours and map links update on every page.

Not yet verified, so intentionally left blank: phone, WhatsApp, opening hours, map coordinates, reviews. Add LocalBusiness phone/hours to the JSON-LD in `index.html` only once confirmed.

## 3. Replace sample images and products
- All files in `images/` are generated placeholders marked "SAMPLE IMAGE". Replace them with your own photos using the same file names (or update paths).
- Sample products live in the `PRODUCTS` array at the top of **js/main.js**. Edit names, descriptions, specs and images to match real stock. No prices are shown; cards say "Contact us for current pricing."
- Canonical and Open Graph URLs use `https://www.example.com/`. Replace with your domain.

## 4. Contact form
A static form cannot send email by itself. Until you set `formEndpoint` in js/config.js (e.g. a Formspree or Getform URL), the form shows that the enquiry was NOT sent and offers "Send on WhatsApp". Success is shown only if the service responds OK.

## 5. Structure
- `navbar/` header.html, navbar.html, footer.html, navbar.js, global.css (shared parts only)
- `css/style.css`, `css/responsive.css` page styles
- `js/config.js` business settings, `js/main.js` products/gallery, `js/contact.js` form
- 9 pages + `404.html`. Configure your host to serve `404.html` for missing pages.
