const fs = require("fs");
const path = require("path");
const https = require("https");

const outputFile = path.join(__dirname, "../generate/bursaries.json");

// You can replace these with real RSS/API sources later
const SOURCES = [
  "https://raw.githubusercontent.com/example/bursary-feed.json"
];

async function fetchJSON(url) {
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

async function run() {
  let allBursaries = [];

  for (const url of SOURCES) {
    try {
      const data = await fetchJSON(url);
      allBursaries = allBursaries.concat(data);
    } catch (e) {
      console.log("Source failed:", url);
    }
  }

  // CLEAN + NORMALISE
  const cleaned = allBursaries.map((b, i) => ({
    title: b.title || `Bursary ${i}`,
    slug: (b.title || `bursary-${i}`)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-"),
    description: b.description || "Latest bursary opportunity in South Africa.",
    link: b.link || "#"
  }));

  fs.writeFileSync(outputFile, JSON.stringify(cleaned, null, 2));

  console.log(`Fetched + cleaned ${cleaned.length} bursaries`);
}

run();
