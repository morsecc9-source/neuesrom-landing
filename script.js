(() => {
  const root = document.documentElement; // <html>
  const toggleBtn = document.getElementById("themeToggle");

  if (!toggleBtn) {
    console.warn("themeToggle button not found");
    return;
  }

  const applyTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    toggleBtn.textContent = theme === "dark" ? "◐" : "☀";
    toggleBtn.setAttribute("aria-pressed", String(theme === "light"));
    toggleBtn.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
  };

  // Load saved theme, default to dark
  const saved = localStorage.getItem("theme");
  applyTheme(saved === "light" ? "light" : "dark");

  toggleBtn.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem("theme", next);
    applyTheme(next);
  });
})();