const fs = require("fs");
const path = require("path");

const keywords = JSON.parse(
  fs.readFileSync("./data/keywords.json", "utf-8")
);

const outputDir = path.join(__dirname, "public", "seo-pages");
fs.mkdirSync(outputDir, { recursive: true });

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

keywords.forEach(keyword => {
  const slug = slugify(keyword);

  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>${keyword}</title>
  <meta name="description" content="Information about ${keyword}">
</head>
<body>

<h1>${keyword}</h1>

<p>This page answers search intent for: <strong>${keyword}</strong></p>

<p>Explore related bursaries and application details.</p>

</body>
</html>
`;

  fs.writeFileSync(
    path.join(outputDir, `${slug}.html`),
    html
  );
});

console.log("V9 keyword pages generated");
