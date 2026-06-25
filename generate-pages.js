const fs = require("fs");
const path = require("path");

const publicDir = path.join(__dirname, "../public");

// Ensure folders exist
fs.mkdirSync(publicDir, { recursive: true });

// SAFE fallback data (prevents empty builds)
let bursaries = [];

try {
  const dataPath = path.join(__dirname, "../generate/bursaries.json");
  if (fs.existsSync(dataPath)) {
    bursaries = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  }
} catch (err) {
  console.log("⚠️ Failed to read bursaries.json, using fallback");
}

// HARD FALLBACK (prevents blank site)
if (!Array.isArray(bursaries) || bursaries.length === 0) {
  bursaries = [
    {
      title: "Sample Bursary",
      slug: "sample-bursary",
      description: "Default fallback bursary to prevent empty build.",
      link: "#"
    }
  ];
}

// Generate index page ALWAYS
const indexHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Bursaries Alerts SA</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>Bursaries Alerts SA</h1>
  <p>Latest bursaries in South Africa</p>

  <ul>
    ${bursaries
      .map(
        b =>
          `<li><a href="bursaries/${b.slug}.html">${b.title}</a></li>`
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

// Generate bursary pages
const bursaryDir = path.join(publicDir, "bursaries");
fs.mkdirSync(bursaryDir, { recursive: true });

bursaries.forEach(b => {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${b.title}</title>
  <link rel="stylesheet" href="../styles.css">
</head>
<body>
  <h1>${b.title}</h1>
  <p>${b.description}</p>
  <a href="${b.link}">Apply here</a>
</body>
</html>
`;

  fs.writeFileSync(
    path.join(bursaryDir, `${b.slug}.html`),
    html,
    "utf8"
  );
});

console.log("✅ Pages generated safely (V2 stable)");
