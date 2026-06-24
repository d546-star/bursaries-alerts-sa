const fs = require("fs");

const baseUrl = "https://d546-star.github.io/bursaries-alerts-sa";

const pages = [
  "/",
  "/index.html"
];

// If you have bursaries.json, include dynamic pages
let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

pages.forEach(p => {
  xml += `
  <url>
    <loc>${baseUrl}${p}</loc>
  </url>`;
});

xml += "\n</urlset>";

fs.writeFileSync("public/sitemap.xml", xml);

console.log("Sitemap generated");
