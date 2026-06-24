const fs = require("fs");
const path = require("path");

const publicDir = path.join(__dirname, "..", "public");

// ALWAYS ensure folder exists
fs.mkdirSync(publicDir, { recursive: true });

const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Bursary Alerts SA</title>
  <meta name="description" content="Latest bursaries in South Africa 2026">
</head>
<body>
  <h1>Latest Bursaries SA</h1>
  <p>Updated daily list of bursaries</p>
  <a href="/bursaries/nsfas-bursary-2026.html">NSFAS</a>
</body>
</html>
`;

fs.writeFileSync(path.join(publicDir, "index.html"), html);

console.log("Homepage generated successfully");
