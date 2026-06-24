const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "..", "public", "index.html");

fs.mkdirSync(path.dirname(outputPath), { recursive: true });

fs.writeFileSync(outputPath, `
<!DOCTYPE html>
<html>
<head>
  <title>Bursary Alerts SA</title>
</head>
<body>
  <h1>Latest Bursaries</h1>
</body>
</html>
`);

console.log("Homepage generated successfully");
