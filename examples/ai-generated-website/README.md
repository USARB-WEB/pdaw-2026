# Ampere — demo online shop

A static electronics shop built with HTML, CSS and Bootstrap 5. No build step,
no backend: open a file and it runs.

## Run it

Double-click `index.html`, or serve the folder so that `localStorage` and
relative paths behave exactly as they would in production:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Pages

| File | What it does |
| --- | --- |
| `index.html` | Landing page: hero, promises, categories, featured products, testimonial |
| `catalog.html` | All products, with search, category filter and sorting |
| `product.html` | Product detail, read from `?id=` in the URL (e.g. `product.html?id=atlas-a7`) |
| `cart.html` | Cart with quantities, order summary and a checkout confirmation |
| `about.html` | Company story, selection process, team |
| `contact.html` | Address, hours and a validated contact form |

## Structure

```
assets/
  css/style.css   design tokens + all components (Bootstrap is only the grid and utilities)
  js/data.js      the catalogue: CATEGORIES, PRODUCTS, money(), findProduct()
  js/app.js       storage, cart, shared UI, one controller per page
  img/*.svg       12 product illustrations
```

`app.js` is split into four commented sections:

1. **Storage** — a thin wrapper over `localStorage` that falls back to memory
   if the browser blocks it.
2. **Cart** — add, change quantity, remove, subtotal, delivery, total.
   Free delivery from €150, otherwise a €9 flat rate.
3. **Shared UI** — the cart badge, the toast, and `productCard()`, which builds
   the markup used by every grid on the site.
4. **Page controllers** — `initHome`, `initCatalog`, `initProduct`, `initCart`,
   `initContact`. The right one runs based on `<body data-page="…">`.

## Changing the catalogue

Everything shown on the site comes from the `PRODUCTS` array in
`assets/js/data.js`. Add an object with the same fields and it appears in the
catalog, in search, in the filters and on its own detail page. Categories live
in the `CATEGORIES` array — add one there and add a matching
`<button class="btn-quiet" data-filter="your-id">` to the filter bar in
`catalog.html`.

## Design system

Colours, radii and easing are CSS custom properties at the top of `style.css`,
so a re-skin only touches that block.

```
--paper  #e9ebee   page background
--panel  #ffffff   cards and sheets
--ink    #1b1d21   text and headlines
--steel  #6e747e   secondary text
--line   #cfd4da   hairline borders
--signal #d8372b   the single accent: prices, primary actions, active state
--deep   #22262e   dark bands and footer
```

Type: **Archivo** (variable width axis) for headlines, **Inter** for body text.
Both load from Google Fonts.

## Notes

- Nothing is sent to a server. Checkout clears the cart and shows a modal; the
  contact form validates in the browser only.
- Layout is responsive down to 360px, keyboard focus is visible, and
  `prefers-reduced-motion` turns off the one page-load animation.
- Bootstrap, Bootstrap Icons and the fonts load from a CDN, so the first load
  needs an internet connection. To work fully offline, download those three
  files into `assets/` and change the `<link>` and `<script>` tags.
