const fs = require("fs");
const path = require("path");

// =====================
// LOAD DATA
// =====================
const dataPath = path.join(__dirname, "data", "bursaries.json");

if (!fs.existsSync(dataPath)) {
  throw new Error("Missing data/bursaries.json");
}

const bursaries = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

// =====================
// OUTPUT DIRS
// =====================
const outputDir = path.join(__dirname, "public");
const bursaryDir = path.join(outputDir, "bursaries");

// Clean build
fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(bursaryDir, { recursive: true });

// =====================
// INTERNAL LINK ENGINE
// =====================
function getRelated(b, all) {
  return all
    .filter(x =>
      x.category === b.category && x.slug !== b.slug
    )
    .slice(0, 5);
}

// =====================
// SEO TEMPLATE (AI STYLE STRUCTURE)
// =====================
function seoTemplate(b, relatedLinks = []) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${b.name} 2026 | Apply Now</title>
  <meta name="description" content="${b.description}">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>

  <header>
    <h1>${b.name}</h1>
    <p>${b.description}</p>
  </header>

  <section>
    <h2>Details</h2>
    <ul>
      <li><strong>Closing Date:</strong> ${b.closingDate || "TBA"}</li>
      <li><strong>Category:</strong> ${b.category || "general"}</li>
      <li><strong>Source:</strong> ${b.source || "N/A"}</li>
    </ul>
  </section>

  <section>
    <h2>Apply Information</h2>
    <p>Make sure to apply before the closing date. Check official site for requirements.</p>
  </section>

  <section>
    <h2>Related Bursaries</h2>
    <ul>
      ${relatedLinks.map(r =>
        `<li><a href="/bursaries/${r.slug}.html">${r.name}</a></li>`
      ).join("")}
    </ul>
  </section>

  <footer>
    <p>© Bursary Alerts SA</p>
  </footer>

</body>
</html>
`;
}

// =====================
// INDEX PAGE (CRITICAL FIX)
// =====================
const indexHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Bursary Alerts SA</title>
  <meta name="description" content="Latest bursaries in South Africa">
</head>
<body>

  <h1>South African Bursaries 2026</h1>

  <ul>
    ${bursaries.map(b =>
      `<li><a href="/bursaries/${b.slug}.html">${b.name}</a></li>`
    ).join("")}
  </ul>

</body>
</html>
`;

fs.writeFileSync(path.join(outputDir, "index.html"), indexHtml);

// =====================
// CATEGORY ENGINE (SEO LANDING PAGES)
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
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${cat} bursaries 2026</title>
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
    path.join(outputDir, `${cat}.html`),
    html
  );
});

// =====================
// BURSARY PAGE GENERATION
// =====================
bursaries.forEach(b => {
  const related = getRelated(b, bursaries);
  const html = seoTemplate(b, related);

  fs.writeFileSync(
    path.join(bursaryDir, `${b.slug}.html`),
    html
  );
});

// =====================
// LOG
// =====================
console.log("V7 SEO system generated successfully");
console.log(`Pages: ${bursaries.length}`);
console.log(`Categories: ${Object.keys(categories).length}`);
