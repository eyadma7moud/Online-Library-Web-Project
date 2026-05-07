// js/borrow_history.js

document.addEventListener("DOMContentLoaded", function () {
  if (!isLoggedIn()) {
    window.location.href = "/login/";
    return;
  }

  const currentUser = getCurrentUser();
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const fullUser = users.find(u => u.id === currentUser.id);
  const books = JSON.parse(localStorage.getItem("books")) || [];

  const tbody = document.querySelector("#history-table tbody");
  const empty = document.getElementById("empty-history");

  if (!tbody) return;

  // ── Show ALL borrow records (active + returned) ──────────────
  const history = fullUser?.borrowedBooks || [];

  if (history.length === 0) {
    tbody.innerHTML = "";
    if (empty) empty.style.display = "block";
    return;
  }

  if (empty) empty.style.display = "none";

  // newest first
  const sorted = [...history].reverse();

  sorted.forEach(entry => {
    const book = books.find(b => b.id === entry.bookId);
    const title = book ? book.title : "Unknown Book";
    const author = book ? book.author : "Unknown Author";
    const id = book ? book.id : entry.bookId;

    const statusText = entry.returned
      ? "✅ Returned"
      : "📖 Active";
    const statusColor = entry.returned
      ? "var(--accent-green, #16a34a)"
      : "var(--accent-blue)";

    const returnDisplay = entry.returned
      ? (entry.actualReturn || entry.returnDate)
      : `Due: ${entry.returnDate}`;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${id}</td>
      <td>${title}</td>
      <td>${author}</td>
      <td>${entry.borrowDate}</td>
      <td>${returnDisplay}</td>
      <td style="color:${statusColor}; font-weight:600;">${statusText}</td>
    `;
    tbody.appendChild(tr);
  });
});
