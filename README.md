<p align="center">
  <img src="Assets/Library_Logo.png" alt="Libraria Logo" width="180"/>
</p>

<h1 align="center">📚 Libraria</h1>

<p align="center">
  <b>A comprehensive full-stack Library Management System for browsing, borrowing, and managing books.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Django-6.0-092E20?style=for-the-badge&logo=django&logoColor=white" alt="Django"/>
  <img src="https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python"/>
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3"/>
  <img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite"/>
</p>

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Contributors](#-contributors)
- [License](#-license)

---

## 🔍 About the Project

**Libraria** is a full-stack web application designed to simplify library management and improve user experience for readers and administrators.

The platform provides two main interfaces:

- 👤 **User Interface:** Browse books, search by category or author, borrow books, manage favorites, and update personal profiles.
- 🔐 **Admin Interface:** Manage the entire library catalog with full CRUD operations and monitor users and borrowing records.

The backend is powered by **Django**, while the frontend is built using **HTML**, **CSS**, and **JavaScript**, ensuring a responsive and interactive experience.

---

## ✨ Features

### 👤 User Features

| Feature | Description |
|---|---|
| **Registration & Login** | Secure authentication system for personal accounts |
| **Advanced Search** | Search books by title, author, or category |
| **Borrowing System** | Borrow books with automatic availability updates |
| **Favorites List** | Save books to your favorites collection |
| **Profile Management** | Update profile information and view borrowing history |
| **Dark/Light Mode** | Switch between dark and light themes |

### 🔐 Admin Features

| Feature | Description |
|---|---|
| **Dashboard** | Overview of library statistics and management |
| **Catalog CRUD** | Add, update, and delete books |
| **Image Uploads** | Manage book covers and profile pictures |
| **User Oversight** | Monitor borrowing records and users |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | HTML5, CSS3, JavaScript (ES6+) |
| **Backend** | Python, Django |
| **Database** | SQLite3 |
| **Styling** | Custom CSS |
| **Image Handling** | Pillow |

---

## 📁 Project Structure

```text
Libraria/
│
├── application/                 # Main Django application
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
│   └── images/                  # Images
│
├── media/                       # Uploaded media
├── manage.py                    # Django management script
└── requirements.txt             # Project dependencies
```

---

## 🚀 Getting Started

### Prerequisites

- **Python 3.10+**
- **pip** (Python package manager)
- **Git**

---

### Installation

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/eyadma7moud/Online-Library-Web-Project.git
cd Online-Library-Web-Project
```

---

#### 2️⃣ Create and Activate Virtual Environment

```bash
python -m venv venv
```

##### Windows

```bash
venv\Scripts\activate
```

##### macOS / Linux

```bash
source venv/bin/activate
```

---

#### 3️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

---

#### 4️⃣ Apply Database Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

---

#### 5️⃣ Create Superuser

```bash
python manage.py createsuperuser
```

---

### Running the Application

#### Start the Django Server

```bash
python manage.py runserver
```

Open your browser and visit:

```text
http://127.0.0.1:8000/
```

---

## 👥 Contributors

<table>
  <tr>
    <td align="center"><b>Eyad Mahmoud</b></td>
    <td align="center"><b>Sayed Badawy</b></td>
    <td align="center"><b>Shahd Ayman</b></td>
    <td align="center"><b>Youssef Sherif</b></td>
    <td align="center"><b>Mohamed Mokhtar</b></td>
    <td align="center"><b>Nada Essam</b></td>
  </tr>
</table>

---

## 🎓 Academic Information

<p align="center">
  <b>Faculty of Computers and Artificial Intelligence</b><br>
  Cairo University
</p>

---


<p align="center">
  Made with ❤️ by <b>Libraria Team</b>
</p>
