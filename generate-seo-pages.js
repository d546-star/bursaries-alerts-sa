const fs = require("fs");
const path = require("path");

const bursaries = require("./data/bursaries.json");
const categories = require("./data/categories.json");
const provinces = require("./data/provinces.json");

const out = path.join(__dirname, "public");

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

/* =========================
   1. BURSARY PAGES
========================= */
const bursaryDir = path.join(out, "bursaries");
fs.mkdirSync(bursaryDir, { recursive: true });

bursaries.forEach(b => {
  const html = `
  <html>
  <head>
    <title>${b.name}</title>
    <meta name="description" content="${b.description}">
  </head>
  <body>
    <h1>${b.name}</h1>
    <p>${b.description}</p>
    <p>Closing: ${b.closingDate}</p>

    <a href="/">Home</a>
  </body>
  </html>
  `;

  fs.writeFileSync(
    path.join(bursaryDir, `${b.slug}.html`),
    html
  );
});

/* =========================
   2. CATEGORY PAGES
========================= */
const catDir = path.join(out, "category");
fs.mkdirSync(catDir, { recursive: true });

categories.forEach(cat => {
  const filtered = bursaries.filter(b => b.field === cat);

  const html = `
  <html>
  <head>
    <title>${cat} bursaries South Africa</title>
    <meta name="description" content="Find ${cat} bursaries in South Africa">
  </head>
  <body>
    <h1>${cat.toUpperCase()} Bursaries</h1>

    ${filtered.map(b => `
      <a href="/bursaries/${b.slug}.html">${b.name}</a><br>
    `).join("")}

  </body>
  </html>
  `;

  fs.writeFileSync(
    path.join(catDir, `${cat}.html`),
    html
  );
});

/* =========================
   3. PROVINCE PAGES
========================= */
const provDir = path.join(out, "province");
fs.mkdirSync(provDir, { recursive: true });

provinces.forEach(p => {
  const filtered = bursaries.filter(b => b.province === p || b.province === "national");

  const html = `
  <html>
  <head>
    <title>${p} bursaries</title>
  </head>
  <body>
    <h1>${p.toUpperCase()} Bursaries</h1>

    ${filtered.map(b => `
      <a href="/bursaries/${b.slug}.html">${b.name}</a><br>
    `).join("")}

  </body>
  </html>
  `;

  fs.writeFileSync(
    path.join(provDir, `${p}.html`),
    html
  );
});

/* =========================
   4. HOMEPAGE (SEO HUB)
========================= */
const homepage = `
<html>
<head>
  <title>Bursary Alerts SA</title>
  <meta name="description" content="Latest South African bursaries 2026">
</head>
<body>

<h1>Bursary Alerts SA</h1>

<h2>Categories</h2>
${categories.map(c => `<a href="/category/${c}.html">${c}</a><br>`).join("")}

<h2>Provinces</h2>
${provinces.map(p => `<a href="/province/${p}.html">${p}</a><br>`).join("")}

<h2>Latest Bursaries</h2>
${bursaries.map(b => `<a href="/bursaries/${b.slug}.html">${b.name}</a><br>`).join("")}

</body>
</html>
`;

fs.writeFileSync(path.join(out, "index.html"), homepage);

console.log("300+ SEO system generated");
