/* ==========================================================================
   Ampere — shop behaviour
   Sections: 1 storage · 2 cart · 3 shared UI · 4 page controllers
   ========================================================================== */

/* ------------------------------------------------------- 1. storage ----- */
/* localStorage works when the site is opened from a server or from disk in
   most browsers. If it is blocked, we keep the cart in memory for the
   session instead of breaking the page. */

const Store = (function () {
  const KEY = "ampere.cart";
  let memory = null;

  function available() {
    try {
      window.localStorage.setItem("__t", "1");
      window.localStorage.removeItem("__t");
      return true;
    } catch (e) {
      return false;
    }
  }

  const canUseLocal = available();

  return {
    read: function () {
      if (!canUseLocal) return memory || [];
      try {
        return JSON.parse(window.localStorage.getItem(KEY)) || [];
      } catch (e) {
        return [];
      }
    },
    write: function (lines) {
      if (!canUseLocal) { memory = lines; return; }
      window.localStorage.setItem(KEY, JSON.stringify(lines));
    }
  };
})();

/* ---------------------------------------------------------- 2. cart ----- */

const SHIPPING_FLAT = 9;
const FREE_SHIPPING_FROM = 150;

const Cart = {
  lines: function () {
    // drop anything that no longer exists in the catalogue
    return Store.read().filter(function (l) { return findProduct(l.id); });
  },

  save: function (lines) {
    Store.write(lines);
    document.dispatchEvent(new CustomEvent("cart:changed"));
  },

  add: function (id, qty) {
    const lines = this.lines();
    const line = lines.find(function (l) { return l.id === id; });
    if (line) {
      line.qty += qty || 1;
    } else {
      lines.push({ id: id, qty: qty || 1 });
    }
    this.save(lines);
  },

  setQty: function (id, qty) {
    let lines = this.lines();
    if (qty < 1) {
      lines = lines.filter(function (l) { return l.id !== id; });
    } else {
      const line = lines.find(function (l) { return l.id === id; });
      if (line) line.qty = Math.min(qty, 99);
    }
    this.save(lines);
  },

  remove: function (id) {
    this.save(this.lines().filter(function (l) { return l.id !== id; }));
  },

  clear: function () { this.save([]); },

  count: function () {
    return this.lines().reduce(function (n, l) { return n + l.qty; }, 0);
  },

  subtotal: function () {
    return this.lines().reduce(function (sum, l) {
      return sum + findProduct(l.id).price * l.qty;
    }, 0);
  },

  shipping: function () {
    const sub = this.subtotal();
    if (sub === 0 || sub >= FREE_SHIPPING_FROM) return 0;
    return SHIPPING_FLAT;
  },

  total: function () { return this.subtotal() + this.shipping(); }
};

/* ----------------------------------------------------- 3. shared UI ----- */

function updateCartBadge(animate) {
  const badges = document.querySelectorAll("[data-cart-count]");
  const n = Cart.count();
  badges.forEach(function (el) {
    el.textContent = n;
    el.classList.toggle("is-empty", n === 0);
    if (animate && n > 0) {
      el.classList.remove("bump");
      void el.offsetWidth;          // restart the animation
      el.classList.add("bump");
    }
  });
}

function toast(message) {
  let stack = document.querySelector(".toast-stack");
  if (!stack) {
    stack = document.createElement("div");
    stack.className = "toast-stack";
    document.body.appendChild(stack);
  }
  const el = document.createElement("div");
  el.className = "mini-toast";
  el.setAttribute("role", "status");
  el.innerHTML = '<i class="bi bi-check-circle-fill"></i><span></span>';
  el.querySelector("span").textContent = message;
  stack.appendChild(el);
  setTimeout(function () { el.remove(); }, 2600);
}

/** Card markup for one product. */
function productCard(p) {
  const flag = p.flag
    ? '<span class="flag' + (p.was ? "" : " flag-quiet") + '">' + p.flag + "</span>"
    : "";
  const was = p.was ? "<s>" + money(p.was) + "</s>" : "";
  return (
    '<article class="product-card">' +
      '<a class="thumb" href="product.html?id=' + p.id + '">' +
        flag +
        '<img src="' + p.image + '" alt="' + p.name + '" loading="lazy">' +
      "</a>" +
      '<div class="product-body">' +
        '<span class="cat">' + categoryName(p.category) + "</span>" +
        '<h3 class="name"><a href="product.html?id=' + p.id + '">' + p.name + "</a></h3>" +
        '<p class="spec">' + p.spec + "</p>" +
        '<div class="price">' + money(p.price) + was + "</div>" +
      "</div>" +
      '<div class="product-actions">' +
        '<button class="btn btn-signal" data-add="' + p.id + '">Add to cart</button>' +
        '<a class="btn btn-quiet" href="product.html?id=' + p.id + '">Details</a>' +
      "</div>" +
    "</article>"
  );
}

/** Any element with data-add="<product id>" adds that product. */
document.addEventListener("click", function (event) {
  const button = event.target.closest("[data-add]");
  if (!button) return;
  const id = button.getAttribute("data-add");
  const qtyField = document.querySelector("[data-qty-field]");
  const qty = button.hasAttribute("data-use-qty") && qtyField
    ? parseInt(qtyField.value, 10) || 1
    : 1;
  Cart.add(id, qty);
  toast(findProduct(id).name + " added to cart");
});

document.addEventListener("cart:changed", function () { updateCartBadge(true); });

/* ----------------------------------------------- 4. page controllers ---- */

function initHome() {
  const grid = document.querySelector("[data-featured]");
  if (grid) {
    const picks = ["nordwave-14-pro", "atlas-a7", "hush-pro", "lumen-x5"];
    grid.innerHTML = picks.map(function (id) {
      return '<div class="col-6 col-lg-3">' + productCard(findProduct(id)) + "</div>";
    }).join("");
  }

  const cats = document.querySelector("[data-categories]");
  if (cats) {
    cats.innerHTML = CATEGORIES.map(function (c) {
      const n = PRODUCTS.filter(function (p) { return p.category === c.id; }).length;
      return (
        '<div class="col-6 col-md-4 col-lg-2">' +
          '<a class="cat-tile" href="catalog.html?category=' + c.id + '">' +
            '<span class="cat-name">' + c.name + "</span>" +
            '<span class="cat-count">' + n + (n === 1 ? " product" : " products") + "</span>" +
          "</a>" +
        "</div>"
      );
    }).join("");
  }
}

function initCatalog() {
  const grid = document.querySelector("[data-grid]");
  if (!grid) return;

  const search = document.getElementById("search");
  const sort = document.getElementById("sort");
  const chips = document.querySelectorAll("[data-filter]");
  const count = document.querySelector("[data-result-count]");

  const params = new URLSearchParams(window.location.search);
  let active = params.get("category") || "all";
  if (params.get("q") && search) search.value = params.get("q");

  function draw() {
    const term = (search && search.value || "").trim().toLowerCase();
    let list = PRODUCTS.filter(function (p) {
      const inCategory = active === "all" || p.category === active;
      const inSearch = !term ||
        (p.name + " " + p.spec + " " + categoryName(p.category)).toLowerCase().indexOf(term) > -1;
      return inCategory && inSearch;
    });

    const how = sort ? sort.value : "featured";
    if (how === "price-asc")  list.sort(function (a, b) { return a.price - b.price; });
    if (how === "price-desc") list.sort(function (a, b) { return b.price - a.price; });
    if (how === "name")       list.sort(function (a, b) { return a.name.localeCompare(b.name); });

    count.textContent = list.length + (list.length === 1 ? " product" : " products");

    grid.innerHTML = list.length
      ? list.map(function (p) {
          return '<div class="col-6 col-lg-4">' + productCard(p) + "</div>";
        }).join("")
      : '<div class="col-12"><div class="sheet sheet-pad empty-state">' +
          "<h2>No match</h2>" +
          '<p class="lead-text mx-auto">Nothing fits that search. Clear the filters or try a broader word, such as “laptop”.</p>' +
          '<button class="btn btn-line mt-2" data-reset>Clear filters</button>' +
        "</div></div>";

    chips.forEach(function (chip) {
      chip.classList.toggle("is-on", chip.getAttribute("data-filter") === active);
    });
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      active = chip.getAttribute("data-filter");
      draw();
    });
  });
  if (search) search.addEventListener("input", draw);
  if (sort) sort.addEventListener("change", draw);

  grid.addEventListener("click", function (e) {
    if (e.target.closest("[data-reset]")) {
      active = "all";
      if (search) search.value = "";
      if (sort) sort.value = "featured";
      draw();
    }
  });

  draw();
}

function initProduct() {
  const root = document.querySelector("[data-product]");
  if (!root) return;

  const id = new URLSearchParams(window.location.search).get("id");
  const p = findProduct(id);

  if (!p) {
    root.innerHTML =
      '<div class="sheet sheet-pad empty-state">' +
        "<h2>Product not found</h2>" +
        '<p class="lead-text mx-auto">That link points to something we no longer sell.</p>' +
        '<a class="btn btn-signal mt-2" href="catalog.html">Browse the catalog</a>' +
      "</div>";
    return;
  }

  document.title = p.name + " — Ampere";
  const crumb = document.querySelector("[data-crumb]");
  if (crumb) crumb.textContent = p.name;

  const rows = Object.keys(p.specs).map(function (k) {
    return "<tr><th>" + k + "</th><td>" + p.specs[k] + "</td></tr>";
  }).join("");

  root.innerHTML =
    '<div class="row g-4 g-lg-5 align-items-start">' +
      '<div class="col-lg-6"><div class="gallery"><img src="' + p.image + '" alt="' + p.name + '"></div></div>' +
      '<div class="col-lg-6">' +
        '<span class="note">' + categoryName(p.category) + "</span>" +
        "<h1 class=\"h2 mt-1 mb-3\">" + p.name + "</h1>" +
        '<p class="lead-text">' + p.summary + "</p>" +
        '<div class="d-flex align-items-baseline gap-3 my-4">' +
          '<div class="price m-0 p-0" style="font-size:2rem">' + money(p.price) + "</div>" +
          (p.was ? '<s class="muted">' + money(p.was) + "</s>" : "") +
        "</div>" +
        '<p class="note mb-3">' +
          (p.stock > 5
            ? "In stock · ships today from Bălți"
            : "Only " + p.stock + " left · ships today from Bălți") +
        "</p>" +
        '<div class="d-flex flex-wrap gap-2 align-items-center">' +
          '<label class="form-label m-0 me-2" for="qty">Quantity</label>' +
          '<input class="form-control" id="qty" data-qty-field type="number" value="1" min="1" max="99" style="width:88px">' +
          '<button class="btn btn-signal" data-add="' + p.id + '" data-use-qty>Add to cart</button>' +
          '<a class="btn btn-line" href="cart.html">Go to cart</a>' +
        "</div>" +
        '<h2 class="h3 mt-5 mb-2">Specifications</h2>' +
        '<table class="spec-table">' + rows + "</table>" +
      "</div>" +
    "</div>";

  const related = document.querySelector("[data-related]");
  if (related) {
    const others = PRODUCTS
      .filter(function (x) { return x.id !== p.id; })
      .sort(function (a, b) {
        return (b.category === p.category) - (a.category === p.category);
      })
      .slice(0, 4);
    related.innerHTML = others.map(function (x) {
      return '<div class="col-6 col-lg-3">' + productCard(x) + "</div>";
    }).join("");
  }
}

function initCart() {
  const root = document.querySelector("[data-cart-root]");
  if (!root) return;

  function draw() {
    const lines = Cart.lines();

    if (!lines.length) {
      root.innerHTML =
        '<div class="sheet sheet-pad empty-state">' +
          "<h2>Your cart is empty</h2>" +
          '<p class="lead-text mx-auto">Add something from the catalog and it will show up here.</p>' +
          '<a class="btn btn-signal mt-2" href="catalog.html">Browse the catalog</a>' +
        "</div>";
      return;
    }

    const rows = lines.map(function (l) {
      const p = findProduct(l.id);
      return (
        '<div class="cart-row">' +
          '<a href="product.html?id=' + p.id + '"><img src="' + p.image + '" alt="' + p.name + '"></a>' +
          "<div>" +
            '<h3 class="name h3"><a href="product.html?id=' + p.id + '">' + p.name + "</a></h3>" +
            '<p class="note mb-2">' + p.spec + "</p>" +
            '<div class="qty" role="group" aria-label="Quantity for ' + p.name + '">' +
              '<button type="button" data-step="-1" data-id="' + p.id + '" aria-label="One fewer">−</button>' +
              "<span>" + l.qty + "</span>" +
              '<button type="button" data-step="1" data-id="' + p.id + '" aria-label="One more">+</button>' +
            "</div>" +
          "</div>" +
          '<div class="cart-end text-end">' +
            '<div class="price m-0 p-0">' + money(p.price * l.qty) + "</div>" +
            '<button class="link-remove mt-2" data-remove="' + p.id + '">Remove</button>' +
          "</div>" +
        "</div>"
      );
    }).join("");

    const ship = Cart.shipping();
    const away = FREE_SHIPPING_FROM - Cart.subtotal();

    root.innerHTML =
      '<div class="row g-4">' +
        '<div class="col-lg-8"><div class="sheet sheet-pad">' + rows + "</div></div>" +
        '<div class="col-lg-4">' +
          '<div class="sheet sheet-pad">' +
            '<h2 class="h3 mb-3">Order summary</h2>' +
            '<ul class="totals">' +
              "<li><span>Subtotal</span><span>" + money(Cart.subtotal()) + "</span></li>" +
              "<li><span>Delivery</span><span>" + (ship === 0 ? "Free" : money(ship)) + "</span></li>" +
              '<li class="grand"><span>Total</span><span>' + money(Cart.total()) + "</span></li>" +
            "</ul>" +
            (ship > 0
              ? '<p class="note mt-2">Add ' + money(away) + " more for free delivery.</p>"
              : "") +
            '<button class="btn btn-signal w-100 mt-3" data-checkout>Place order</button>' +
            '<a class="btn btn-quiet w-100 mt-2" href="catalog.html">Keep shopping</a>' +
            '<p class="note mt-3 mb-0">VAT included. You can pay by card on delivery or by transfer.</p>' +
          "</div>" +
        "</div>" +
      "</div>";
  }

  root.addEventListener("click", function (e) {
    const step = e.target.closest("[data-step]");
    if (step) {
      const id = step.getAttribute("data-id");
      const line = Cart.lines().find(function (l) { return l.id === id; });
      Cart.setQty(id, line.qty + parseInt(step.getAttribute("data-step"), 10));
      draw();
      return;
    }
    const remove = e.target.closest("[data-remove]");
    if (remove) {
      Cart.remove(remove.getAttribute("data-remove"));
      draw();
      return;
    }
    if (e.target.closest("[data-checkout]")) {
      const total = money(Cart.total());
      Cart.clear();
      draw();
      const dialog = document.getElementById("orderPlaced");
      document.querySelector("[data-order-total]").textContent = total;
      new bootstrap.Modal(dialog).show();
    }
  });

  document.addEventListener("cart:changed", draw);
  draw();
}

function initContact() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }
    form.classList.remove("was-validated");
    form.reset();
    document.querySelector("[data-form-sent]").hidden = false;
    toast("Message sent");
  });
}

/* ------------------------------------------------------------- boot ----- */

document.addEventListener("DOMContentLoaded", function () {
  updateCartBadge(false);

  const page = document.body.getAttribute("data-page");
  if (page === "home") initHome();
  if (page === "catalog") initCatalog();
  if (page === "product") initProduct();
  if (page === "cart") initCart();
  if (page === "contact") initContact();

  // mark the current page in the navigation
  const here = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".site-nav .nav-link").forEach(function (a) {
    if (a.getAttribute("href") === here) a.classList.add("active");
  });
});
