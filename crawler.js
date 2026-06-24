const fs = require("fs");
const https = require("https");

const sources = [
  "https://raw.githubusercontent.com/your-source/bursaries-feed.json"
];

// simple fetch helper
function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => resolve(data));
    }).on("error", reject);
  });
}

(async () => {
  let all = [];

  for (const url of sources) {
    try {
      const data = await fetch(url);
      const parsed = JSON.parse(data);
      all = all.concat(parsed);
    } catch (e) {
      console.log("Failed source:", url);
    }
  }

  // normalize structure
  const cleaned = all.map(item => ({
    name: item.name || item.title,
    slug: (item.slug || item.title || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-"),
    description: item.description || "",
    closingDate: item.closingDate || "TBA",
    category: item.category || "general",
    source: item.link || ""
  }));

  fs.writeFileSync(
    "data/bursaries.json",
    JSON.stringify(cleaned, null, 2)
  );

  console.log("Crawler updated bursaries.json");
})();
