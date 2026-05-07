// theme.js — ضيفي <script src="theme.js"></script> قبل </body> في كل صفحة

document.addEventListener('DOMContentLoaded', function () {

  const saved = localStorage.getItem('theme') || 'light';
  applyTheme(saved);

  document.querySelectorAll('.theme-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const isDark = document.body.classList.contains('dark');
      applyTheme(isDark ? 'light' : 'dark');
    });
  });

  document.addEventListener('click', function (e) {
    const details = document.querySelector('.menu-wrapper details');
    if (details && details.open && !details.contains(e.target)) {
      details.removeAttribute('open');
    }
  });

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    document.querySelectorAll('.theme-toggle').forEach(function (btn) {
      btn.textContent = theme === 'dark' ? '☀️' : '🌙';
      btn.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    });
    localStorage.setItem('theme', theme);
  }

});
