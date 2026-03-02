(() => {
  // ---------- helpers ----------
  const root = document.documentElement;

  function trackEvent(name, data) {
    // Vercel Web Analytics "Events" (requires va script in <head>)
    if (window.va) {
      try {
        window.va("track", name, data || {});
      } catch (_) {}
    }
  }

  function trackGA(eventName, params) {
  if (typeof gtag === "function") {
    gtag("event", eventName, params || {});
  }
}
  // ---------- Theme toggle ----------
  const toggleBtn = document.getElementById("themeToggle");

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

  const savedTheme = localStorage.getItem("theme");
  applyTheme(savedTheme === "light" ? "light" : "dark");

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      localStorage.setItem("theme", next);
      applyTheme(next);
      trackEvent("Theme Toggled", { theme: next });
      trackGA("theme_toggled", { theme: next });
    });
  }

  // ---------- Seat counter (manual for now) ----------
  // In index.html: <span id="seatCount">43</span>
  const totalSeats = 50;
  const remainingSeats = 43; // <-- update manually as seats fill

  const seatEl = document.getElementById("seatCount");
  if (seatEl) {
    seatEl.textContent = String(remainingSeats);
    seatEl.setAttribute("title", `${remainingSeats} of ${totalSeats} remaining`);
  }

  // ---------- Beta modal ----------
  const betaAccessBtn = document.getElementById("betaAccessBtn");
  const betaModal = document.getElementById("betaModal");
  const betaCloseBtn = document.getElementById("betaCloseBtn");

  const setModalOpen = (isOpen) => {
    if (!betaModal) return;

    betaModal.setAttribute("aria-hidden", isOpen ? "false" : "true");

    // prevent background scroll when modal is open
    document.body.style.overflow = isOpen ? "hidden" : "";

    if (isOpen) {
      trackEvent("Beta Modal Opened");
      // focus close button for accessibility / mobile convenience
      if (betaCloseBtn) betaCloseBtn.focus();
    } else {
      trackEvent("Beta Modal Closed");
      if (betaAccessBtn) betaAccessBtn.focus();
    }
  };

  if (betaAccessBtn && betaModal) {
    betaAccessBtn.addEventListener("click", () => setModalOpen(true));

    // close when clicking the overlay (not the card)
    betaModal.addEventListener("click", (event) => {
      if (event.target === betaModal) setModalOpen(false);
    });

    // close on Escape
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && betaModal.getAttribute("aria-hidden") === "false") {
        setModalOpen(false);
      }
    });

    // track platform clicks
    betaModal.querySelectorAll(".modal-link").forEach((link) => {
      link.addEventListener("click", () => {
        const href = link.getAttribute("href") || "";
        const platform =
          href.includes("testflight.apple.com") ? "iOS" :
          href.includes("play.google.com") ? "Android" :
          "Unknown";

        trackEvent("Beta Platform Click", { platform, href });
      });
    });
  }

  if (betaCloseBtn) {
    betaCloseBtn.addEventListener("click", () => setModalOpen(false));
  }

  // ---------- Founding Access tracking (optional but useful) ----------
  // MailerLite submit button (inside the form) also has class="primary"
  // so we scope it under the embed container
  const foundingBtn = document.querySelector("#mlb2-37883176 .ml-form-embedSubmit button.primary");
  if (foundingBtn) {
    foundingBtn.addEventListener("click", () => {
      trackEvent("Founding Access Click");
      trackGA("founding_access_click");
    });
  }
})();