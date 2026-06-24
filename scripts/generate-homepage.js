const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "..", "public", "index.html");

const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Bursary Alerts SA</title>
  <meta name="description" content="Latest South African bursaries">
</head>
<body>
  <h1>Bursary Alerts SA</h1>
  <p>Updated bursaries for South African students.</p>
</body>
</html>
`;

fs.writeFileSync(outputPath, html);

console.log("Homepage generated successfully");
