const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "data", "bursaries.json");
const bursaries = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

const outputDir = path.join(__dirname, "public");
const bursaryDir = path.join(outputDir, "bursaries");

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(bursaryDir, { recursive: true });

// ============ INDEX PAGE ============
const indexHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>Bursary Alerts SA</title>
  <meta name="description" content="Latest bursaries in South Africa">
</head>
<body>
  <h1>Bursaries SA</h1>
  <ul>
    ${bursaries.map(b =>
      `<li><a href="/bursaries/${b.slug}.html">${b.name}</a></li>`
    ).join("")}
  </ul>
</body>
</html>
`;

fs.writeFileSync(path.join(outputDir, "index.html"), indexHtml);

// ============ BURSARY PAGES ============
function seoTemplate(b, relatedLinks = []) {
  return `
<!DOCTYPE html>
<html>
<head>
  <title>${b.name} 2026 | Apply Now</title>
  <meta name="description" content="${b.description}">
</head>
<body>

<h1>${b.name}</h1>

<p>${b.description}</p>

<h2>Details</h2>
<ul>
  <li>Closing Date: ${b.closingDate}</li>
  <li>Category: ${b.category}</li>
</ul>

<h2>Related Bursaries</h2>
<ul>
  ${relatedLinks.map(l =>
    `<li><a href="/bursaries/${l.slug}.html">${l.name}</a></li>`
  ).join("")}
</ul>

</body>
</html>
`;
}
// =====================
// CATEGORY ENGINE (STEP 4)
// =====================
const categories = {};

bursaries.forEach(b => {
  const cat = b.category || "general";
  if (!categories[cat]) categories[cat] = [];
  categories[cat].push(b);
});

Object.keys(categories).forEach(cat => {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>${cat} bursaries</title>
  <meta name="description" content="${cat} bursaries in South Africa">
</head>
<body>
  <h1>${cat} bursaries</h1>
  <ul>
    ${categories[cat].map(b =>
      `<li><a href="/bursaries/${b.slug}.html">${b.name}</a></li>`
    ).join("")}
  </ul>
</body>
</html>
  `;

  fs.writeFileSync(
    path.join(__dirname, "public", `${cat}.html`),
    html
  );
});
console.log("V6 pages generated");
