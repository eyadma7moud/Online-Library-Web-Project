// js/account_settings.js

document.addEventListener("DOMContentLoaded", function () {
  if (!isLoggedIn()) {
    window.location.href = "login.html";
    return;
  }

  const currentUser = getCurrentUser();

  // Pre-fill current values
  const currentNameEl  = document.getElementById("current-name");
  const currentEmailEl = document.getElementById("current-email");
  if (currentNameEl)  currentNameEl.value = currentUser.name;
  if (currentEmailEl) currentEmailEl.value = currentUser.email;

  // Profile picture
  const profilePic = document.getElementById("settings-pic");
  const picInput   = document.getElementById("settings-pic-input");
  const uploadBtn  = document.getElementById("settings-upload-btn");
  const savedPic   = localStorage.getItem("profilePic_" + currentUser.id);

  if (profilePic && savedPic) profilePic.src = savedPic;

  if (uploadBtn && picInput) {
    uploadBtn.addEventListener("click", () => picInput.click());
  }

  if (picInput) {
    picInput.addEventListener("change", function () {
      const file = this.files[0];
      if (!file || !file.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        return;
      }
      const reader = new FileReader();
      reader.onload = function (e) {
        const base64 = e.target.result;
        localStorage.setItem("profilePic_" + currentUser.id, base64);
        if (profilePic) profilePic.src = base64;
        showToast("✅ Profile picture updated!");
      };
      reader.readAsDataURL(file);
    });
  }

  // ── Change Name ──────────────────────────────
  const nameForm = document.getElementById("name-form");
  if (nameForm) {
    nameForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const newName = document.getElementById("new-name").value.trim();
      if (!newName) { showError("name-error", "Name cannot be empty."); return; }

      updateUserField("name", newName);
      showToast("✅ Name updated successfully!");
      if (currentNameEl) currentNameEl.value = newName;
      document.getElementById("new-name").value = "";
      hideError("name-error");
    });
  }

  // ── Change Email & Password ──────────────────
  const passForm = document.getElementById("pass-form");
  if (passForm) {
    passForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const newEmail   = document.getElementById("new-email")?.value.trim();
      const currentPass = document.getElementById("current-password")?.value;
      const newPass    = document.getElementById("new-password")?.value;
      const confirmPass = document.getElementById("confirm-new-password")?.value;

      // Verify current password
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user  = users.find(u => u.id === currentUser.id);

      if (!user || user.password !== currentPass) {
        showError("pass-error", "❌ Current password is incorrect.");
        return;
      }

      // Validate email if provided
      if (newEmail && newEmail !== currentUser.email) {
        const emailExists = users.find(
          u => u.email.toLowerCase() === newEmail.toLowerCase() && u.id !== currentUser.id
        );
        if (emailExists) {
          showError("pass-error", "❌ This email is already in use.");
          return;
        }
        updateUserField("email", newEmail);
        if (currentEmailEl) currentEmailEl.value = newEmail;
      }

      // Validate and update password if provided
      if (newPass) {
        if (newPass.length < 6) {
          showError("pass-error", "❌ Password must be at least 6 characters.");
          return;
        }
        if (newPass !== confirmPass) {
          showError("pass-error", "❌ Passwords do not match.");
          return;
        }
        updateUserField("password", newPass);
      }

      hideError("pass-error");
      showToast("✅ Account updated successfully!");
      passForm.reset();
      if (currentEmailEl) currentEmailEl.value = getCurrentUser().email;
    });
  }

  // ── Delete Account ───────────────────────────
  const deleteBtn = document.getElementById("delete-account-btn");
  if (deleteBtn) {
    deleteBtn.addEventListener("click", function () {
      if (!confirm("Are you sure you want to delete your account? This cannot be undone.")) return;

      const users    = JSON.parse(localStorage.getItem("users")) || [];
      const filtered = users.filter(u => u.id !== currentUser.id);
      localStorage.setItem("users", JSON.stringify(filtered));
      localStorage.removeItem("currentUser");
      localStorage.removeItem("profilePic_" + currentUser.id);
      window.location.href = "index.html";
    });
  }

  // ── Logout ───────────────────────────────────
  const logoutBtn = document.getElementById("logout-settings-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      handleLogout();
    });
  }

  // ── Helpers ──────────────────────────────────
  function updateUserField(field, value) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const idx   = users.findIndex(u => u.id === currentUser.id);
    if (idx === -1) return;

    users[idx][field] = value;
    localStorage.setItem("users", JSON.stringify(users));

    const { password: _, ...safeUser } = users[idx];
    localStorage.setItem("currentUser", JSON.stringify(safeUser));
  }

  function showError(id, msg) {
    const el = document.getElementById(id);
    if (el) { el.textContent = msg; el.style.display = "block"; }
  }

  function hideError(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  }

  function showToast(msg) {
    const toast = document.createElement("div");
    toast.className = "toast-success";
    toast.textContent = msg;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("toast-show"));
    setTimeout(() => {
      toast.classList.remove("toast-show");
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }
});
