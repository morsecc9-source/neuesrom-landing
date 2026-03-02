const toggle = document.getElementById("themeToggle");

toggle.addEventListener("click", () => {
  const html = document.documentElement;
  html.dataset.theme =
    html.dataset.theme === "dark" ? "light" : "dark";
});

const betaBtn = document.getElementById("betaAccessBtn");
const modal = document.getElementById("betaModal");
const closeBtn = document.getElementById("betaCloseBtn");

function openModal() {
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.setAttribute("aria-hidden", "true");
}

betaBtn?.addEventListener("click", openModal);
closeBtn?.addEventListener("click", closeModal);

modal?.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});