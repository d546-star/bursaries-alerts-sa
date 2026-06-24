const fs = require("fs");
const path = require("path");

// -----------------------------
// LOAD DATA SAFELY
// -----------------------------
const dataPath = path.join(__dirname, "..", "data", "bursaries.json");

if (!fs.existsSync(dataPath)) {
  throw new Error("Missing data/bursaries.json");
}

const bursaries = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

// -----------------------------
// OUTPUT PATH (FIXED FOR GITHUB PAGES)
// -----------------------------
const outputDir = path.join(__dirname, "..", "public");
const outputFile = path.join(outputDir, "index.html");

// 🔥 CRITICAL FIX: ensure folder exists
fs.mkdirSync(outputDir, { recursive: true });

// -----------------------------
// BUILD HOMEPAGE HTML
// -----------------------------
const latestBursaries = bursaries.slice(0, 10);

const listItems = latestBursaries
  .map(
    (b) => `
      <li>
        <a href="/bursaries/${b.slug}.html">${b.name}</a>
        <p>${b.description || ""}</p>
        <small>Closing: ${b.closingDate || "TBA"}</small>
      </li>
    `
  )
  .join("\n");

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Bursary Alerts SA | Latest South African Bursaries 2026</title>

  <meta name="description" content="Find latest South African bursaries for 2026. NSFAS, engineering, banking, government funding opportunities updated daily.">

  <style>
    body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
    h1 { color: #1a1a1a; }
    a { color: #0066cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
    ul { padding: 0; list-style: none; }
    li { margin-bottom: 20px; padding: 10px; border-bottom: 1px solid #ddd; }
    small { color: #666; }
  </style>
</head>

<body>
  <h1>🎓 Latest Bursaries in South Africa (2026)</h1>

  <p>Updated bursary opportunities for students across South Africa. Apply before closing dates.</p>

  <h2>🔥 Latest Opportunities</h2>
  <ul>
    ${listItems}
  </ul>

  <h2>📚 Categories</h2>
  <ul>
    <li><a href="/bursaries/nsfas-bursary-2026.html">NSFAS Funding</a></li>
    <li><a href="/bursaries/sasol-bursary-2026.html">Engineering Bursaries</a></li>
  </ul>

  <footer>
    <p>© ${new Date().getFullYear()} Bursary Alerts SA</p>
  </footer>
</body>
</html>
`;

// -----------------------------
// WRITE FILE (SAFE)
// -----------------------------
fs.writeFileSync(outputFile, html, "utf-8");

console.log("Homepage generated successfully → public/index.html");
