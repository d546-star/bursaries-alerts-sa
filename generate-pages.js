const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "data", "bursaries.json");
const outputDir = path.join(__dirname, "public", "bursaries");

fs.mkdirSync(outputDir, { recursive: true });

if (!fs.existsSync(dataPath)) {
  throw new Error("Missing data/bursaries.json");
}

const bursaries = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

bursaries.forEach(b => {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>${b.name}</title>
</head>
<body>
  <h1>${b.name}</h1>
  <p>${b.description}</p>
  <p>Closing: ${b.closingDate}</p>
</body>
</html>
`;

  fs.writeFileSync(
    path.join(outputDir, `${b.slug}.html`),
    html
  );
});

console.log("Pages generated");
