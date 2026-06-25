const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "../generate/bursaries.json");

let data = JSON.parse(fs.readFileSync(file, "utf8"));

data = data.map(b => {
  return {
    ...b,
    seoTitle: `${b.title} 2026 Application Guide`,
    metaDescription: `${b.title} - Apply for this bursary opportunity in South Africa. Requirements, deadlines, and application details.`,
    keywords: `${b.title}, bursary South Africa, funding, study support`
  };
});

fs.writeFileSync(file, JSON.stringify(data, null, 2));

console.log("AI enrichment complete");
