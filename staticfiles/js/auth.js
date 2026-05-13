// auth.js - Simplified for Django
// Removed localStorage user management as Django handles it now.

function handleLogout() {
  window.location.href = "/logout/";
}

function applyThemeToButtons() {
  const saved = localStorage.getItem("theme") || "light";
  document.body.classList.toggle("dark", saved === "dark");

  document.querySelectorAll(".theme-toggle").forEach(function (btn) {
    btn.textContent = saved === "dark" ? "☀️" : "🌙";
    
    // Remove old listeners to avoid duplicates
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);

    newBtn.addEventListener("click", function () {
      const isDark = document.body.classList.contains("dark");
      const newTheme = isDark ? "light" : "dark";
      document.body.classList.toggle("dark", newTheme === "dark");
      localStorage.setItem("theme", newTheme);
      document.querySelectorAll(".theme-toggle").forEach(b => {
        b.textContent = newTheme === "dark" ? "☀️" : "🌙";
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  applyThemeToButtons();
  // We don't call updateNavbar() because Django handles the navbar in base.html
});