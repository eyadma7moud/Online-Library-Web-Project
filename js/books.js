
let books = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Technology",
    year: 2008,
    pages: 464,
    description: "Guide to writing clean code",
    status: "available",
    borrowedBy: null,
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Development",
    year: 2018,
    pages: 320,
    description: "Build good habits",
    status: "borrowed",
    borrowedBy: 1,
  },
];
 
if (!localStorage.getItem("books")) {
  localStorage.setItem("books", JSON.stringify(books));
}
 
books = JSON.parse(localStorage.getItem("books"));
 
// ── Stats 
function updateStats() {
  document.getElementById("total-books").textContent = books.length;
  document.getElementById("borrowed").textContent = books.filter(b => b.status === "borrowed").length;
}
 
// ── Render Table 
function displayBooks(filteredBooks) {
  const list = filteredBooks !== undefined ? filteredBooks : books;
  const tbody = document.querySelector(".books-table tbody");
  tbody.innerHTML = "";
 
  if (list.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align:center; padding: 32px; color: var(--text-muted);">
          😕 No books found matching your search.
        </td>
      </tr>`;
    return;
  }
 
  list.forEach(book => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td class="${book.status === "available" ? "status-available" : "status-borrowed"}">
        ${book.status.charAt(0).toUpperCase() + book.status.slice(1)}
      </td>
      <td>
        <button class="action-btn edit-btn"   data-id="${book.id}">✏️ Edit</button>
        <button class="action-btn delete-btn" data-id="${book.id}">🗑️ Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
 
  document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      window.location.href = `edit-book.html?id=${this.dataset.id}`;
    });
  });
 
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const id = parseInt(this.dataset.id);
      if (confirm("Are you sure you want to delete this book?")) {
        books = books.filter(b => b.id !== id);
        localStorage.setItem("books", JSON.stringify(books));
        const q = document.getElementById("dashboard-search-input").value.trim();
        q ? runSearch(q) : displayBooks();
        updateStats();
      }
    });
  });
}
 
// ── Search 
function runSearch(query) {
  const q = query.toLowerCase().trim();
  if (!q) {
    displayBooks();
    return;
  }
  const results = books.filter(b =>
    b.title.toLowerCase().includes(q) ||
    b.author.toLowerCase().includes(q) ||
    b.category.toLowerCase().includes(q)
  );
  displayBooks(results);
}
 
function initSearch() {
  const input = document.getElementById("dashboard-search-input");
  const btn   = document.getElementById("dashboard-search-btn");
 
  if (!input || !btn) return;
 
  btn.addEventListener("click", () => runSearch(input.value));
 
  input.addEventListener("input", () => runSearch(input.value));
 
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") runSearch(input.value);
  });
 
  input.addEventListener("input", () => {
    if (input.value === "") displayBooks();
  });
}
 
// ── Success Toast 
function checkEditSuccess() {
  const title = sessionStorage.getItem("editSuccess");
  if (title) {
    showToast(`✅ "${title}" updated successfully!`);
    sessionStorage.removeItem("editSuccess");
  }
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
  }, 3000);
}
 
// ── Init 
document.addEventListener("DOMContentLoaded", () => {
  displayBooks();
  updateStats();
  initSearch();
  checkEditSuccess();
});