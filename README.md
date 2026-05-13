# 📚 Libraria

A comprehensive full-stack Library Management System designed for seamless book browsing, borrowing, and administrative control.

---

## 📖 Table of Contents
- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Contributors](#-contributors)
- [License](#-license)

---

## 🔍 About the Project

**Libraria** is a robust web application built to bridge the gap between readers and library resources. It offers a dynamic platform where users can explore a vast catalog of books, manage their borrowing history, and curate personal favorites.

The system is split into two main experiences:

1. **User Experience:** Focused on discovery, borrowing, and profile management.
2. **Admin Experience:** Focused on full catalog CRUD (Create, Read, Update, Delete) operations and user oversight.

Built with a **Django** backend and a dynamic **JavaScript** frontend, Libraria ensures a responsive and secure environment for all library operations.

---

## ✨ Features

### 👤 User Features

| Feature | Description |
| :--- | :--- |
| **Registration & Login** | Secure authentication system for personal accounts. |
| **Advanced Search** | Find books by title, author, or category with real-time results. |
| **Borrowing System** | One-click borrowing with automated availability updates. |
| **Favorites List** | Save books to your personal favorites collection for later. |
| **Profile Management** | Update profile info, change profile pictures, and view borrowing history. |
| **Dark/Light Mode** | Toggleable UI themes for a better reading experience. |

### 🔐 Admin Features

| Feature | Description |
| :--- | :--- |
| **Dashboard** | Overview of all library statistics and system management. |
| **Catalog CRUD** | Full control to add, edit, or delete books from the system. |
| **Image Hosting** | Upload and manage book covers and profile pictures directly. |
| **User Oversight** | Monitor borrowing records and system users. |

---

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | HTML5, CSS3, JavaScript (ES6+) |
| **Backend** | Python, Django |
| **Database** | SQLite3 |
| **Styling** | Custom CSS |
| **Image Handling** | Pillow |

---

## 📁 Project Structure

```text
Libraria/
├── application/                 # Main Django App
│   ├── migrations/              # Database migration files
│   ├── models.py                # Database models
│   ├── urls.py                  # App routes
│   └── views.py                 # Backend logic
│
├── config/                      # Project configuration
│   ├── settings.py              # Django settings
│   └── urls.py                  # Main URL routing
│
├── templates/                   # HTML templates
│   ├── application/             # App templates
│   └── base.html                # Base layout
│
├── static/                      # Static assets
│   ├── css/                     # Stylesheets
│   ├── js/                      # JavaScript files
│   └── images/                  # Static images
│
├── media/                       # Uploaded files
├── manage.py                    # Django management script
└── requirements.txt             # Project dependencies
```

---

## 🚀 Getting Started

### 📌 Prerequisites

- Python 3.10+
- pip (Python package manager)

---

### ⚙ Installation

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/eyadma7moud/Online-Library-Web-Project.git
cd Online-Library-Web-Project
```

---

#### 2️⃣ Set Up Virtual Environment

```bash
python -m venv venv
```

##### Windows

```bash
venv\Scripts\activate
```

##### Mac/Linux

```bash
source venv/bin/activate
```

---

#### 3️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

---

#### 4️⃣ Database Setup

```bash
python manage.py makemigrations
python manage.py migrate
```

---

#### 5️⃣ Create Admin User

```bash
python manage.py createsuperuser
```

---

#### 6️⃣ Run the Development Server

```bash
python manage.py runserver
```

Open your browser and visit:

```text
http://127.0.0.1:8000/
```

---

## 👥 Contributors

This project was developed with ❤️ by:

- **Eyad Mahmoud**
- **Sayed Badawy**
- **Shahd Ayman**
- **Youssef Sherif**
- **Mohamed Mokhtar**
- **Nada Essam**

---

## 🎓 Academic Information

**Faculty of Computers and Artificial Intelligence**  
**Cairo University**
