const fs = require("fs");
const path = require("path");

const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Bursary Alerts SA</title>
  <meta name="description" content="Latest South African bursaries for students">
</head>
<body>
  <h1>Bursary Alerts SA</h1>
  <p>Updated daily with scholarships and bursaries.</p>

  <h2>Latest Opportunities</h2>

  <ul>
    <li><a href="bursaries/nsfas-bursary-2026-engineering-0.html">NSFAS Engineering</a></li>
    <li><a href="bursaries/sasol-bursary-2026-it-1.html">Sasol IT Bursary</a></li>
  </ul>
</body>
</html>
`;

fs.writeFileSync(
  path.join(__dirname, "..", "public", "index.html"),
  html
);

console.log("Homepage generated");
