# 📚 Libraria — Online Library Management System

Libraria is a comprehensive, modern web-based library management platform built with **Django**. It provides a seamless experience for both readers to discover and borrow books, and for administrators to manage the library's collection.

---

## ✨ Key Features

### 👤 User Features
- **Dynamic Book Discovery**: Browse and search books by title, author, or category with real-time availability status.
- **Book Details**: Dedicated pages for every book with full metadata and author information.
- **Borrowing System**: Request books digitally with automated status tracking (Available / Borrowed).
- **Personalized Profile**: Customizable user profiles with photo upload and borrowing statistics.
- **Favourites List**: Save your favourite books for quick access.
- **Borrow History**: Track your current and past borrowing activities in a clean table format.
- **Account Settings**: Update your personal information, email, and password securely.

### 🛡️ Admin Features
- **Admin Dashboard**: Manage the entire library collection (Add, Edit, Delete books).
- **Inventory Control**: Real-time monitoring of borrowed vs. available books.
- **Django Admin Integration**: Full access to database records via the powerful Django Admin panel.

### 🌙 Modern UI/UX
- **Dark Mode Support**: Seamlessly toggle between light and dark themes across all pages.
- **Responsive Design**: Optimized for both desktop and mobile viewing.
- **Rich Aesthetics**: Custom-built design using modern typography and smooth transitions.

---

## 🛠️ Technology Stack

- **Backend**: Python / Django (Full MTV Architecture)
- **Frontend**: HTML5, Vanilla CSS3, JavaScript (ES6+)
- **Database**: SQLite (Default) / PostgreSQL ready
- **Styling**: Premium CSS Design System (Glassmorphism & Vibrant Gradients)

---

## 🚀 Recent Improvements & Fixes

We have recently migrated the project from a static frontend to a fully dynamic **Django** environment:
- **Unified Navigation**: Implemented absolute Django URL routing to eliminate all 404 navigation errors.
- **Dynamic Logic**: Moved all localStorage logic to permanent database records using Django Models.
- **Profile Image Support**: Integrated Django Media settings to allow users to upload and persist profile pictures.
- **Template Inheritance**: Used `base.html` to centralize the design and minimize code duplication.
- **Security**: Added CSRF protection and login requirements for sensitive actions like borrowing.

---

## ⚙️ How to Run the Project

1. **Install Dependencies**:
   Ensure you have Python and Django installed. You also need the `Pillow` library for images:
   ```bash
   pip install Django Pillow
   ```

2. **Migrate Database**:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

3. **Create a Superuser** (for Admin access):
   ```bash
   python manage.py createsuperuser
   ```

4. **Start the Server**:
   ```bash
   python manage.py run server
   ```

5. **Visit the Site**:
   Open `http://127.0.0.1:8000/` in your browser.

---

## 👥 Development Team
- **Eyad Mahmoud** — Team Leader
- **Ali Saber Hassan** — Developer
- **Nour Salah Alaa** — Developer
- **Ash** — Developer & UI/UX Designer

---
*Developed with ❤️ as part of the CS214/IS231 Web Technology Project — 2026.*
