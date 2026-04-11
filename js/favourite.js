document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".books-grid");

  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

  function render() {
    container.innerHTML = "";

    if (favourites.length === 0) {
      container.innerHTML = `
        <div class="empty-fav">
          <h3>No favourite books 😢</h3>
          <p>Start adding books.</p>
        </div>
      `;
      return;
    }

    favourites.forEach((book, index) => {
      container.innerHTML += `
        <div class="book-card">
          <img src="${book.image}" />
          <h3>${book.title}</h3>
          <p>${book.author}</p>
          <button data-index="${index}">Remove</button>
        </div>
      `;
    });
  }

  // remove button
  container.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") {
      const index = e.target.getAttribute("data-index");

      favourites.splice(index, 1);
      localStorage.setItem("favourites", JSON.stringify(favourites));

      render();
    }
  });

  render();
});
