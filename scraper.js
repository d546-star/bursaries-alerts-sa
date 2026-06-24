const fs = require("fs");
const https = require("https");

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = "";

      res.on("data", chunk => data += chunk);
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on("error", reject);
  });
}

// simple category classifier
function classify(text) {
  text = text.toLowerCase();

  if (text.includes("engineer")) return "engineering";
  if (text.includes("it") || text.includes("computer")) return "it";
  if (text.includes("nurse")) return "nursing";
  if (text.includes("doctor") || text.includes("medical")) return "medicine";
  if (text.includes("finance") || text.includes("account")) return "finance";

  return "general";
}

// content enrichment (no AI API needed)
function enrich(item) {
  return {
    title: item.title || item.name,
    description:
      item.description +
      " This bursary supports South African students and may include tuition, accommodation, and study materials.",
    link: item.link || "#",
    category: classify(item.description || item.title || "")
  };
}

async function run() {
  const sources = JSON.parse(fs.readFileSync("sources.json"));

  let all = [];

  for (const s of sources) {
    try {
      const data = await fetchJSON(s.url);
      all = all.concat(data);
    } catch (e) {
      console.log("Skipping:", s.name);
    }
  }

  // deduplicate
  const seen = new Set();
  const cleaned = [];

  for (const item of all) {
    const key = item.title?.toLowerCase();
    if (!key || seen.has(key)) continue;

    seen.add(key);
    cleaned.push(enrich(item));
  }

  fs.writeFileSync(
    "data/bursaries.json",
    JSON.stringify(cleaned, null, 2)
  );

  console.log(`Scraped + processed: ${cleaned.length} bursaries`);
}

run();
