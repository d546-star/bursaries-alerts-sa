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
bursaries.forEach(b => {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>${b.name}</title>
  <meta name="description" content="${b.description}">
</head>
<body>
  <h1>${b.name}</h1>
  <p>${b.description}</p>
  <p>Closing: ${b.closingDate}</p>
</body>
</html>
  `;

  fs.writeFileSync(
    path.join(bursaryDir, `${b.slug}.html`),
    html
  );
});

console.log("V6 pages generated");
