// js/borrow.js

document.addEventListener("DOMContentLoaded", function () {
  // Must be logged in and not admin
  if (!isLoggedIn()) {
    alert("Please login to borrow books.");
    window.location.href = "login.html";
    return;
  }
  if (isAdmin()) {
    alert("Admins cannot borrow books.");
    window.location.href = "admin-dashboard.html";
    return;
  }

  const params  = new URLSearchParams(window.location.search);
  const bookId  = parseInt(params.get("id"));

  if (!bookId) {
    alert("No book selected.");
    window.location.href = "books.html";
    return;
  }

  const books = JSON.parse(localStorage.getItem("books")) || [];
  const book  = books.find(b => b.id === bookId);

  if (!book) {
    alert("Book not found.");
    window.location.href = "books.html";
    return;
  }

  // Show book info
  const titleEl  = document.getElementById("borrow-book-title");
  const authorEl = document.getElementById("borrow-book-author");
  const bookIdEl = document.getElementById("borrow-book-id");

  if (titleEl)  titleEl.textContent  = book.title;
  if (authorEl) authorEl.textContent = book.author;
  if (bookIdEl) bookIdEl.value       = book.id;

  // If book is already borrowed, disable form
  if (book.status === "borrowed") {
    const form = document.getElementById("borrow-form");
    if (form) {
      form.innerHTML = `
        <div style="text-align:center; padding: 24px;">
          <p style="color: var(--accent-red); font-weight:600; font-size:1.1rem;">
            ❌ This book is currently not available.
          </p>
          <a href="books.html" class="btn" style="width:auto; display:inline-block; margin-top:16px;">
            Back to Books
          </a>
        </div>`;
    }
    return;
  }

  // Set default dates
  const today = new Date().toISOString().split("T")[0];
  const defaultReturn = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    .toISOString().split("T")[0];

  const borrowDateEl  = document.getElementById("borrow-date");
  const returnDateEl  = document.getElementById("return-date");

  if (borrowDateEl) { borrowDateEl.value = today; borrowDateEl.min = today; }
  if (returnDateEl) { returnDateEl.value = defaultReturn; returnDateEl.min = today; }

  // Form submit
  const form = document.getElementById("borrow-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const confirmed = document.getElementById("confirm-borrow");
      if (confirmed && !confirmed.checked) {
        alert("Please confirm that you want to borrow this book.");
        return;
      }

      const borrowDate  = borrowDateEl ? borrowDateEl.value : today;
      const returnDate  = returnDateEl ? returnDateEl.value : defaultReturn;

      if (returnDate <= borrowDate) {
        alert("Return date must be after borrow date.");
        return;
      }

      // Get fresh data
      const allBooks = JSON.parse(localStorage.getItem("books")) || [];
      const bookIndex = allBooks.findIndex(b => b.id === bookId);

      if (bookIndex === -1 || allBooks[bookIndex].status === "borrowed") {
        alert("Sorry, this book is no longer available.");
        window.location.href = "books.html";
        return;
      }

      const currentUser = getCurrentUser();
      const users       = JSON.parse(localStorage.getItem("users")) || [];
      const userIndex   = users.findIndex(u => u.id === currentUser.id);

      // Mark book as borrowed
      allBooks[bookIndex].status     = "borrowed";
      allBooks[bookIndex].borrowedBy = currentUser.id;
      localStorage.setItem("books", JSON.stringify(allBooks));

      // Add to user's borrowedBooks
      if (userIndex !== -1) {
        if (!users[userIndex].borrowedBooks) users[userIndex].borrowedBooks = [];
        users[userIndex].borrowedBooks.push({
          bookId:     bookId,
          borrowDate: borrowDate,
          returnDate: returnDate,
          returned:   false
        });
        localStorage.setItem("users", JSON.stringify(users));

        // Update currentUser in session
        const { password: _, ...safeUser } = users[userIndex];
        localStorage.setItem("currentUser", JSON.stringify(safeUser));
      }

      // Store success info for next page
      sessionStorage.setItem("borrowSuccess", JSON.stringify({
        title:      book.title,
        author:     book.author,
        borrowDate: borrowDate,
        returnDate: returnDate
      }));

      window.location.href = "borrow_success.html";
    });
  }
});
