const fs = require("fs");
const path = require("path");

const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Bursary Alerts South Africa 2026</title>
  <meta name="description" content="Find latest bursaries in South Africa">
</head>

<body>
  <h1>South African Bursaries 2026</h1>

  <h2>Categories</h2>
  <ul>
    <li><a href="/bursaries/engineering/">Engineering</a></li>
    <li><a href="/bursaries/it/">IT</a></li>
    <li><a href="/bursaries/medicine/">Medicine</a></li>
  </ul>

  <h2>Latest Opportunities</h2>
  <p>Updated daily bursary listings for students in South Africa.</p>
</body>
</html>
`;

fs.writeFileSync(
  path.join(__dirname, "public", "index.html"),
  html
);

console.log("Homepage V3 generated");
