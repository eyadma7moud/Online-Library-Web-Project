// js/books-page.js
// Renders the book grid on books.html from localStorage

document.addEventListener("DOMContentLoaded", function () {
  const grid        = document.getElementById("books-grid");
  const searchInput = document.getElementById("search-input");
  const catFilter   = document.getElementById("cat-filter");
  const statusFilter = document.getElementById("status-filter");
  const searchBtn   = document.getElementById("search-btn");

  if (!grid) return;

  let books = JSON.parse(localStorage.getItem("books")) || [];

  renderGrid(books);

  // ── Search & Filter ────────────────────────────────────────────
  function getFiltered() {
    const q      = (searchInput?.value || "").toLowerCase().trim();
    const cat    = (catFilter?.value   || "").toLowerCase();
    const status = (statusFilter?.value || "").toLowerCase();

    return books.filter(book => {
      const matchQ = !q ||
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.category.toLowerCase().includes(q);

      const matchCat    = !cat    || book.category.toLowerCase() === cat;
      const matchStatus = !status || book.status.toLowerCase()   === status;

      return matchQ && matchCat && matchStatus;
    });
  }

  function runSearch() {
    renderGrid(getFiltered());
  }

  if (searchBtn)    searchBtn.addEventListener("click", runSearch);
  if (searchInput)  searchInput.addEventListener("input", runSearch);
  if (catFilter)    catFilter.addEventListener("change", runSearch);
  if (statusFilter) statusFilter.addEventListener("change", runSearch);

  // ── Render ─────────────────────────────────────────────────────
  function renderGrid(list) {
    grid.innerHTML = "";

    if (list.length === 0) {
      grid.innerHTML = `
        <div style="grid-column:1/-1; text-align:center; padding:60px; color:var(--text-muted);">
          😕 No books found.
        </div>`;
      return;
    }

    list.forEach((book, i) => {
      const isAvailable = book.status === "available";
      const div = document.createElement("div");
      div.className = "book-item";
      div.style.animationDelay = (i * 0.05) + "s";
      div.innerHTML = `
        <h3>${book.title}</h3>
        <p>by ${book.author}</p>
        <p class="category">${book.category}</p>
        <p class="${isAvailable ? "status-available" : "status-borrowed"}">
          ${isAvailable ? "✓ Available" : "✗ Borrowed"}
        </p>
        <a href="book-details.html?id=${book.id}" class="btn">View Details</a>
      `;
      grid.appendChild(div);
    });
  }
});
