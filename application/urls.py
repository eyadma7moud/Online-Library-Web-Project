from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),

     path('admin-dashboard/', views.admin_dashboard, name='admin_dashboard'),

    path('add-book/', views.add_book, name='add_book'),
    path('books/', views.books_page, name='books'),
    
    path('favourite/', views.favourite, name='favourite'),
    path('about/', views.about, name='about'),
    path('borrow/<int:book_id>/', views.borrow_book, name='borrow_book'),
    path('return-book/<int:book_id>/', views.return_book, name='return_book'),
    path('borrowed-books/', views.borrowed_books, name='borrowed_books'),
    path('profile/', views.profile, name='profile'),
    path('borrow-history/', 
    views.borrow_history, name='borrow_history'),
    path('account-settings/', views.account_settings, name='account_settings'),
    path('borrow-success/', views.borrow_success, name='borrow_success'),
    path('return-success/', views.return_success, name='return_success'),
    path('profile-info/', views.profile_info, name='profile_info'),
    path('book-details/<int:book_id>/', views.book_details, name='book_details'),
]