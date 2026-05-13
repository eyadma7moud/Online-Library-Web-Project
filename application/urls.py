from django.urls import path
from . import views

urlpatterns = [
    # Auth
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('logout/', views.logout_view, name='logout'),

    # General
    path('', views.home, name='home'),
    path('about/', views.about_page, name='about'),

    # Books
    path('books/', views.books_page, name='books'),
    path('book-details/<int:book_id>/', views.book_details, name='book_details'),
    
    # Borrowing
    path('borrow/<int:book_id>/', views.borrow_book, name='borrow_book'),
    path('return-book/<int:book_id>/', views.return_book, name='return_book'),
    path('borrowed-books/', views.borrowed_books, name='borrowed_books'),
    path('borrow-history/', views.borrow_history, name='borrow_history'),
    path('borrow-success/', views.borrow_success, name='borrow_success'),
    path('return-success/', views.return_success, name='return_success'),

    # Favourites
    path('favourite/', views.favourite_page, name='favourite'),
    path('add-favourite/<int:book_id>/', views.add_to_favourite, name='add_favourite'),
    path('remove-favourite/<int:book_id>/', views.remove_from_favourite, name='remove_favourite'),

    # Profile & Settings
    path('profile/', views.profile, name='profile'),
    path('profile-info/', views.profile_info, name='profile_info'),
    path('account-settings/', views.account_settings, name='account_settings'),

    # Admin
    path('admin-dashboard/', views.admin_dashboard, name='admin_dashboard'),
    path('admin-dashboard/add-book/', views.add_book, name='add_book'),
    path('admin-dashboard/edit-book/<int:book_id>/', views.edit_book, name='edit_book'),
    path('admin-dashboard/delete-book/<int:book_id>/', views.delete_book, name='delete_book'),
]
