const fs = require("fs");

const data = JSON.parse(fs.readFileSync("bursaries.json", "utf8"));

function aiWrite(item) {
  // simulated "AI SEO writing engine"
  return `
<!DOCTYPE html>
<html>
<head>
  <title>${item.link} | Bursaries South Africa 2026</title>
  <meta name="description" content="${item.description}">
  <meta name="keywords" content="${item.keywords}">
</head>

<body>

<h1>${item.link}</h1>

<h2>Overview</h2>
<p>
The ${item.link} program provides funding opportunities for South African students.
This bursary helps students access higher education without financial barriers.
</p>

<h2>Why This Bursary Matters</h2>

<p>
This bursary helps students reduce financial pressure and access higher education opportunities in South Africa.
</p>

<h2>Tips to Improve Your Chances</h2>

<ul>
  <li>Maintain strong academic results</li>
  <li>Apply early before deadlines</li>
  <li>Prepare all documents properly</li>
</ul>

<h2>Eligibility</h2>
<ul>
  <li>South African citizen</li>
  <li>Must meet academic requirements</li>
  <li>Financial need may apply</li>
</ul>

<h2>How to Apply</h2>
<p>
Visit the official application portal and submit required documents before the deadline.
</p>

<a href="${item.link}" target="_blank">Apply Here</a>

<h2>Recommended Study Resources</h2>

<p>
Improve your chances of getting funded by improving your marks:
</p>

<a href="YOUR_AFFILIATE_LINK_HERE" target="_blank">
👉 Free Online Courses
</a>

<br><br>
<a href="../index.html">← Back to home</a>

</body>
</html>
`;
}

if (!fs.existsSync("public/bursary")) {
  fs.mkdirSync("public/bursary", { recursive: true });
}

data.forEach(item => {
  const page = aiWrite(item);
  fs.writeFileSync(`public/bursary/${item.slug}.html`, page);
});
