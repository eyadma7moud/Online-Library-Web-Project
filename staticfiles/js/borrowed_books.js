// js/borrowed_books.js

document.addEventListener("DOMContentLoaded", function () {
  if (!isLoggedIn()) {
    window.location.href = "/login/";
    return;
  }

  const currentUser = getCurrentUser();
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const fullUser = users.find(u => u.id === currentUser.id);
  const books = JSON.parse(localStorage.getItem("books")) || [];

  const tbody = document.querySelector("#borrowed-table tbody");
  const empty = document.getElementById("empty-borrowed");

  if (!tbody) return;

  const activeBorrows = (fullUser?.borrowedBooks || []).filter(b => !b.returned);

  if (activeBorrows.length === 0) {
    tbody.innerHTML = "";
    if (empty) empty.style.display = "block";
    return;
  }

  if (empty) empty.style.display = "none";

  activeBorrows.forEach(entry => {
    const book = books.find(b => b.id === entry.bookId);
    if (!book) return;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${book.id}</td>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${entry.borrowDate}</td>
      <td>${entry.returnDate}</td>
      <td>
        <a href="/return-book/${book.id}/" class="btn edit-btn"
           style="padding:8px 16px; width:auto; display:inline-block;">
          Return
        </a>
      </td>
    `;
    tbody.appendChild(tr);
  });
});
