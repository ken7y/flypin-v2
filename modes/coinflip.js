export function init(container) {
  container.innerHTML = `
      <div class="coin-container">
        <div class="coin" id="coin">
          <div class="coin-face coin-front">Heads</div>
          <div class="coin-face coin-back">Tails</div>
        </div>
        <button id="flipBtn">Flip</button>
      </div>
    `;

  const coin = container.querySelector("#coin");
  const flipBtn = container.querySelector("#flipBtn");
  const FLIP_DURATION = 3000; // animation duration in ms

  flipBtn.addEventListener("click", () => {
    flipBtn.disabled = true;

    // 1) Remove any old classes
    coin.classList.remove("animate-heads", "animate-tails");
    // 2) Reset inline transform to 0°
    coin.style.transform = "rotateY(0deg)";
    // 3) Force reflow so the browser registers the reset
    void coin.offsetWidth;

    // 4) Pick heads or tails
    const isHeads = Math.random() < 0.5;
    coin.classList.add(isHeads ? "animate-heads" : "animate-tails");

    // 5) Re-enable the button once the flip time elapses
    setTimeout(() => {
      flipBtn.disabled = false;
      // Clear inline transform so future flips use CSS transition
      coin.style.transform = "";
    }, FLIP_DURATION);
  });
}
