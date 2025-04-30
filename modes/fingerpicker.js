export function init(modeContainer) {
  // Create touch area element dynamically
  const touchArea = document.createElement("div");
  touchArea.id = "touchArea";

  // Ensure the touch area fills the container or viewport
  touchArea.style.width = "100vw"; // Use viewport width
  touchArea.style.height = "100vh"; // Use viewport height
  touchArea.style.backgroundColor = "#f0f0f0";
  touchArea.style.position = "absolute"; // Ensure it takes up the whole screen
  touchArea.style.overflow = "hidden";
  touchArea.style.touchAction = "none"; // Disable default touch actions

  // Append to the mode container
  modeContainer.appendChild(touchArea);

  // Handle touch events
  let touchElements = {}; // Store touch elements
  let currentTouches = []; // Store active touch points
  let selectedTouch = null; // Track the currently selected touch
  let lastTouchCount = 0; // Track the last number of active touches
  let selectionTimeout = null; // Timeout for the selection after inactivity
  const SELECTION_DELAY = 3000; // 3 seconds delay to select a touch

  // Function to pick a random touch from the current touches
  function pickRandomTouch() {
    if (currentTouches.length >= 2) {
      const randomIndex = Math.floor(Math.random() * currentTouches.length);
      selectedTouch = currentTouches[randomIndex];
      updateSelectedTouch();
    }
  }

  function resetAnimations() {
    Object.values(touchElements).forEach((el) => {
      el.style.animation = "none";
      // Force reflow to restart animation
      void el.offsetWidth;
      el.style.animation = "";
    });
  }

  // Function to update the visual selection of the chosen touch
  function updateSelectedTouch() {
    // Hide all touch points except the selected one
    Object.values(touchElements).forEach((touchElement) => {
      if (touchElement.id !== `touch-${selectedTouch.identifier}`) {
        touchElement.style.display = "none"; // Hide non-selected touches
      }
    });

    // Show only the selected touch point
    if (selectedTouch && touchElements[selectedTouch.identifier]) {
      touchElements[selectedTouch.identifier].style.display = "block"; // Make selected touch visible
      touchElements[selectedTouch.identifier].classList.add("selected");
    }
  }

  // Function to reset state
  function resetState() {
    // Reset selected touch
    selectedTouch = null;

    // Reset all touch points to visible
    Object.values(touchElements).forEach((touchElement) => {
      touchElement.style.display = "block";
      touchElement.classList.remove("selected");
    });
  }

  // Handle touch start event
  function handleTouchStart(event) {
    event.preventDefault(); // Prevent default behavior (like scrolling)
    resetAnimations();
    for (let i = 0; i < event.changedTouches.length; i++) {
      const touch = event.changedTouches[i];

      const touchElement = document.createElement("div");
      touchElement.classList.add("touch-point");
      touchElement.style.left = `${touch.clientX}px`;
      touchElement.style.top = `${touch.clientY}px`;
      touchElement.id = `touch-${touch.identifier}`;
      touchElement.style.display = "block"; // Show the touch point initially

      touchArea.appendChild(touchElement); // Add the touch point to the screen
      currentTouches.push(touch); // Track the touch
      touchElements[touch.identifier] = touchElement; // Store touch element for future reference
    }

    // Reset the timeout for selecting a touch
    if (selectionTimeout) {
      clearTimeout(selectionTimeout);
    }

    // Reset state if the number of active touches changes
    if (currentTouches.length !== lastTouchCount) {
      lastTouchCount = currentTouches.length;
      selectionTimeout = setTimeout(() => {
        pickRandomTouch(); // Pick a random touch after the delay if there are two or more fingers
      }, SELECTION_DELAY);
    }
  }

  // Handle touch move event
  function handleTouchMove(event) {
    event.preventDefault();
    for (let i = 0; i < event.changedTouches.length; i++) {
      const touch = event.changedTouches[i];
      const touchElement = touchElements[touch.identifier];

      if (touchElement) {
        // Update touch point's position as user moves their finger
        touchElement.style.left = `${touch.clientX}px`;
        touchElement.style.top = `${touch.clientY}px`;
      }
    }
  }

  // Handle touch end event
  function handleTouchEnd(event) {
    event.preventDefault();
    resetAnimations();
    for (let i = 0; i < event.changedTouches.length; i++) {
      const touch = event.changedTouches[i];
      const touchElement = touchElements[touch.identifier];

      if (touchElement) {
        touchArea.removeChild(touchElement); // Remove the touch element when the touch ends
        delete touchElements[touch.identifier]; // Clean up the tracking data
        currentTouches = currentTouches.filter(
          (t) => t.identifier !== touch.identifier
        ); // Remove touch from active touches
      }
    }

    // Reset state only when all fingers are lifted
    if (currentTouches.length === 0) {
      resetState();
    }

    // Handle change in active touch count
    if (currentTouches.length !== lastTouchCount) {
      lastTouchCount = currentTouches.length;
      clearTimeout(selectionTimeout);
      if (currentTouches.length >= 2) {
        // Restart selection timeout if two or more fingers remain
        selectionTimeout = setTimeout(() => {
          pickRandomTouch();
        }, SELECTION_DELAY);
      }
    }
  }

  // Set up event listeners for touch events
  touchArea.addEventListener("touchstart", handleTouchStart, false);
  touchArea.addEventListener("touchmove", handleTouchMove, false);
  touchArea.addEventListener("touchend", handleTouchEnd, false);
}
