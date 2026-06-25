const { execSync } = require("child_process");

console.log("🚀 V4 AUTOPILOT START");

// STEP 1: fetch new bursaries
execSync("node scripts/fetch-bursaries.js", { stdio: "inherit" });

// STEP 2: AI enrichment
execSync("node scripts/enrich-ai.js", { stdio: "inherit" });

// STEP 3: generate pages
execSync("node scripts/generate-pages.js", { stdio: "inherit" });

// STEP 4: sitemap
execSync("node scripts/generate-sitemap.js", { stdio: "inherit" });

console.log("✅ AUTOPILOT COMPLETE");
