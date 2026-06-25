const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const publicDir = path.join(__dirname, "../public");

// Clean build folder
fs.rmSync(publicDir, { recursive: true, force: true });
fs.mkdirSync(publicDir, { recursive: true });

console.log("🚀 Starting V2 build...");

// Generate pages
execSync("node scripts/generate-pages.js", { stdio: "inherit" });

// =====================
// SAFETY CHECKS
// =====================
const indexPath = path.join(publicDir, "index.html");

if (!fs.existsSync(indexPath)) {
  throw new Error("❌ Build failed: index.html missing");
}

const size = fs.statSync(indexPath).size;

if (size < 100) {
  throw new Error("❌ Build failed: index.html too small");
}

console.log("✅ V2 build successful");
