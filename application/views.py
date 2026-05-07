from django.shortcuts import render

def home(request):
    return render(request, 'application/index.html')

def login_view(request):
    return render(request, 'application/login.html')

def register_view(request):
    return render(request, 'application/register.html')

def admin_dashboard(request):
    return render(request, 'application/admin-dashboard.html')

def add_book(request):
    return render(request, 'application/add-book.html')