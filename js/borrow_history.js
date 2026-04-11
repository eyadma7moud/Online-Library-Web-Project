// js/borrow_history.js

document.addEventListener("DOMContentLoaded", function () {
  if (!isLoggedIn()) {
    window.location.href = "login.html";
    return;
  }

  const currentUser = getCurrentUser();
  const users       = JSON.parse(localStorage.getItem("users")) || [];
  const fullUser    = users.find(u => u.id === currentUser.id);
  const books       = JSON.parse(localStorage.getItem("books")) || [];

  const tbody = document.querySelector("#history-table tbody");
  const empty = document.getElementById("empty-history");

  if (!tbody) return;

  const history = (fullUser?.borrowedBooks || []).filter(b => b.returned);

  if (history.length === 0) {
    tbody.innerHTML = "";
    if (empty) empty.style.display = "block";
    return;
  }

  if (empty) empty.style.display = "none";

  history.forEach(entry => {
    const book = books.find(b => b.id === entry.bookId);
    const title  = book ? book.title  : "Unknown Book";
    const author = book ? book.author : "Unknown Author";
    const id     = book ? book.id     : entry.bookId;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${id}</td>
      <td>${title}</td>
      <td>${author}</td>
      <td>${entry.borrowDate}</td>
      <td>${entry.actualReturn || entry.returnDate}</td>
    `;
    tbody.appendChild(tr);
  });
});
