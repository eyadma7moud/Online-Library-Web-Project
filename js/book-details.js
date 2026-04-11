// js/book-details.js

document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const bookId = parseInt(params.get("id"));

  if (!bookId) {
    // fallback: show first book if no id (for demo)
    loadBook(1);
  } else {
    loadBook(bookId);
  }

  function loadBook(id) {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    const book = books.find(b => b.id === id);

    if (!book) {
      document.querySelector("main") && (document.querySelector("main").innerHTML =
        `<div class="content" style="text-align:center; padding:60px;">
          <h2>Book not found.</h2>
          <a href="books.html" class="btn" style="width:auto; display:inline-block; margin-top:16px;">← Back to Books</a>
        </div>`);
      return;
    }

    // Fill in book info
    const titleEl       = document.getElementById("book-title");
    const authorEl      = document.getElementById("book-author");
    const categoryEl    = document.getElementById("book-category");
    const yearEl        = document.getElementById("book-year");
    const pagesEl       = document.getElementById("book-pages");
    const descEl        = document.getElementById("book-description");
    const authorBioEl   = document.getElementById("book-author-bio");
    const statusEl      = document.getElementById("book-status");
    const borrowBtn     = document.getElementById("borrow-btn");
    const returnBtn     = document.getElementById("return-btn");

    if (titleEl)    titleEl.textContent    = book.title;
    if (authorEl)   authorEl.textContent   = "by " + book.author;
    if (categoryEl) categoryEl.textContent = "Category: " + book.category;
    if (yearEl)     yearEl.textContent     = "Published: " + (book.year || "N/A");
    if (pagesEl)    pagesEl.textContent    = "Pages: " + (book.pages || "N/A");
    if (descEl)     descEl.textContent     = book.description || "";
    if (authorBioEl) authorBioEl.textContent = "Author of \"" + book.title + "\" — " + book.author + ".";

    // Update page title
    document.title = book.title + " — Libraria";

    // Status badge
    const isAvailable = book.status === "available";
    if (statusEl) {
      statusEl.className    = isAvailable ? "status-available" : "status-borrowed";
      statusEl.textContent  = isAvailable ? "✓ Available" : "✗ Borrowed";
    }

    // Determine if current user has borrowed this book
    const currentUser   = typeof getCurrentUser === "function" ? getCurrentUser() : null;
    const users         = JSON.parse(localStorage.getItem("users")) || [];
    const fullUser      = currentUser ? users.find(u => u.id === currentUser.id) : null;
    const userBorrowed  = fullUser
      ? (fullUser.borrowedBooks || []).some(b => b.bookId === id && !b.returned)
      : false;

    // ── Borrow Button ──────────────────────────────────────────────
    if (borrowBtn) {
      if (!isAvailable || userBorrowed) {
        // Hide borrow if not available or user already has it
        borrowBtn.style.display = "none";
      } else {
        borrowBtn.style.display = "";
        borrowBtn.href = "borrow.html?id=" + book.id;
      }
    }

    // ── Return Button ──────────────────────────────────────────────
    if (returnBtn) {
      if (userBorrowed) {
        returnBtn.style.display = "";
        returnBtn.href = "return.html?id=" + book.id;
      } else {
        returnBtn.style.display = "none";
      }
    }
  }
});
