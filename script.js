const toggle = document.getElementById("themeToggle");

toggle.addEventListener("click", () => {
  const html = document.documentElement;
  html.dataset.theme =
    html.dataset.theme === "dark" ? "light" : "dark";
});

const betaBtn = document.getElementById("betaAccessBtn");
const modal = document.getElementById("betaModal");
const closeBtn = document.getElementById("betaCloseBtn");

betaBtn.addEventListener("click", () => {
  modal.setAttribute("aria-hidden", "false");
});

closeBtn.addEventListener("click", () => {
  modal.setAttribute("aria-hidden", "true");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.setAttribute("aria-hidden", "true");
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});