const fs = require("fs");
const baseUrl = "https://d546-star.github.io/bursaries-alerts-sa";

const bursaries = require("./data/bursaries.json");

let urls = [
  "/",
  ...bursaries.map(b => `/bursaries/${b.slug}.html`)
];

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

urls.forEach(u => {
  xml += `
  <url>
    <loc>${baseUrl}${u}</loc>
  </url>`;
});

xml += "\n</urlset>";

fs.writeFileSync("public/sitemap.xml", xml);

console.log("V6 sitemap generated");
