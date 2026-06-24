const fs = require("fs");
const path = require("path");

const bursaries = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "bursaries.json"))
);

const categories = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "categories.json"))
);

const publicDir = path.join(__dirname, "public");
const bursaryRoot = path.join(publicDir, "bursaries");

fs.rmSync(publicDir, { recursive: true, force: true });
fs.mkdirSync(bursaryRoot, { recursive: true });

let allPages = [];

// ============================
// CATEGORY LANDING PAGES
// ============================
for (const cat of categories) {
  const catDir = path.join(bursaryRoot, cat);
  fs.mkdirSync(catDir, { recursive: true });

  const catHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>${cat.toUpperCase()} Bursaries South Africa</title>
  <meta name="description" content="Find ${cat} bursaries in South Africa">
</head>
<body>
  <h1>${cat.toUpperCase()} Bursaries</h1>
  <ul>
    ${bursaries.map((b, i) => `
      <li>
        <a href="/bursaries/${cat}/${b.slug}-${i}.html">
          ${b.title} - ${cat}
        </a>
      </li>
    `).join("")}
  </ul>
</body>
</html>
  `;

  fs.writeFileSync(
    path.join(catDir, "index.html"),
    catHtml
  );

  allPages.push(`/bursaries/${cat}/index.html`);
}

// ============================
// BURSARY PAGES (SEO CLUSTERED)
// ============================
categories.forEach(cat => {
  bursaries.forEach((b, i) => {
    const dir = path.join(bursaryRoot, cat);

    const html = `
<!DOCTYPE html>
<html>
<head>
  <title>${b.title} - ${cat}</title>
  <meta name="description" content="${b.description} - ${cat} bursary in South Africa">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Scholarship",
    "name": "${b.title}",
    "description": "${b.description}",
    "provider": "South African Bursary Portal"
  }
  </script>
</head>

<body>
  <h1>${b.title}</h1>
  <p>${b.description}</p>

  <p><b>Category:</b> ${cat}</p>

  <a href="/bursaries/${cat}/index.html">← More ${cat} bursaries</a>

  <hr>

  <h3>Related bursaries</h3>
  <ul>
    ${bursaries.slice(0, 5).map(x =>
      `<li><a href="#">${x.title}</a></li>`
    ).join("")}
  </ul>
</body>
</html>
    `;

    const file = path.join(dir, `${b.slug}-${i}.html`);
    fs.writeFileSync(file, html);

    allPages.push(`/bursaries/${cat}/${b.slug}-${i}.html`);
  });
});

console.log("V3 SEO system generated");
