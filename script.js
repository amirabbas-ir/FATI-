const pages = [...document.querySelectorAll(".page")];
const dots = [...document.querySelectorAll(".progress-dot")];
const fallingLayer = document.getElementById("fallingLayer");
const rainButton = document.getElementById("rainButton");
const rainStatus = document.getElementById("rainStatus");

function showPage(pageId) {
  pages.forEach((page) => page.classList.toggle("active", page.id === pageId));
  const pageNumber = Number(pageId.replace("page", "")) - 1;
  dots.forEach((dot, index) => dot.classList.toggle("active", index <= pageNumber));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.getElementById("openLetter").addEventListener("click", () => showPage("page2"));

document.querySelectorAll("[data-next]").forEach((button) => {
  button.addEventListener("click", () => showPage(button.dataset.next));
});

document.getElementById("restart").addEventListener("click", () => showPage("page1"));

const flowers = ["🌸", "🌺", "💗", "💕", "🌷", "💖", "✿", "❀", "💮"];

function makeRain(amount = 42) {
  for (let i = 0; i < amount; i++) {
    const item = document.createElement("span");
    item.className = "fall-item";
    item.textContent = flowers[Math.floor(Math.random() * flowers.length)];
    item.style.setProperty("--x", `${Math.random() * 100}%`);
    item.style.setProperty("--size", `${16 + Math.random() * 19}px`);
    item.style.setProperty("--duration", `${4.8 + Math.random() * 4.8}s`);
    item.style.setProperty("--delay", `${Math.random() * 2.3}s`);
    item.style.setProperty("--drift", `${Math.round(Math.random() * 150 - 75)}px`);
    item.style.setProperty("--spin", `${Math.round(Math.random() * 520 - 260)}deg`);
    item.style.setProperty("--opacity", `${0.62 + Math.random() * 0.36}`);
    fallingLayer.appendChild(item);
    item.addEventListener("animationend", () => item.remove(), { once: true });
  }
}

rainButton.addEventListener("click", () => {
  makeRain(90);
  rainStatus.textContent = "یه بارون صورتی، فقط برای تو 🌸";
  window.setTimeout(() => { rainStatus.textContent = ""; }, 3200);
});

document.getElementById("finalRain").addEventListener("click", () => makeRain(70));

// بارش آرام و ملایم گل‌های صورتی در پس‌زمینه
makeRain(18);
window.setInterval(() => makeRain(5), 2300);


// Opening screen: enter the existing letter site.
const introScreen = document.getElementById("introScreen");
const enterLetter = document.getElementById("enterLetter");
if (enterLetter && introScreen) {
  enterLetter.addEventListener("click", () => {
    document.body.classList.add("show-letter");
    window.scrollTo({ top: 0, behavior: "smooth" });
    makeTapBouquet(window.innerWidth / 2, window.innerHeight * 0.55, 12);
  });
}

// Wherever Fati taps/clicks, a little bouquet appears and fades after two seconds.
const tapFlowers = ["💗", "💕", "💖", "🌸", "🌷", "🌺", "💞", "♡", "✿"];
function makeTapBouquet(x, y, amount = 8) {
  for (let i = 0; i < amount; i++) {
    const item = document.createElement("span");
    item.className = "tap-burst";
    item.textContent = tapFlowers[Math.floor(Math.random() * tapFlowers.length)];
    item.style.setProperty("--tap-x", `${x}px`);
    item.style.setProperty("--tap-y", `${y}px`);
    item.style.setProperty("--tap-size", `${16 + Math.random() * 15}px`);
    item.style.setProperty("--tap-dx", `${Math.round(Math.random() * 150 - 75)}px`);
    item.style.setProperty("--tap-dy", `${Math.round(Math.random() * 125 - 75)}px`);
    item.style.setProperty("--tap-rot", `${Math.round(Math.random() * 90 - 45)}deg`);
    item.style.animationDelay = `${Math.random() * 0.12}s`;
    document.body.appendChild(item);
    window.setTimeout(() => item.remove(), 2200);
  }
}
document.addEventListener("click", (event) => {
  // Ignore clicks outside the visible viewport (if a browser synthesizes one).
  makeTapBouquet(event.clientX, event.clientY, 7);
});
