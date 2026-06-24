const fs = require("fs");

// SAFE FILE LOADER
function readJSON(path, fallback = []) {
  try {
    return JSON.parse(fs.readFileSync(path, "utf8"));
  } catch (e) {
    console.log(`⚠️ Missing or invalid ${path}, using fallback`);
    return fallback;
  }
}

// ENSURE FOLDERS EXIST
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// LOAD DATA SAFELY
const data = readJSON("bursaries.json");

// PREVENT CRASH IF EMPTY
if (!data.length) {
  console.log("⚠️ No bursaries found, skipping generation");
  process.exit(0);
}

ensureDir("public/bursary");

// SAFE PAGE GENERATION
data.forEach(item => {
  if (!item.slug || !item.title) {
    console.log("⚠️ Skipping invalid item:", item);
    return;
  }

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>${item.title}</title>
    <meta name="description" content="${item.description || ''}">
  </head>

  <body>
    <h1>${item.title}</h1>
    <p>${item.description || ''}</p>

    <a href="${item.link || '#'}">Apply</a>

    <br><br>
    <a href="../index.html">Back</a>
  </body>
  </html>
  `;

  fs.writeFileSync(`public/bursary/${item.slug}.html`, html);
});

console.log("✅ Generation complete");
