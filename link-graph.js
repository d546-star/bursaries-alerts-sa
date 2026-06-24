const fs = require("fs");
const path = require("path");

const bursaries = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "bursaries.json"))
);

const categories = ["engineering", "it", "medicine", "finance"];

function buildLinks(current, category) {
  return bursaries
    .slice(0, 6)
    .map(b => {
      return `<li><a href="/bursaries/${category}/${b.slug}.html">${b.title}</a></li>`;
    })
    .join("");
}

module.exports = { buildLinks };
