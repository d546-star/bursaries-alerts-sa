const fs = require("fs");
const path = require("path");

const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "bursaries.json"))
);

// EXPAND DATA → 300+ pages automatically
function expandBursaries(base) {
  const output = [];

  const categories = [
    "Engineering", "IT", "Medicine", "Nursing",
    "Finance", "Law", "Teaching", "Science"
  ];

  let id = 0;

  for (let i = 0; i < 40; i++) {
    for (const cat of categories) {
      base.forEach(b => {
        output.push({
          name: `${b.name} - ${cat} (${2026 + (i % 2)})`,
          slug: `${b.slug}-${cat.toLowerCase()}-${i}`,
          description: `${b.description} - Funding for ${cat} students`,
          closingDate: b.closingDate
        });
        id++;
      });
    }
  }

  return output; // 300–800+ pages
}

const bursaries = expandBursaries(data);

// CLEAN OUTPUT
const outDir = path.join(__dirname, "public", "bursaries");
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

// GENERATE PAGES
for (const b of bursaries) {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>${b.name}</title>
  <meta name="description" content="${b.description}">
  <link rel="canonical" href="https://d546-star.github.io/bursaries-alerts-sa/bursaries/${b.slug}.html">
</head>
<body>
  <h1>${b.name}</h1>
  <p>${b.description}</p>
  <p>Closing Date: ${b.closingDate}</p>
</body>
</html>
  `;

  fs.writeFileSync(
    path.join(outDir, `${b.slug}.html`),
    html
  );
}

console.log(`Generated ${bursaries.length} SEO pages`);
