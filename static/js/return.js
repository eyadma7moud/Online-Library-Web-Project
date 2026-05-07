// js/return.js

document.addEventListener("DOMContentLoaded", function () {
  if (!isLoggedIn()) {
    alert("Please login first.");
    window.location.href = "/login/";
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const bookId = parseInt(params.get("id"));

  if (!bookId) {
    alert("No book selected.");
    window.location.href = "borrowed-books.html";
    return;
  }

  const currentUser = getCurrentUser();
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userIndex = users.findIndex(u => u.id === currentUser.id);

  if (userIndex === -1) {
    alert("User not found.");
    window.location.href = "index.html";
    return;
  }

  const user = users[userIndex];
  const borrowEntry = (user.borrowedBooks || []).find(
    b => b.bookId === bookId && !b.returned
  );

  if (!borrowEntry) {
    alert("You have not borrowed this book or it has already been returned.");
    window.location.href = "borrowed-books.html";
    return;
  }

  const books = JSON.parse(localStorage.getItem("books")) || [];
  const book = books.find(b => b.id === bookId);

  if (!book) {
    alert("Book not found.");
    window.location.href = "borrowed-books.html";
    return;
  }

  // Display book info
  const titleEl = document.getElementById("return-book-title");
  const authorEl = document.getElementById("return-book-author");
  const bookIdEl = document.getElementById("return-book-id");
  const borrowDateEl = document.getElementById("borrow-date");
  const returnDateEl = document.getElementById("return-date");

  if (titleEl) titleEl.textContent = book.title;
  if (authorEl) authorEl.textContent = book.author;
  if (bookIdEl) bookIdEl.value = book.id;
  if (borrowDateEl) borrowDateEl.value = borrowEntry.borrowDate;
  if (returnDateEl) {
    const today = new Date().toISOString().split("T")[0];
    returnDateEl.value = today;
    returnDateEl.min = borrowEntry.borrowDate;
    returnDateEl.max = today;
  }

  // Form submit
  const form = document.getElementById("return-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const condition = document.getElementById("book-condition");
      const returnDate = returnDateEl
        ? returnDateEl.value
        : new Date().toISOString().split("T")[0];

      // ── Update book status → available ────────────────────────
      const allBooks = JSON.parse(localStorage.getItem("books")) || [];
      const bookIndex = allBooks.findIndex(b => b.id === bookId);
      if (bookIndex !== -1) {
        allBooks[bookIndex].status = "available";
        allBooks[bookIndex].borrowedBy = null;
        localStorage.setItem("books", JSON.stringify(allBooks));
      }

      // ── Update user's borrowedBooks entry → returned ──────────
      const allUsers = JSON.parse(localStorage.getItem("users")) || [];
      const uIdx = allUsers.findIndex(u => u.id === currentUser.id);
      if (uIdx !== -1) {
        const entryIdx = allUsers[uIdx].borrowedBooks.findIndex(
          b => b.bookId === bookId && !b.returned
        );
        if (entryIdx !== -1) {
          allUsers[uIdx].borrowedBooks[entryIdx].returned = true;
          allUsers[uIdx].borrowedBooks[entryIdx].actualReturn = returnDate;
          allUsers[uIdx].borrowedBooks[entryIdx].condition =
            condition ? condition.value : "Good";
        }
        localStorage.setItem("users", JSON.stringify(allUsers));
        const { password: _, ...safeUser } = allUsers[uIdx];
        localStorage.setItem("currentUser", JSON.stringify(safeUser));
      }

      // ── Store success info ────────────────────────────────────
      sessionStorage.setItem("returnSuccess", JSON.stringify({
        title: book.title,
        author: book.author,
        returnDate: returnDate
      }));

      window.location.href = "return_success.html";
    });
  }
});
