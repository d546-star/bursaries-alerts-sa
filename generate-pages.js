const fs = require("fs");
const path = require("path");

const publicDir = path.join(__dirname, "../public");
const dataPath = path.join(__dirname, "../generate/bursaries.json");

// Ensure folders exist
fs.mkdirSync(publicDir, { recursive: true });
fs.mkdirSync(path.join(publicDir, "bursaries"), { recursive: true });

// Load data safely
let bursaries = [];

try {
  if (fs.existsSync(dataPath)) {
    const raw = fs.readFileSync(dataPath, "utf8");

    if (raw && raw.trim().length > 0) {
      bursaries = JSON.parse(raw);
    }
  }
} catch (err) {
  console.log("⚠️ Invalid bursaries.json, using fallback");
}

// SAFE FALLBACK (prevents white page)
if (!Array.isArray(bursaries) || bursaries.length === 0) {
  bursaries = [
    {
      title: "NSFAS Bursary",
      slug: "nsfas-bursary",
      description: "Government bursary for South African students.",
      link: "#"
    },
    {
      title: "Vodacom Bursary",
      slug: "vodacom-bursary",
      description: "ICT and engineering funding opportunity.",
      link: "#"
    }
  ];
}

// =====================
// INDEX PAGE
// =====================
const indexHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Bursaries Alerts SA</title>
  <meta name="description" content="Latest bursaries in South Africa">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>Bursaries Alerts SA</h1>
  <p>Latest bursary opportunities updated regularly.</p>

  <ul>
    ${bursaries
      .map(
        b => `<li><a href="bursaries/${b.slug}.html">${b.title}</a></li>`
      )
      .join("")}
  </ul>
</body>
</html>
`;

fs.writeFileSync(
  path.join(publicDir, "index.html"),
  indexHtml,
  "utf8"
);

// =====================
// BURSAry PAGES
// =====================
const bursaryDir = path.join(publicDir, "bursaries");

bursaries.forEach((b) => {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${b.title}</title>
  <meta name="description" content="${b.description}">
  <link rel="stylesheet" href="../styles.css">
</head>
<body>
  <h1>${b.title}</h1>
  <p>${b.description}</p>
  <a href="${b.link}">Apply here</a>
  <br><br>
  <a href="../index.html">← Back to home</a>
</body>
</html>
`;

  fs.writeFileSync(
    path.join(bursaryDir, `${b.slug}.html`),
    html,
    "utf8"
  );
});

console.log("✅ V2 pages generated successfully");
