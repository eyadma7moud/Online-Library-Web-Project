// ── Default users 
const DEFAULT_USERS = [
  {
    id: 1,
    name: "Eyad Mahmoud",
    email: "eyad@gmail.com",
    password: "123456",
    role: "user",
    joinDate: "2026-01-10",
    favourites: [1, 3],
    borrowedBooks: [{ bookId: 2, borrowDate: "2026-03-20", returnDate: null }]
  },
  {
    id: 2,
    name: "Ali Saber Hassan",
    email: "ali@gmail.com",
    password: "123456",
    role: "user",
    joinDate: "2026-01-15",
    favourites: [2],
    borrowedBooks: [{ bookId: 1, borrowDate: "2026-03-20", returnDate: null }]
  },
  {
    id: 3,
    name: "Nour Salah Alaa",
    email: "nour@gmail.com",
    password: "123456",
    role: "user",
    joinDate: "2026-02-01",
    favourites: [1, 2],
    borrowedBooks: [{ bookId: 2, borrowDate: "2026-03-20", returnDate: null }]
  },
  {
    id: 4,
    name: "Admin",
    email: "admin@libraria.com",
    password: "admin",
    role: "admin",
    joinDate: "2026-01-01",
    favourites: [],
    borrowedBooks: []
  }
];

// ── Helpers 

function getUsers() {
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(DEFAULT_USERS));
  }
  return JSON.parse(localStorage.getItem("users"));
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function getCurrentUser() {
  const data = localStorage.getItem("currentUser");
  return data ? JSON.parse(data) : null;
}

function isAdmin() {
  const u = getCurrentUser();
  return u && u.role === "admin";
}

function isLoggedIn() {
  return getCurrentUser() !== null;
}

// ── Login 
function handleLogin(email, password, errorElId) {
  const users = getUsers();
  const user = users.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) {
    const el = document.getElementById(errorElId);
    if (el) { el.textContent = "❌ Invalid email or password."; el.style.display = "block"; }
    return false;
  }

  const { password: _, ...safeUser } = user;
  localStorage.setItem("currentUser", JSON.stringify(safeUser));

  window.location.href = user.role === "admin" ? "/admin-dashboard/" : "/profile/";
  return true;
}

// ── Register 
function handleRegister(name, email, password, confirmPassword, errorElId) {
  const el = document.getElementById(errorElId);

  if (password !== confirmPassword) {
    if (el) { el.textContent = "❌ Passwords do not match."; el.style.display = "block"; }
    return false;
  }

  const users = getUsers();
  const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    if (el) { el.textContent = "❌ An account with this email already exists."; el.style.display = "block"; }
    return false;
  }

  const newUser = {
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    name, email, password,
    role: "user",
    joinDate: new Date().toISOString().split("T")[0],
    favourites: [],
    borrowedBooks: []
  };

  users.push(newUser);
  saveUsers(users);
  window.location.href = "/login/";
  return true;
}

// ── Logout 
function handleLogout() {
  localStorage.removeItem("currentUser");
  window.location.href = "/";
}

// ── Admin Protection 
function protectAdmin() {
  if (!isAdmin()) window.location.href = "/";
}

// ── Theme  
function applyThemeToButtons() {
  const saved = localStorage.getItem("theme") || "light";

  document.querySelectorAll(".theme-toggle").forEach(function (btn) {
    btn.textContent = saved === "dark" ? "☀️" : "🌙";
    btn.title = saved === "dark" ? "Switch to light mode" : "Switch to dark mode";

    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);

    newBtn.addEventListener("click", function () {
      const isDark = document.body.classList.contains("dark");
      const newTheme = isDark ? "light" : "dark";
      document.body.classList.toggle("dark", newTheme === "dark");
      localStorage.setItem("theme", newTheme);
      document.querySelectorAll(".theme-toggle").forEach(b => {
        b.textContent = newTheme === "dark" ? "☀️" : "🌙";
        b.title = newTheme === "dark" ? "Switch to light mode" : "Switch to dark mode";
      });
    });
  });
}

// ── Navbar Updater 
function updateNavbar() {
  const user = getCurrentUser();

  // ── Top Nav 
  const topLinks = document.querySelector(".topnav .links");
  if (topLinks) {
    topLinks.querySelectorAll("a").forEach(a => {
      const href = a.getAttribute("href") || "";
      if (
        href.includes("/login/") ||
        href.includes("/register/") ||
        href.includes("/admin-dashboard/") ||
        href.includes("/profile/")
      ) a.remove();
    });

    const themeBtn = topLinks.querySelector(".theme-toggle");

    if (!user) {
      topLinks.insertBefore(makeLink("/login/", "Login"), themeBtn);
      topLinks.insertBefore(makeLink("/register/", "Register"), themeBtn);
    } else {
      topLinks.insertBefore(makeLink("/profile/", "My Profile"), themeBtn);
      if (user.role === "admin") {
        const dashLink = makeLink("/admin-dashboard/", "Admin Dashboard");
        dashLink.classList.add("dashboard");
        topLinks.insertBefore(dashLink, themeBtn);
      }
      const logoutBtn = document.createElement("button");
      logoutBtn.textContent = "Logout";
      logoutBtn.className = "logout-btn";
      logoutBtn.addEventListener("click", handleLogout);
      topLinks.insertBefore(logoutBtn, themeBtn);
    }
  }

  // ── Side Menu 
  const sideMenu = document.querySelector(".menu-wrapper nav.menu");
  if (sideMenu) {
    Array.from(sideMenu.querySelectorAll("a")).forEach(a => {
      const href = a.getAttribute("href") || "";
      if (
        href.includes("/login/") ||
        href.includes("/register/") ||
        href.includes("/admin-dashboard/") ||
        href.includes("/profile/")
      ) a.remove();
    });

    if (!user) {
      sideMenu.appendChild(makeSideLink("/login/", "🔑", "Login"));
      sideMenu.appendChild(makeSideLink("/register/", "📝", "Register"));
    } else {
      sideMenu.appendChild(makeSideLink("/profile/", "👤", "My Profile"));
      if (user.role === "admin") {
        const div = document.createElement("div");
        div.className = "menu-divider";
        sideMenu.appendChild(div);
        const dashA = makeSideLink("/admin-dashboard/", "⚙️", "Admin Dashboard");
        dashA.classList.add("dashboard-link");
        sideMenu.appendChild(dashA);
      }
      const logoutA = document.createElement("a");
      logoutA.href = "#";
      logoutA.innerHTML = `<span class="menu-icon">🚪</span> Logout`;
      logoutA.addEventListener("click", e => { e.preventDefault(); handleLogout(); });
      sideMenu.appendChild(logoutA);
    }
  }
}

function makeLink(href, text) {
  const a = document.createElement("a");
  a.href = href;
  a.textContent = text;
  return a;
}

function makeSideLink(href, icon, text) {
  const a = document.createElement("a");
  a.href = href;
  a.innerHTML = `<span class="menu-icon">${icon}</span> ${text}`;
  return a;
}

// ── Auto-run 
document.addEventListener("DOMContentLoaded", () => {
  getUsers();
  updateNavbar();
  applyThemeToButtons();
});