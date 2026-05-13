# Libraria: Online Library Management System

### Project Overview
Libraria is a comprehensive, full-stack web application developed as the final submission for the **IS231: Web Technology** course. This project (Phase 3) demonstrates the practical application of the Django framework to build a robust, scalable, and user-centric library management ecosystem.

The platform facilitates a seamless interaction between readers and the library's inventory, featuring dynamic book discovery, digital borrowing workflows, and an administrative oversight dashboard.

---

## 🔑 Key Functionalities

### 1. User Interface & Reader Experience
*   **Dynamic Inventory Discovery**: Real-time search and multi-criteria filtering (Title, Author, Category) powered by Django ORM.
*   **Borrowing Ecosystem**: Automated borrowing and returning workflows with real-time status updates and session tracking.
*   **Interactive Favourites**: Asynchronous (AJAX) interaction allowing users to manage personal reading lists without page reloads.
*   **Advanced User Profiles**: Dynamic profile management including secure data updates and profile picture processing.
*   **Aesthetic Continuity**: A bespoke CSS design system featuring native Dark Mode support and high-performance responsive layouts.

### 2. Administrative Controls (Staff Only)
*   **Centralized Analytics**: A staff-only dashboard providing high-level metrics on library inventory and user activity.
*   **Full Inventory CRUD**: Secure interfaces for creating, reading, updating, and deleting book records.
*   **Status Monitoring**: Visual indicators for active borrows, returns, and total system users.

---

## 🛠️ Technical Stack & Dependencies

| Layer | Technology |
|---|---|
| **Backend Framework** | Django 6.0 (Python-based MTV Architecture) |
| **Frontend** | HTML5, Vanilla CSS3 (Custom Variables), JavaScript (ES6+) |
| **Database Engine** | SQLite (Relational Database Management) |
| **Authentication** | Django Contrib Auth (Session-based) |
| **Image Processing** | Pillow (Library for Image Handling) |

*Detailed versions can be found in `requirements.txt`.*

---

## 📂 Project Structure

```text
Online-Library-Web-Project/
├── application/                # Core Django Application
│   ├── models.py               # Database Schema (Book, BorrowRecord, UserProfile, Favourite)
│   ├── views.py                # Business Logic & Request Handling
│   ├── urls.py                 # Application-specific Routing
│   ├── forms.py                # Django ModelForms for Book Management
│   ├── admin.py                # Django Admin Customization
│   └── apps.py                 # App Configuration
├── config/                     # Project Configuration
│   ├── settings.py             # Global Settings (DB, Media, Static)
│   ├── urls.py                 # Main Routing & Media Handling
│   └── wsgi.py / asgi.py       # Server Interfaces
├── static/                     # Assets Directory
│   ├── css/                    # Custom Design System (style.css)
│   ├── js/                     # Client-side Logic (theme.js, auth.js, etc.)
│   └── images/                 # System UI Icons and Graphics
├── templates/                  # HTML Templates
│   ├── base.html               # Global Layout (Navbar, Sidebar, Footer)
│   └── application/            # Page-specific Templates (Home, Books, Profile, Admin)
├── media/                      # User-uploaded Content
│   └── profile_pics/           # Profile Image Storage
├── db.sqlite3                  # Project Database
├── manage.py                   # Django Command-line Utility
├── requirements.txt            # Dependency Specifications
└── README.md                   # Project Documentation
```

---

## 🚀 Installation & Usage Guide

### Prerequisites
*   Python 3.10 or higher
*   pip (Python Package Installer)

### 1. Environment Setup
Clone the repository and install the required dependencies:
```bash
pip install -r requirements.txt
```

### 2. Database Initialization
Prepare the relational schema and synchronize the database:
```bash
python manage.py makemigrations
python manage.py migrate
```

### 3. Administrative Setup
Create a superuser account to access the administrative dashboard:
```bash
python manage.py createsuperuser
```

### 4. Running the Application
Start the development server:
```bash
python manage.py runserver
```
Navigate to `http://127.0.0.1:8000/` in your browser.

---

## 👥 Development Team: Phase 3
*   **Eyad Mahmoud** — Project Leader & Backend Architecture
*   **Ali Saber Hassan** — Lead Developer & Systems Integration
*   **Nour Salah Alaa** — Frontend Engineering & UI Implementation
*   **Ash** — UI/UX Strategy & Design Documentation

---
*Faculty of Computers and Artificial Intelligence — 2026*
