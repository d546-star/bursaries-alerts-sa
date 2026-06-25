const fs = require("fs");
const path = require("path");

const outputDir = path.join(__dirname, "public");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// SAMPLE CONTENT (replace with your real bursary generator logic)
const bursaries = [
  { title: "NSFAS Bursary", link: "#" },
  { title: "Vodacom Bursary", link: "#" }
];

const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Bursaries Alerts SA</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>Bursaries in South Africa</h1>
  <ul>
    ${bursaries.map(b => `<li><a href="${b.link}">${b.title}</a></li>`).join("")}
  </ul>
</body>
</html>
`;

const outputPath = path.join(outputDir, "index.html");

if (!html || html.trim().length < 50) {
  throw new Error("HTML generation failed: output too small");
}

fs.writeFileSync(outputPath, html, "utf8");

console.log("Pages generated successfully:", outputPath);
