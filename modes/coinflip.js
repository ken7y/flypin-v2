// js/modes/coinflip.js
export function init(container) {
  container.innerHTML = `
      <div style="text-align: center; margin-top: 2rem;">
        <button id="flipBtn">Flip Coin</button>
        <div id="result" style="font-size: 2rem; margin-top: 1rem;"></div>
      </div>
    `;

  const flipBtn = container.querySelector("#flipBtn");
  const result = container.querySelector("#result");

  flipBtn.addEventListener("click", () => {
    const flip = Math.random() < 0.5 ? "Heads" : "Tails";
    result.textContent = flip;
  });
}
