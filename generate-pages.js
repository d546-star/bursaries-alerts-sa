const fs = require("fs");
const path = require("path");

const data = require("./data/bursaries.json");

const outputDir = path.join(__dirname, "public/bursaries");

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });

data.forEach(b => {
  const html = `
  <html>
    <head>
      <title>${b.name}</title>
    </head>
    <body>
      <h1>${b.name}</h1>
      <p>${b.description || ""}</p>
      <p>Closing Date: ${b.closingDate || "TBA"}</p>
    </body>
  </html>
  `;

  fs.writeFileSync(
    path.join(outputDir, `${b.slug}.html`),
    html
  );
});
