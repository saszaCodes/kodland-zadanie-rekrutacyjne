// Get elements
const carousel = document.querySelector(".carousel");
const slides = document.querySelectorAll(".carousel__slide");
const nextButton = document.querySelector(".carousel__nav-button--next");
const prevButton = document.querySelector(".carousel__nav-button--prev");
const dots = document.querySelector(".carousel__nav-dots");

// Variables
let viewportPosition = 0;
let viewportWidth;
let totalSlidesWidth;
let maxViewportPosition;

// Util functions

const updateTotalSlidesWidth = () => {
  let newWidth = 0;
  slides.forEach((slide) => (newWidth += slide.clientWidth));
  totalSlidesWidth = newWidth;
};

const updateViewportWidth = () => {
  viewportWidth = carousel.clientWidth;
};

const updateMaxViewportPosition = () => {
  maxViewportPosition = Math.floor((totalSlidesWidth - 1) / viewportWidth);
};

const updateVariables = () => {
  updateViewportWidth();
  updateTotalSlidesWidth();
  updateMaxViewportPosition();
};

const updateDotClasses = () => {
  Array.from(dots.children).forEach((dot, idx) => {
    dot.classList.remove("carousel__nav-dots__dot--active");
    if (idx === viewportPosition) {
      dot.classList.add("carousel__nav-dots__dot--active");
    } else {
      dot.classList.add("carousel__nav-dots__dot");
    }
  });
};

const updateNavButtonsDisplay = () => {
  if (viewportPosition === maxViewportPosition)
    nextButton.style.display = "none";
  else nextButton.style.display = "initial";
  if (viewportPosition === 0) prevButton.style.display = "none";
  else prevButton.style.display = "initial";
};

updateVariables();

// Nav functions

const goToPosition = (n) => {
  if (n > maxViewportPosition) return;
  if (n < 0) return;
  viewportPosition = n;

  carousel.style.left = `-${viewportPosition * viewportWidth}px`;
  updateDotClasses();
  updateNavButtonsDisplay();
};

// Create navigation

const createNavDots = () => {
  dots.innerHTML = "";
  if (maxViewportPosition === 0) return;
  for (let i = 0; i <= maxViewportPosition; i++) {
    const dot = document.createElement("button");
    dot.classList.add("carousel__nav-dots__dot");
    dot.addEventListener("click", () => {
      goToPosition(i);
    });
    dots.appendChild(dot);
  }
  updateDotClasses();
};

nextButton.addEventListener("click", () => goToPosition(viewportPosition + 1));
prevButton.addEventListener("click", () => goToPosition(viewportPosition - 1));

createNavDots();
updateNavButtonsDisplay();

// Update all variables on resize

window.addEventListener("resize", () => {
  updateVariables();
  createNavDots();
  goToPosition(0);
});
