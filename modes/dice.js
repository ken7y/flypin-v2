export function init(container) {
  container.innerHTML = `
      <div class="dice-wrapper">
      <div class="dice-container">
        <div class="dice" id="dice">
          <div class="dice-face front">1</div>
          <div class="dice-face back">2</div>
          <div class="dice-face left">3</div>
          <div class="dice-face right">4</div>
          <div class="dice-face top">5</div>
          <div class="dice-face bottom">6</div>
        </div>
      </div>
      <button id="rollBtn">Roll D6</button>
      </div>
    `;

  const dice = container.querySelector("#dice");
  const rollBtn = container.querySelector("#rollBtn");
  const DURATION = 3000; // match CSS transition time

  // Final rotations for each face
  const faceRotations = {
    1: { x: 0, y: 0 }, // front
    2: { x: 0, y: 180 },
    3: { x: 0, y: -90 },
    4: { x: 0, y: 90 },
    5: { x: 90, y: 0 },
    6: { x: -90, y: 0 },
  };

  rollBtn.addEventListener("click", () => {
    rollBtn.disabled = true;

    // 1) Reset to 0°
    dice.style.transition = "none";
    dice.style.transform = "rotateX(0deg) rotateY(0deg)";
    void dice.offsetWidth; // force reflow

    // 2) Decide result and compute total spins + final face
    const result = Math.floor(Math.random() * 6) + 1;
    const { x, y } = faceRotations[result];
    const spins = 5; // number of full spins
    const targetX = spins * 360 + x;
    const targetY = spins * 360 + y;

    // 3) Apply the smooth 3s transition to the final rotation
    dice.style.transition = `transform ${DURATION}ms ease`;
    dice.style.transform = `rotateX(${targetX}deg) rotateY(${targetY}deg)`;

    // 4) Re-enable the button after the spin completes
    setTimeout(() => {
      rollBtn.disabled = false;
    }, DURATION);
  });
}
