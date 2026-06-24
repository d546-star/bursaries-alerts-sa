const outputDir = path.join(__dirname, "public", "bursaries");

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });

const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "data", "bursaries.json");

if (!fs.existsSync(dataPath)) {
  throw new Error("Missing data/bursaries.json");
}

const bursaries = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
