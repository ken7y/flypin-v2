// modes/rng.js

export function init(container) {
  container.innerHTML = `
      <div style="text-align: center; padding: 2rem;">
        <h2>Random Number Generator</h2>
        <div style="margin: 1rem 0;">
          <label>Min: <input type="number" id="rng-min" value="0" /></label>
          <label style="margin-left: 1rem;">Max: <input type="number" id="rng-max" value="100" /></label>
        </div>
        <button id="rng-generate" style="padding: 0.5rem 1rem;">Generate</button>
        <h3 id="rng-result" style="margin-top: 2rem;"></h3>
      </div>
    `;

  const minInput = container.querySelector("#rng-min");
  const maxInput = container.querySelector("#rng-max");
  const resultEl = container.querySelector("#rng-result");
  const button = container.querySelector("#rng-generate");

  button.addEventListener("click", () => {
    const min = parseInt(minInput.value, 10);
    const max = parseInt(maxInput.value, 10);

    if (isNaN(min) || isNaN(max) || min > max) {
      resultEl.textContent = "Please enter a valid range.";
      return;
    }

    const rand = Math.floor(Math.random() * (max - min + 1)) + min;
    resultEl.textContent = `🎲 Result: ${rand}`;
  });

  // When the page loads, we don't need to create a new button.
  // Instead, we toggle the visibility of the mode selection.
  const menuBtn = document.querySelector("#menuBtn");
  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      document.querySelector("#modeSelector").classList.remove("hidden"); // Show mode menu
      container.innerHTML = ""; // Clear current mode content
    });
  }
}
