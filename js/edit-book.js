document.addEventListener("DOMContentLoaded", function () {

  const params = new URLSearchParams(window.location.search);
  const bookId = parseInt(params.get("id"));

  if (!bookId) {
    alert("No book ID found.");
    window.location.href = "admin-dashboard.html";
    return;
  }

  const books = JSON.parse(localStorage.getItem("books")) || [];
  const book = books.find(b => b.id === bookId);

  if (!book) {
    alert("Book not found.");
    window.location.href = "admin-dashboard.html";
    return;
  }

  document.getElementById("edit-title").value       = book.title       || "";
  document.getElementById("edit-author").value      = book.author      || "";
  document.getElementById("edit-year").value        = book.year        || "";
  document.getElementById("edit-pages").value       = book.pages       || "";
  document.getElementById("edit-description").value = book.description || "";

  // Category select
  const catSelect = document.getElementById("edit-category");
  Array.from(catSelect.options).forEach(opt => {
    if (opt.value === book.category) opt.selected = true;
  });

  // Status select
  const statusSelect = document.getElementById("edit-status");
  Array.from(statusSelect.options).forEach(opt => {
    if (opt.value === book.status) opt.selected = true;
  });

  document.getElementById("edit-book-form").addEventListener("submit", function (e) {
    e.preventDefault();

    //  update 
    book.title       = document.getElementById("edit-title").value.trim();
    book.author      = document.getElementById("edit-author").value.trim();
    book.category    = document.getElementById("edit-category").value;
    book.status      = document.getElementById("edit-status").value;
    book.year        = parseInt(document.getElementById("edit-year").value) || book.year;
    book.pages       = parseInt(document.getElementById("edit-pages").value) || book.pages;
    book.description = document.getElementById("edit-description").value.trim();

    const updatedBooks = books.map(b => b.id === bookId ? book : b);
    localStorage.setItem("books", JSON.stringify(updatedBooks));

    sessionStorage.setItem("editSuccess", book.title);
    window.location.href = "admin-dashboard.html";
  });

});
