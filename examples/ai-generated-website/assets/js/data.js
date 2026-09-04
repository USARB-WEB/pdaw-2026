/* Catalogue data.
   In a real shop this would come from an API; here it is one plain array
   so every page can read the same source. */

const CATEGORIES = [
  { id: "computers",   name: "Computers",   blurb: "Laptops and tablets" },
  { id: "phones",      name: "Phones",      blurb: "Unlocked, EU stock" },
  { id: "photo",       name: "Photo",       blurb: "Cameras and drones" },
  { id: "audio",       name: "Audio",       blurb: "Headphones, speakers" },
  { id: "displays",    name: "Displays",    blurb: "Monitors for work" },
  { id: "accessories", name: "Accessories", blurb: "Keyboards, power" }
];

const PRODUCTS = [
  {
    id: "nordwave-14-pro",
    name: "Nordwave 14 Pro",
    category: "computers",
    price: 1349,
    was: null,
    image: "assets/img/laptop-14.svg",
    spec: "14″ OLED · 32 GB · 1 TB SSD",
    flag: "Editor's pick",
    stock: 8,
    summary:
      "A 14-inch machine that stays quiet under load and lasts a working day away from the socket. We picked it because the panel is colour-accurate out of the box, so photo work needs no calibration.",
    specs: {
      "Display": "14″ OLED, 2880 × 1800, 120 Hz",
      "Processor": "8-core, 3.4 GHz",
      "Memory": "32 GB LPDDR5",
      "Storage": "1 TB NVMe SSD",
      "Battery": "72 Wh, up to 14 h",
      "Weight": "1.24 kg",
      "Ports": "2 × USB-C, USB-A, HDMI, card reader"
    }
  },
  {
    id: "nordwave-16-studio",
    name: "Nordwave 16 Studio",
    category: "computers",
    price: 2190,
    was: 2390,
    image: "assets/img/laptop-16.svg",
    spec: "16″ · 64 GB · discrete GPU",
    flag: "Save €200",
    stock: 3,
    summary:
      "Built for video edits and 3D. The cooling is oversized on purpose: it holds full speed through a long render instead of dropping after five minutes.",
    specs: {
      "Display": "16″ mini-LED, 3456 × 2234",
      "Processor": "12-core, 4.1 GHz",
      "Graphics": "12 GB discrete GPU",
      "Memory": "64 GB",
      "Storage": "2 TB NVMe SSD",
      "Battery": "99 Wh",
      "Weight": "2.1 kg"
    }
  },
  {
    id: "slate-11",
    name: "Slate 11",
    category: "computers",
    price: 529,
    was: null,
    image: "assets/img/tablet.svg",
    spec: "11″ tablet · pen included",
    flag: null,
    stock: 15,
    summary:
      "A light tablet for reading, notes and sketching. The pen is in the box, which is rare at this price, and it charges on the magnetic edge.",
    specs: {
      "Display": "11″ IPS, 2400 × 1600, 90 Hz",
      "Memory": "8 GB",
      "Storage": "256 GB, microSD slot",
      "Pen": "Included, 4096 pressure levels",
      "Battery": "8000 mAh",
      "Weight": "465 g"
    }
  },
  {
    id: "lumen-x5",
    name: "Lumen X5",
    category: "phones",
    price: 749,
    was: null,
    image: "assets/img/phone-x5.svg",
    spec: "6.5″ · triple camera · 256 GB",
    flag: null,
    stock: 12,
    summary:
      "The camera is the reason to buy this one. Night shots come out clean without the over-sharpened look, and the main sensor is large enough to keep detail when you crop.",
    specs: {
      "Display": "6.5″ AMOLED, 120 Hz",
      "Cameras": "50 MP main, 12 MP ultra-wide, 8 MP tele",
      "Memory": "12 GB",
      "Storage": "256 GB",
      "Battery": "5000 mAh, 65 W charging",
      "Water resistance": "IP68"
    }
  },
  {
    id: "lumen-a3",
    name: "Lumen A3",
    category: "phones",
    price: 329,
    was: 369,
    image: "assets/img/phone-a3.svg",
    spec: "6.1″ · two-day battery",
    flag: "Save €40",
    stock: 22,
    summary:
      "A small, honest phone. Nothing here is remarkable except the battery, which reaches a second day under normal use, and the price.",
    specs: {
      "Display": "6.1″ OLED, 90 Hz",
      "Cameras": "48 MP main, 8 MP ultra-wide",
      "Memory": "8 GB",
      "Storage": "128 GB",
      "Battery": "5200 mAh, 33 W charging",
      "Software": "4 years of updates"
    }
  },
  {
    id: "atlas-a7",
    name: "Atlas A7",
    category: "photo",
    price: 1890,
    was: null,
    image: "assets/img/camera.svg",
    spec: "Full-frame mirrorless · body",
    flag: "New",
    stock: 4,
    summary:
      "Full-frame sensor, weather-sealed body, and a grip that suits large hands. Sold as body only — tell us which mount you use and we will match a lens.",
    specs: {
      "Sensor": "35 mm full-frame, 33 MP",
      "Stabilisation": "5-axis in body, 7 stops",
      "Video": "4K 60p, 10-bit",
      "Viewfinder": "3.7 M-dot OLED",
      "Shots per charge": "580",
      "Weight": "658 g with battery"
    }
  },
  {
    id: "kite-3",
    name: "Kite 3",
    category: "photo",
    price: 899,
    was: null,
    image: "assets/img/drone.svg",
    spec: "4K drone · 34 min flight",
    flag: null,
    stock: 6,
    summary:
      "Folds to the size of a water bottle and holds position in wind that grounds cheaper drones. Comes with two batteries and a case.",
    specs: {
      "Camera": "4K 60 fps, 1-inch sensor",
      "Flight time": "34 minutes per battery",
      "Range": "12 km video link",
      "Sensors": "Obstacle detection, all directions",
      "Weight": "249 g",
      "In the box": "2 batteries, case, spare props"
    }
  },
  {
    id: "hush-pro",
    name: "Hush Pro",
    category: "audio",
    price: 279,
    was: 329,
    image: "assets/img/headphones.svg",
    spec: "Over-ear · active noise cancelling",
    flag: "Save €50",
    stock: 18,
    summary:
      "Quiet enough for a long flight and comfortable enough that you forget them. The earcups are replaceable, so the pair outlives the pads.",
    specs: {
      "Type": "Over-ear, closed back",
      "Noise cancelling": "Adaptive, 3 levels",
      "Battery": "38 h, 5 h from a 10 min charge",
      "Connection": "Bluetooth 5.3, USB-C, 3.5 mm",
      "Codecs": "LDAC, aptX, AAC",
      "Weight": "254 g"
    }
  },
  {
    id: "cube-mini",
    name: "Cube Mini",
    category: "audio",
    price: 129,
    was: null,
    image: "assets/img/speaker.svg",
    spec: "Portable speaker · IP67",
    flag: null,
    stock: 30,
    summary:
      "Loud for its size and genuinely waterproof, not just splash-proof. Two of them pair into a stereo set if you add a second later.",
    specs: {
      "Output": "30 W",
      "Battery": "20 hours",
      "Protection": "IP67, floats",
      "Connection": "Bluetooth 5.2, USB-C",
      "Pairing": "Stereo pair with a second unit",
      "Weight": "680 g"
    }
  },
  {
    id: "vista-27",
    name: "Vista 27",
    category: "displays",
    price: 449,
    was: null,
    image: "assets/img/monitor.svg",
    spec: "27″ 4K · USB-C 90 W",
    flag: null,
    stock: 9,
    summary:
      "One cable carries picture, data and 90 W of power to a laptop. The stand adjusts in height, which most monitors at this price do not.",
    specs: {
      "Panel": "27″ IPS, 3840 × 2160, 60 Hz",
      "Colour": "99% sRGB, factory calibrated",
      "Power delivery": "90 W over USB-C",
      "Ports": "USB-C, 2 × HDMI, DisplayPort, 3 × USB-A",
      "Stand": "Height, tilt, swivel, pivot",
      "Mount": "VESA 100 × 100"
    }
  },
  {
    id: "forge-k1",
    name: "Forge K1",
    category: "accessories",
    price: 159,
    was: null,
    image: "assets/img/keyboard.svg",
    spec: "Mechanical · hot-swap switches",
    flag: null,
    stock: 25,
    summary:
      "Switches pull out without soldering, so you can change the feel later. Wired or wireless, and the keycaps are the durable kind that do not go shiny.",
    specs: {
      "Layout": "75%, ISO or ANSI",
      "Switches": "Hot-swappable, tactile fitted",
      "Keycaps": "PBT double-shot",
      "Connection": "USB-C, Bluetooth, 2.4 GHz",
      "Battery": "4000 mAh",
      "Extras": "Rotary knob, sound dampening"
    }
  },
  {
    id: "volt-65",
    name: "Volt 65",
    category: "accessories",
    price: 59,
    was: null,
    image: "assets/img/charger.svg",
    spec: "65 W charger · 3 ports",
    flag: null,
    stock: 40,
    summary:
      "Charges a laptop and two phones at once from one socket, and it is small enough to leave in a bag permanently.",
    specs: {
      "Output": "65 W total",
      "Ports": "2 × USB-C, 1 × USB-A",
      "Standards": "USB PD 3.0, PPS",
      "Plug": "EU, folding pins",
      "Size": "58 × 58 × 30 mm",
      "Warranty": "24 months"
    }
  }
];

/** Format a number as a euro price, e.g. 1349 -> "€1,349". */
function money(value) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(value);
}

/** Find one product by its id. */
function findProduct(id) {
  return PRODUCTS.find(function (p) { return p.id === id; });
}

/** Human-readable category name. */
function categoryName(id) {
  const c = CATEGORIES.find(function (x) { return x.id === id; });
  return c ? c.name : id;
}
