const container = document.getElementById("container");
const resetBtn = document.getElementById("resetBtn");

let isMouseDown = false; // track if mouse is pressed

// Generate a random RGB color
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Function to create the grid
function createGrid(size) {
  container.innerHTML = ""; // clear old grid
  const containerWidth = container.clientWidth;
  const squareSize = containerWidth / size;

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;

    console.log(`Square size: ${i}`);

    // Paint on click
    square.addEventListener("mousedown", () => {
      square.style.backgroundColor = getRandomColor();
    });

    // Paint while dragging with mouse down
    square.addEventListener("mouseenter", () => {
      if (isMouseDown) {
        square.style.backgroundColor = getRandomColor();
      }
    });

    container.appendChild(square);
  }
}

// Track mouse state
document.body.addEventListener("mousedown", () => {
  isMouseDown = true;
});

document.body.addEventListener("mouseup", () => {
  isMouseDown = false;
});

// Default grid 16x16
createGrid(16);

// Button to reset grid
resetBtn.addEventListener("click", () => {
  let newSize = prompt("Enter the number of squares per side (max 100):");
  newSize = parseInt(newSize);

  if (newSize > 0 && newSize <= 100) {
    createGrid(newSize);
  } else {
    alert("Please enter a valid number between 1 and 100");
  }
});

// Rebuild grid on window resize
window.addEventListener("resize", () => {
  const squaresPerSide = Math.sqrt(container.children.length);
  createGrid(squaresPerSide);
});
