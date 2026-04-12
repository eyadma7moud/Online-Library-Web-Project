// js/books-page.js
// Renders the book grid on books.html from localStorage

document.addEventListener("DOMContentLoaded", function () {
  const grid         = document.getElementById("books-grid");
  const searchInput  = document.getElementById("search-input");
  const catFilter    = document.getElementById("cat-filter");
  const statusFilter = document.getElementById("status-filter");
  const searchBtn    = document.getElementById("search-btn");

  if (!grid) return;

  // Pre-fill search from URL (for home-page search form)
  const urlParams = new URLSearchParams(window.location.search);
  const urlSearch = urlParams.get("search");
  if (urlSearch && searchInput) searchInput.value = urlSearch;

  let books = JSON.parse(localStorage.getItem("books")) || [];

  renderGrid(getFiltered());

  // ── Search & Filter ─────────────────────────────────────────
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
    books = JSON.parse(localStorage.getItem("books")) || [];
    renderGrid(getFiltered());
  }

  if (searchBtn)    searchBtn.addEventListener("click", runSearch);
  if (searchInput)  searchInput.addEventListener("input", runSearch);
  if (catFilter)    catFilter.addEventListener("change", runSearch);
  if (statusFilter) statusFilter.addEventListener("change", runSearch);

  // ── Helpers ──────────────────────────────────────────────────
  function getCurrentUserFavs() {
    const currentUser = typeof getCurrentUser === "function" ? getCurrentUser() : null;
    if (!currentUser) return { favIds: [], currentUser: null };
    const users    = JSON.parse(localStorage.getItem("users")) || [];
    const fullUser = users.find(u => u.id === currentUser.id);
    return { favIds: fullUser ? (fullUser.favourites || []) : [], currentUser };
  }

  function toggleFav(bookId, btn) {
    const currentUser = typeof getCurrentUser === "function" ? getCurrentUser() : null;
    if (!currentUser) {
      alert("Please login to add favourites.");
      window.location.href = "login.html";
      return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const uIdx  = users.findIndex(u => u.id === currentUser.id);
    if (uIdx === -1) return;
    let favs   = users[uIdx].favourites || [];
    const isFav = favs.includes(bookId);
    if (isFav) {
      favs = favs.filter(id => id !== bookId);
      btn.textContent = "🤍";
      btn.title = "Add to Favourites";
    } else {
      favs.push(bookId);
      btn.textContent = "❤️";
      btn.title = "Remove from Favourites";
    }
    users[uIdx].favourites = favs;
    localStorage.setItem("users", JSON.stringify(users));
    const { password: _, ...safeUser } = users[uIdx];
    localStorage.setItem("currentUser", JSON.stringify(safeUser));
    showToast(isFav ? "Removed from favourites" : "Added to favourites ❤️");
  }

  // ── Render ───────────────────────────────────────────────────
  function renderGrid(list) {
    grid.innerHTML = "";
    const { favIds } = getCurrentUserFavs();

    if (list.length === 0) {
      grid.innerHTML = `
        <div style="grid-column:1/-1; text-align:center; padding:60px; color:var(--text-muted);">
          😕 No books found.
        </div>`;
      return;
    }

    list.forEach((book, i) => {
      const isAvailable = book.status === "available";
      const isFav       = favIds.includes(book.id);
      const div = document.createElement("div");
      div.className = "book-item";
      div.style.animationDelay = (i * 0.05) + "s";
      div.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
          <h3 style="margin:0; flex:1;">${book.title}</h3>
          <button class="fav-toggle-btn" data-id="${book.id}" title="${isFav ? 'Remove from Favourites' : 'Add to Favourites'}"
            style="background:none; border:none; font-size:1.3rem; cursor:pointer; padding:0; line-height:1;">
            ${isFav ? "❤️" : "🤍"}
          </button>
        </div>
        <p>by ${book.author}</p>
        <p class="category">${book.category}</p>
        <p class="${isAvailable ? "status-available" : "status-borrowed"}">
          ${isAvailable ? "✓ Available" : "✗ Borrowed"}
        </p>
        <a href="book-details.html?id=${book.id}" class="btn">View Details</a>
      `;
      grid.appendChild(div);
    });

    grid.querySelectorAll(".fav-toggle-btn").forEach(btn => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        toggleFav(parseInt(this.dataset.id), this);
      });
    });
  }

  function showToast(msg) {
    const toast = document.createElement("div");
    toast.className = "toast-success";
    toast.textContent = msg;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("toast-show"));
    setTimeout(() => {
      toast.classList.remove("toast-show");
      setTimeout(() => toast.remove(), 400);
    }, 2500);
  }
});
