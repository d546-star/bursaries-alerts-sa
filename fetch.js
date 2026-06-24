const fs = require('fs');

const bursaries = [
  {
    title: "NSFAS Funding",
    description: "Government student funding",
    link: "https://www.nsfas.org.za"
  },
  {
    title: "Capitec Bursary",
    description: "Bank bursary programme",
    link: "https://www.capitecbank.co.za"
  }
];

fs.writeFileSync('bursaries.json', JSON.stringify(bursaries, null, 2));

console.log("Updated bursaries.json");
