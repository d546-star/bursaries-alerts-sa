const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/bursaries.json");
const outputPath = path.join(__dirname, "../public/index.html");

const bursaries = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

const latest = bursaries.slice(0, 6);

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Bursary Alerts South Africa 2026</title>
  <meta name="description" content="Find verified bursaries in South Africa including NSFAS, engineering, teaching, and medical funding.">
</head>

<body>

<header>
  <h1>Bursary Alerts South Africa</h1>
  <p>Verified bursaries, funding guides, and application details</p>
</header>

<main>

  <h2>Latest Bursaries</h2>

  <div>
    ${latest.map(b => `
      <div style="border:1px solid #ddd; padding:10px; margin:10px 0;">
        <h3>${b.name}</h3>
        <p>${b.description || ""}</p>
        <p><b>Closing:</b> ${b.closingDate || "TBA"}</p>
        <a href="bursaries/${b.slug}.html">View Details</a>
      </div>
    `).join("")}
  </div>

  <h2>Categories</h2>
  <ul>
    <li><a href="categories/engineering.html">Engineering</a></li>
    <li><a href="categories/accounting.html">Accounting</a></li>
    <li><a href="categories/medicine.html">Medicine</a></li>
    <li><a href="categories/teaching.html">Teaching</a></li>
  </ul>

</main>

<footer>
  <p>© 2026 Bursary Alerts SA</p>
</footer>

</body>
</html>
`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
const fs = require("fs");

fs.writeFileSync("public/index.html", html);

console.log("Homepage generated successfully");
