fetch('bursaries.json')
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('list');

    data.forEach(b => {
      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = `
        <h3>${b.title}</h3>
        <p>${b.description}</p>
        <a href="${b.link}" target="_blank">Apply</a>
      `;
      list.appendChild(div);
    });
  });
