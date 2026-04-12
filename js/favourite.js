// js/favourite.js

document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".books-grid");
  if (!container) return;

  render();

  function getFavouriteIds() {
    const currentUser = typeof getCurrentUser === "function" ? getCurrentUser() : null;
    if (!currentUser) return [];
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const fullUser = users.find(u => u.id === currentUser.id);
    return fullUser ? (fullUser.favourites || []) : [];
  }

  function saveFavouriteIds(ids) {
    const currentUser = typeof getCurrentUser === "function" ? getCurrentUser() : null;
    if (!currentUser) return;
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const idx = users.findIndex(u => u.id === currentUser.id);
    if (idx === -1) return;
    users[idx].favourites = ids;
    localStorage.setItem("users", JSON.stringify(users));
    const { password: _, ...safeUser } = users[idx];
    localStorage.setItem("currentUser", JSON.stringify(safeUser));
  }

  function render() {
    container.innerHTML = "";
    const currentUser = typeof getCurrentUser === "function" ? getCurrentUser() : null;

    if (!currentUser) {
      container.innerHTML = `
        <div class="empty-fav" style="grid-column:1/-1;">
          <h3>Please login to see your favourites 🔑</h3>
          <p><a href="login.html" style="color:var(--accent-blue);">Login here</a></p>
        </div>`;
      return;
    }

    const favIds = getFavouriteIds();
    const books = JSON.parse(localStorage.getItem("books")) || [];
    const favBooks = books.filter(b => favIds.includes(b.id));

    if (favBooks.length === 0) {
      container.innerHTML = `
        <div class="empty-fav" style="grid-column:1/-1;">
          <h3>No favourite books yet 😢</h3>
          <p>Browse books and click ❤️ to add them here.</p>
          <a href="books.html" class="btn" style="width:auto; display:inline-block; margin-top:16px;">Browse Books</a>
        </div>`;
      return;
    }

    favBooks.forEach(book => {
      const isAvailable = book.status === "available";
      const div = document.createElement("div");
      div.className = "book-card";
      div.innerHTML = `
        <div style="font-size:3rem; text-align:center; padding:20px 0;">📖</div>
        <h3>${book.title}</h3>
        <p style="color:var(--text-muted); font-size:13px;">${book.author}</p>
        <p style="font-size:12px; margin-bottom:8px;">${book.category}</p>
        <p class="${isAvailable ? 'status-available' : 'status-borrowed'}" style="font-size:12px; margin-bottom:12px;">
          ${isAvailable ? '✓ Available' : '✗ Borrowed'}
        </p>
        <a href="book-details.html?id=${book.id}" class="btn" style="margin-bottom:8px; display:block; text-align:center; padding:8px;">View Details</a>
        <button class="remove-fav-btn" data-id="${book.id}">❌ Remove from Favourites</button>
      `;
      container.appendChild(div);
    });

    container.querySelectorAll(".remove-fav-btn").forEach(btn => {
      btn.addEventListener("click", function () {
        const id = parseInt(this.dataset.id);
        let favIds = getFavouriteIds();
        favIds = favIds.filter(fid => fid !== id);
        saveFavouriteIds(favIds);
        showToast("Removed from favourites");
        render();
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
