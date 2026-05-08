from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),

     path('admin-dashboard/', views.admin_dashboard, name='admin_dashboard'),

    path('add-book/', views.add_book, name='add_book'),
    path('books/', views.books_page, name='books'),

]