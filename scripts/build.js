const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const publicDir = path.join(__dirname, "../public");

// Clean build
fs.rmSync(publicDir, { recursive: true, force: true });
fs.mkdirSync(publicDir, { recursive: true });

console.log("🚀 Starting V2 stable build");

// Run generator
execSync("node scripts/generate-pages.js", { stdio: "inherit" });

// SAFETY CHECK (THIS IS WHAT FIXES YOUR WHITE PAGE ISSUE)
const indexPath = path.join(publicDir, "index.html");

if (!fs.existsSync(indexPath)) {
  throw new Error("❌ index.html missing - build aborted");
}

const stats = fs.statSync(indexPath);
if (stats.size < 100) {
  throw new Error("❌ index.html too small - likely broken build");
}

console.log("✅ Build validated successfully");
