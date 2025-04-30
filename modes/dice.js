// js/modes/dice.js
export function init(container) {
    container.innerHTML = `
      <div style="text-align: center; margin-top: 2rem;">
        <label for="diceType">Dice Type:</label>
        <select id="diceType">
          <option value="6">D6</option>
          <option value="20">D20</option>
        </select>
        <br><br>
        <button id="rollBtn">Roll Dice</button>
        <div id="diceResult" style="font-size: 2rem; margin-top: 1rem;"></div>
      </div>
    `;
  
    const rollBtn = container.querySelector('#rollBtn');
    const result = container.querySelector('#diceResult');
    const diceType = container.querySelector('#diceType');
  
    rollBtn.addEventListener('click', () => {
      const sides = parseInt(diceType.value, 10);
      const roll = Math.floor(Math.random() * sides) + 1;
      result.textContent = `🎲 ${roll}`;
    });
  }
  