const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const nextButtons = document.querySelectorAll(".next-btn");
const currentNumber = document.getElementById("current");
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const replayBtn = document.getElementById("replayBtn");

let current = 0;

function showSlide(index) {
  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;

  slides[current].classList.remove("active");
  dots[current].classList.remove("active");

  current = index;

  slides[current].classList.add("active");
  dots[current].classList.add("active");
  currentNumber.textContent = String(current + 1).padStart(2, "0");
}

nextButtons.forEach((button) => {
  button.addEventListener("click", () => {
    showSlide(current + 1);
    startMusic();
  });
});

replayBtn.addEventListener("click", () => {
  showSlide(0);
  startMusic();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" || e.key === " ") {
    e.preventDefault();
    showSlide(current + 1);
  }

  if (e.key === "ArrowLeft") {
    showSlide(current - 1);
  }
});

// Swipe support for mobile
let touchStartX = 0;

document.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener("touchend", (e) => {
  const touchEndX = e.changedTouches[0].screenX;
  const distance = touchEndX - touchStartX;

  if (Math.abs(distance) > 60) {
    if (distance < 0) showSlide(current + 1);
    else showSlide(current - 1);
  }
}, { passive: true });

function startMusic() {
  music.play()
    .then(() => {
      musicBtn.classList.add("playing");
      musicBtn.textContent = "♫";
    })
    .catch(() => {
      // Browser may block autoplay until user interacts.
    });
}

musicBtn.addEventListener("click", () => {
  if (music.paused) {
    startMusic();
  } else {
    music.pause();
    musicBtn.classList.remove("playing");
    musicBtn.textContent = "♪";
  }
});

// Floating hearts
function createHeart() {
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = Math.random() > .45 ? "♥" : "♡";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (9 + Math.random() * 18) + "px";
  heart.style.animationDuration = (6 + Math.random() * 7) + "s";
  heart.style.animationDelay = Math.random() * 2 + "s";

  document.querySelector(".hearts").appendChild(heart);

  setTimeout(() => heart.remove(), 15000);
}

setInterval(createHeart, 650);

// Try music when user first interacts anywhere
document.addEventListener("click", () => {
  if (music.paused) startMusic();
}, { once: true });
