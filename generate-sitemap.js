const fs = require("fs");
const path = require("path");

const baseUrl =
  "https://d546-star.github.io/bursaries-alerts-sa";

const bursaries = require("./data/bursaries.json");
const categories = require("./data/categories.json");
const provinces = require("./data/provinces.json");

const urls = [
  "/",
  "/about.html",
  "/privacy.html",

  ...bursaries.map(
    b => `/bursaries/${b.slug}.html`
  ),

  ...categories.map(
    c => `/category/${c}.html`
  ),

  ...provinces.map(
    p => `/province/${p}.html`
  )
];

let xml =
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

for (const u of urls) {
  xml += `
  <url>
    <loc>${baseUrl}${u}</loc>
  </url>`;
}

xml += `
</urlset>`;

fs.mkdirSync(
  path.join(__dirname, "public"),
  { recursive: true }
);

fs.writeFileSync(
  path.join(__dirname, "public", "sitemap.xml"),
  xml
);
