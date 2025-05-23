export function renderSE(container, data) {
  data.forEach(e => {
    const se = `
        <div>
          <input type="checkbox" id="${e.id}">
          <label for="${e.id}">${e.en}</label>
        </div>
     `
    container.innerHTML += se;
  });
}

