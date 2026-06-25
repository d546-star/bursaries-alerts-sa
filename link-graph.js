const fs = require("fs");
const path = require("path");

const bursaries = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "data", "bursaries.json"),
    "utf8"
  )
);

function buildLinks(currentSlug, category) {
  return bursaries
    .filter(b => b.slug !== currentSlug)
    .slice(0, 6)
    .map(
      b =>
        `<li><a href="../bursaries/${b.slug}.html">${b.name}</a></li>`
    )
    .join("");
}

module.exports = { buildLinks };
