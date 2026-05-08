from django.shortcuts import render
from .models import Book

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



def books_page(request):

    books = Book.objects.all()
    
    search = request.GET.get('search')
    category = request.GET.get('category')
    status = request.GET.get('status')

    if search:
        books = books.filter(title__icontains=search)

    if category:
        books = books.filter(category=category)

    if status:
        books = books.filter(status=status)

    return render(request, 'application/books.html', {"books": books})


def favourite(request):
    return render(request, 'application/favourite.html')

def about(request):
    return render(request, 'application/about.html')