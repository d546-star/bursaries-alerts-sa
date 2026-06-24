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
// SEO HELPERS
// =====================

// Related bursaries (same category = hub SEO)
function getRelated(b, all) {
  return all
    .filter(x => x.category === b.category && x.slug !== b.slug)
    .slice(0, 8);
}

// Keyword cluster (SEO relevance signals)
function buildKeywords(b) {
  return [
    b.name,
    b.category || "bursaries",
    "south africa bursaries",
    "student funding 2026",
    b.provider || "bursary provider"
  ];
}

// FAQ generator (CTR + SEO boost)
function generateFAQs(b) {
  return [
    {
      q: `How do I apply for ${b.name}?`,
      a: `Visit the official provider website and submit your application before ${b.closingDate || "the closing date"}.`
    },
    {
      q: `When does ${b.name} close?`,
      a: `Applications close on ${b.closingDate || "TBA"}.`
    },
    {
      q: `Is ${b.name} open for 2026 applications?`,
      a: `Yes, if listed, it is currently available for 2026 applicants.`
    }
  ];
}

// =====================
// SEO TEMPLATE (V8)
// =====================
function seoTemplate(b, relatedLinks = [], faqs = []) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${b.name} 2026 | Apply Now</title>
  <meta name="description" content="${b.description}">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- SEO SCHEMA (RICH RESULTS) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Scholarship",
    "name": "${b.name}",
    "description": "${b.description}",
    "applicationDeadline": "${b.closingDate || "TBA"}",
    "provider": {
      "@type": "Organization",
      "name": "${b.provider || "South African Bursary Provider"}"
    }
  }
  </script>

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
    <li><strong>Provider:</strong> ${b.provider || "N/A"}</li>
  </ul>
</section>

<section>
  <h2>How to Apply</h2>
  <p>Make sure to apply before the closing date. Visit the official provider website for full requirements.</p>
</section>

<section>
  <h2>Related Bursaries</h2>
  <ul>
    ${relatedLinks.map(r =>
      `<li><a href="/bursaries/${r.slug}.html">${r.name}</a></li>`
    ).join("")}
  </ul>
</section>

<section>
  <h2>FAQs</h2>
  ${faqs.map(f => `
    <h3>${f.q}</h3>
    <p>${f.a}</p>
  `).join("")}
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
  <title>Bursary Alerts SA 2026</title>
  <meta name="description" content="Latest bursaries in South Africa for students 2026">
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
// CATEGORY ENGINE (SEO HUB PAGES)
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
  <title>${cat} bursaries 2026 | South Africa</title>
  <meta name="description" content="List of ${cat} bursaries in South Africa for 2026 students">
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
// BURSARY PAGES
// =====================
bursaries.forEach(b => {
  const related = getRelated(b, bursaries);
  const faqs = generateFAQs(b);

  const html = seoTemplate(b, related, faqs);

  fs.writeFileSync(
    path.join(bursaryDir, `${b.slug}.html`),
    html
  );
});

// =====================
// LOG OUTPUT
// =====================
console.log("V8 SEO DOMINATION SYSTEM COMPLETE");
console.log(`Pages: ${bursaries.length}`);
console.log(`Categories: ${Object.keys(categories).length}`);
console.log("Build success → ready for GitHub Pages");
