document
  .getElementById("add-book-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    let books = JSON.parse(localStorage.getItem("books")) || [];

    const newId = books.length > 0 ? books[books.length - 1].id + 1 : 1;

    const newBook = {
      id: newId,
      title: document.getElementById("title").value,
      author: document.getElementById("author").value,
      category: document.getElementById("category").value,
      year: document.getElementById("year").value,
      pages: document.getElementById("pages").value,
      description: document.getElementById("description").value,
      status: document.getElementById("status").value.toLowerCase(),
      borrowedBy: null,
    };

    books.push(newBook);

    localStorage.setItem("books", JSON.stringify(books));

    alert("Book added successfully!");
    this.reset();

    window.location.href = "/admin-dashboard/";
  });
