// profile.js - Simplified for Django
// Data is now handled by Django templates directly.

document.addEventListener("DOMContentLoaded", function () {
  // We keep only the profile pic change logic if needed, 
  // but even that is now handled by a form submission in profile.html
  
  const picInput = document.getElementById("pic-input");
  if (picInput) {
    picInput.addEventListener("change", function () {
      if (this.files && this.files[0]) {
        document.getElementById('profile-pic-form').submit();
      }
    });
  }
});
