// js/borrow_success.js

document.addEventListener("DOMContentLoaded", function () {
  const data = sessionStorage.getItem("borrowSuccess");

  const titleEl      = document.getElementById("success-title");
  const authorEl     = document.getElementById("success-author");
  const borrowDateEl = document.getElementById("success-borrow-date");
  const returnDateEl = document.getElementById("success-return-date");

  if (data) {
    const info = JSON.parse(data);
    if (titleEl)      titleEl.textContent      = info.title;
    if (authorEl)     authorEl.textContent      = info.author;
    if (borrowDateEl) borrowDateEl.textContent  = info.borrowDate;
    if (returnDateEl) returnDateEl.textContent  = info.returnDate;
    sessionStorage.removeItem("borrowSuccess");
  }
});
