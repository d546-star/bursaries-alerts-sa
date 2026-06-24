const fs = require("fs");
const path = require("path");

// Load data safely
const dataPath = path.join(__dirname, "data", "bursaries.json");

if (!fs.existsSync(dataPath)) {
  throw new Error("Missing data/bursaries.json");
}

const bursaries = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

// Output folder
const outputDir = path.join(__dirname, "public", "bursaries");

// Clean output safely
fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });

// Generate pages
bursaries.forEach(b => {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>${b.name}</title>
  <meta name="description" content="${b.description || ""}">
</head>
<body>
  <h1>${b.name}</h1>
  <p>${b.description || ""}</p>
  <p><strong>Closing Date:</strong> ${b.closingDate || "TBA"}</p>
</body>
</html>
  `;

  fs.writeFileSync(
    path.join(outputDir, `${b.slug}.html`),
    html
  );
});

console.log("SEO pages generated successfully");
