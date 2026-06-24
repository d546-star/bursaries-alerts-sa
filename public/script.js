fetch('bursaries.json')
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("list");

    list.innerHTML = data.map(item => `
      <div class="card">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <a href="bursary/${item.slug}.html">View Details</a>
      </div>
    `).join("");
  });
fetch('bursaries.json')
  .then(res => res.json())
  .then(data => {
    document.getElementById("list").innerHTML = data.map(item => `
      <div class="card">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <a href="bursary/${item.slug}.html">View Full Details</a>
      </div>
    `).join("");
  });
