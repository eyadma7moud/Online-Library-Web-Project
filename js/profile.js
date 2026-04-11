// js/profile.js

document.addEventListener("DOMContentLoaded", function () {
  if (!isLoggedIn()) {
    window.location.href = "login.html";
    return;
  }

  const user = getCurrentUser();

  // Fill profile info
  const nameEl     = document.getElementById("profile-name");
  const emailEl    = document.getElementById("profile-email");
  const usernameEl = document.getElementById("profile-username");
  const joinEl     = document.getElementById("profile-join");
  const roleEl     = document.getElementById("profile-role");

  if (nameEl)     nameEl.textContent     = user.name     || "—";
  if (emailEl)    emailEl.textContent    = user.email    || "—";
  if (usernameEl) usernameEl.textContent = user.name     || "—";
  if (joinEl)     joinEl.textContent     = user.joinDate || "—";
  if (roleEl)     roleEl.textContent     = user.role === "admin" ? "Admin" : "User";

  // Profile picture
  const profilePic   = document.getElementById("profile-pic");
  const picInput     = document.getElementById("pic-input");
  const uploadBtn    = document.getElementById("upload-pic-btn");
  const savedPic     = localStorage.getItem("profilePic_" + user.id);

  if (profilePic && savedPic) profilePic.src = savedPic;

  if (uploadBtn && picInput) {
    uploadBtn.addEventListener("click", () => picInput.click());
  }

  if (picInput) {
    picInput.addEventListener("change", function () {
      const file = this.files[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file.");
        return;
      }
      const reader = new FileReader();
      reader.onload = function (e) {
        const base64 = e.target.result;
        localStorage.setItem("profilePic_" + user.id, base64);
        if (profilePic) profilePic.src = base64;
      };
      reader.readAsDataURL(file);
    });
  }

  // Quick stats
  const users     = JSON.parse(localStorage.getItem("users")) || [];
  const fullUser  = users.find(u => u.id === user.id);
  const borrowed  = fullUser ? (fullUser.borrowedBooks || []) : [];

  const totalBorrowed   = borrowed.length;
  const currentlyActive = borrowed.filter(b => !b.returned).length;
  const returned        = borrowed.filter(b => b.returned).length;

  const totalEl   = document.getElementById("stat-total-borrowed");
  const activeEl  = document.getElementById("stat-active");
  const returnedEl = document.getElementById("stat-returned");

  if (totalEl)    totalEl.textContent    = totalBorrowed;
  if (activeEl)   activeEl.textContent   = currentlyActive;
  if (returnedEl) returnedEl.textContent = returned;
});
