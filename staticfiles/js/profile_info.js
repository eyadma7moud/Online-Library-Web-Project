// js/profile_info.js

document.addEventListener("DOMContentLoaded", function () {
  if (!isLoggedIn()) {
    window.location.href = "/login/";
    return;
  }

  const user = getCurrentUser();

  const nameEl = document.getElementById("info-name");
  const emailEl = document.getElementById("info-email");
  const joinEl = document.getElementById("info-join");

  if (nameEl) nameEl.textContent = user.name || "—";
  if (emailEl) emailEl.textContent = user.email || "—";
  if (joinEl) joinEl.textContent = user.joinDate || "—";
});
