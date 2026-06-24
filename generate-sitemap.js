const fs = require("fs");
const path = require("path");

const base = "https://d546-star.github.io/bursaries-alerts-sa";

const files = fs.readdirSync(
  path.join(__dirname, "public", "bursaries")
);

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

// homepage
xml += `<url><loc>${base}/</loc></url>\n`;

files.forEach(f => {
  xml += `<url><loc>${base}/bursaries/${f}</loc></url>\n`;
});

xml += `</urlset>`;

fs.writeFileSync(
  path.join(__dirname, "..", "public", "sitemap.xml"),
  xml
);

console.log("Sitemap built");
