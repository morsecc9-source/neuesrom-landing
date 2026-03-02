const toggle = document.getElementById("themeToggle");

toggle.addEventListener("click", () => {
  const html = document.documentElement;
  html.dataset.theme =
    html.dataset.theme === "dark" ? "light" : "dark";
});