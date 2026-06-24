const fs = require("fs");

const data = JSON.parse(fs.readFileSync("bursaries.json", "utf8"));

const template = (item) => `
<!DOCTYPE html>
<html>
<head>
  <title>${item.title} | Bursaries South Africa</title>
  <meta name="description" content="${item.description}">
</head>

<body>

<h1>${item.title}</h1>

<p>${item.description}</p>

<a href="${item.link}" target="_blank">Apply Here</a>

<br><br>
<a href="../index.html">← Back to home</a>

</body>
</html>
`;

if (!fs.existsSync("public/bursary")) {
  fs.mkdirSync("public/bursary", { recursive: true });
}

data.forEach(item => {
  fs.writeFileSync(
    `public/bursary/${item.slug}.html`,
    template(item)
  );
});
