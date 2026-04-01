document.addEventListener("DOMContentLoaded", () => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const el = document.getElementById("total-users");
  if (el) el.textContent = users.length;
});
