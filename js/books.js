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

function updateStats() {
  document.getElementById("total-books").textContent = books.length;
  document.getElementById("borrowed").textContent = books.filter(b => b.status === "borrowed").length;
}

function displayBooks() {
  const tbody = document.querySelector(".books-table tbody");
  tbody.innerHTML = "";
  books.forEach(book => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td class="${book.status === "available" ? "status-available" : "status-borrowed"}">
        ${book.status.charAt(0).toUpperCase() + book.status.slice(1)}
      </td>
      <td>
        <button class="action-btn edit-btn" data-id="${book.id}">Edit</button>
        <button class="action-btn delete-btn" data-id="${book.id}">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  //! Delete book
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", function() {
      const id = parseInt(this.dataset.id);
      if (confirm("Are you sure you want to delete this book?")) {
        books = books.filter(book => book.id !== id);
        localStorage.setItem("books", JSON.stringify(books));
        displayBooks();
        updateStats();
      }
    });
  });
}

//! Render data
document.addEventListener("DOMContentLoaded", () => {
  displayBooks();
  updateStats();
});