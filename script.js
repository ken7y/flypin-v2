const modeContainer = document.getElementById("mode-container");
const navButtons = document.querySelectorAll(".nav-button");

let currentMode = null;

window.addEventListener("DOMContentLoaded", () => {
  // Auto-load mode 1 on page load
  loadMode("fingerpicker");
  setActiveButton("fingerpicker");
});

// Highlight active button
function setActiveButton(mode) {
  navButtons.forEach((btn) => {
    if (btn.dataset.mode === mode) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

// Attach event listeners to buttons
navButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const selectedMode = btn.dataset.mode;
    loadMode(selectedMode);
    setActiveButton(selectedMode);
  });
});

function clearModeContainer() {
  modeContainer.innerHTML = "";
}

function loadMode(mode) {
  clearModeContainer();

  let importPath = null;
  switch (mode) {
    case "fingerpicker":
      importPath = "./modes/fingerpicker.js";
      break;
    case "coinflip":
      importPath = "./modes/coinflip.js";
      break;
    case "dice":
      importPath = "./modes/dice.js";
      break;
    case "rng":
      importPath = "./modes/rng.js";
      break;
    default:
      console.warn("Unknown mode:", mode);
      return;
  }

  import(importPath)
    .then((module) => {
      module.init(modeContainer);
    })
    .catch((err) => {
      console.error(`Failed to load mode '${mode}'`, err);
      modeContainer.innerHTML = `<p style="color: red;">Error loading mode: ${mode}</p>`;
    });

  currentMode = mode;
}
