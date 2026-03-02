(() => {
  const root = document.documentElement;
  const toggleBtn = document.getElementById("themeToggle");
  const betaAccessBtn = document.getElementById("betaAccessBtn");
  const betaModal = document.getElementById("betaModal");
  const betaCloseBtn = document.getElementById("betaCloseBtn");

  const applyTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    if (toggleBtn) {
      toggleBtn.textContent = theme === "dark" ? "◐" : "☀";
      toggleBtn.setAttribute("aria-pressed", String(theme === "light"));
      toggleBtn.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      );
    }
  };

  const saved = localStorage.getItem("theme");
  applyTheme(saved === "light" ? "light" : "dark");

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      localStorage.setItem("theme", next);
      applyTheme(next);
    });
  }

  const openModal = () => {
    if (!betaModal) return;
    betaModal.setAttribute("aria-hidden", "false");
  };

  const closeModal = () => {
    if (!betaModal) return;
    betaModal.setAttribute("aria-hidden", "true");
  };

  if (betaAccessBtn && betaModal) {
    betaAccessBtn.addEventListener("click", openModal);

    betaModal.addEventListener("click", (event) => {
      if (event.target === betaModal) {
        closeModal();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && betaModal.getAttribute("aria-hidden") === "false") {
        closeModal();
      }
    });
  }

  if (betaCloseBtn) {
    betaCloseBtn.addEventListener("click", closeModal);
  }
})();