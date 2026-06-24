const fs = require("fs");
const path = require("path");

const base = "https://d546-star.github.io/bursaries-alerts-sa";

const files = [];

function walk(dir, urlPath) {
  fs.readdirSync(dir).forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      walk(full, urlPath + "/" + file);
    } else {
      files.push(urlPath + "/" + file);
    }
  });
}

walk(path.join(__dirname, "public"), "");

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

files.forEach(f => {
  xml += `<url><loc>${base}${f}</loc></url>\n`;
});

xml += `</urlset>`;

fs.writeFileSync(
  path.join(__dirname, "public", "sitemap.xml"),
  xml
);

console.log("V3 sitemap generated");
