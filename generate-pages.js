const fs = require("fs");
const path = require("path");
const { buildLinks } = require("./link-graph");

const bursaries = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "bursaries.json"))
);

const categories = ["engineering", "it", "medicine", "finance"];

const outDir = path.join(__dirname, "public", "bursaries");
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

categories.forEach(cat => {
  bursaries.forEach(b => {

    const html = `
<!DOCTYPE html>
<html>
<head>
  <title>${b.title} - ${cat} Bursary South Africa</title>

  <meta name="description" content="${b.description} - Apply for ${cat} bursaries in South Africa 2026">

  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- AdSense-safe structure -->
</head>

<body>

  <header>
    <h1>${b.title}</h1>
    <p>${b.description}</p>
  </header>

  <section>
    <h2>Eligibility</h2>
    <p>Open to South African students interested in ${cat} studies.</p>
  </section>

  <section>
    <h2>Study Fields Covered</h2>
    <ul>
      <li>${cat}</li>
      <li>Related STEM fields</li>
    </ul>
  </section>

  <section>
    <h2>Related Bursaries</h2>
    <ul>
      ${buildLinks(b, cat)}
    </ul>
  </section>

  <footer>
    <p>Updated 2026 bursary database - South Africa</p>
  </footer>

</body>
</html>
    `;

    fs.writeFileSync(
      path.join(outDir, `${cat}-${b.slug}.html`),
      html
    );
  });
});

console.log("V5 pages generated with link graph");
