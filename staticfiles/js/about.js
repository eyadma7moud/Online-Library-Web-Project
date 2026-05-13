
document.addEventListener("DOMContentLoaded", function () {
  const content = document.querySelector(".content");

  if (!content) return;

  // Simple fade-in effect
  content.style.opacity = "0";
  content.style.transition = "opacity 1s ease";

  setTimeout(() => {
    content.style.opacity = "1";
  }, 200);

  // Console message (optional)
  console.log("Welcome to Libraria 📚");
});
