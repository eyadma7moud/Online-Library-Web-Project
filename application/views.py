from django.shortcuts import render
from .models import Book, BorrowRecord, UserProfile
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.utils import timezone
from django.shortcuts import redirect, get_object_or_404

def home(request):
    return render(request, 'application/index.html')

from django.contrib.auth import authenticate, login

def login_view(request):
    if request.method == 'POST':
        user_name = request.POST.get('username')
        user_pass = request.POST.get('password')
        user = authenticate(request, username=user_name, password=user_pass)
        if user is not None:
            login(request, user)
            return redirect('profile')
        else:
            messages.error(request, "Invalid username or password")
    return render(request, 'application/login.html')

from django.contrib.auth.models import User

def register_view(request):
    if request.method == 'POST':
        user_name = request.POST.get('username')
        user_email = request.POST.get('email')
        user_pass = request.POST.get('password')
        if User.objects.filter(username=user_name).exists():
            messages.error(request, "Username already exists")
        else:
            User.objects.create_user(username=user_name, email=user_email, password=user_pass)
            messages.success(request, "Account created! Please login.")
            return redirect('login')
    return render(request, 'application/register.html')

def admin_dashboard(request):
    return render(request, 'application/admin-dashboard.html')

def add_book(request):
    return render(request, 'application/add-book.html')



def books_page(request):

    books = Book.objects.all()
    borrowed_ids = []
    if request.user.is_authenticated:
        borrowed_ids = BorrowRecord.objects.filter(user=request.user,
         is_returned=False).values_list('book_id', flat=True)
    
    search = request.GET.get('search')
    category = request.GET.get('category')
    status = request.GET.get('status')

    if search:
        books = books.filter(title__icontains=search)

    if category:
        books = books.filter(category=category)

    if status:
        books = books.filter(status=status)

    return render(request, 'application/books.html',
    {"books": books,
    "borrowed_ids": borrowed_ids })


def favourite(request):
    return render(request, 'application/favourite.html')

def about(request):
    return render(request, 'application/about.html')

def profile(request):
    return render(request, "application/profile.html")

@login_required 
def borrow_book(request,book_id):
    book=get_object_or_404(Book,id=book_id)
    if book.status=="available":
        borrow_rec=BorrowRecord.objects.create(
            user=request.user,
            book=book)
        book.status="borrowed"
        book.save()
        return redirect("borrow_success")
    else:
        return redirect("books")        



@login_required
def return_book(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    
    if book.status == "borrowed":
        borrow_rec = BorrowRecord.objects.filter(
            book=book, 
            user=request.user, 
            is_returned=False
        ).last()

        if borrow_rec:
            borrow_rec.is_returned = True
            borrow_rec.return_date = timezone.now()
            borrow_rec.save()

            book.status = "available"
            book.save()
            return redirect("return_success")
        else:
            messages.error(request, "No active borrowing record found for this book.")
            
        return redirect("books")    
    else:
        return redirect("books")

@login_required
def borrowed_books(request):
    borrowed_records=BorrowRecord.objects.filter(
        user=request.user,
        is_returned=False
        )
    return render(request,"application/borrowed-books.html",
        {"borrowed_records":borrowed_records})


@login_required
def profile(request):
    profile, created = UserProfile.objects.get_or_create(user=request.user)
    
    if request.method == 'POST' and request.FILES.get('profile_pic'):
        profile.profile_pic = request.FILES.get('profile_pic')
        profile.save()
        return redirect('profile')

    total_borrowed = BorrowRecord.objects.filter(user=request.user).count()
    currently_active = BorrowRecord.objects.filter(user=request.user, 
    is_returned=False).count()
    returned = BorrowRecord.objects.filter(user=request.user,
     is_returned=True).count()
    context = {
        'total_borrowed': total_borrowed,
        'currently_active': currently_active,
        'returned': returned,
        'profile': profile,
    }
    return render(request, "application/profile.html", context)

@login_required
def borrow_history(request):
    history_records=BorrowRecord.objects.filter(
        user=request.user
    ).order_by('-borrow_date')
    return render(request,"application/borrow-history.html",{
        "history_records":history_records
    })
@login_required
def account_settings(request):
    profile, created = UserProfile.objects.get_or_create(user=request.user)
    if request.method == 'POST':
        new_username = request.POST.get('username')
        new_email = request.POST.get('email')
        new_password = request.POST.get('new_password')
        
        user = request.user
        if new_username:
            user.username = new_username
        if new_email:
            user.email = new_email
            
        if new_password:
            user.set_password(new_password)
            user.save()
            from django.contrib.auth import update_session_auth_hash
            update_session_auth_hash(request, user)
        else:
            user.save()

        messages.success(request, 'Account updated successfully!')
        return redirect('profile')
    return render(request, 'application/account-settings.html', {'profile': profile})

@login_required
def borrow_success(request):
    return render(request, 'application/borrow_success.html')

@login_required
def return_success(request):
    return render(request, 'application/return_success.html')

@login_required
def profile_info(request):
    return render(request, 'application/profile_info.html')

@login_required
def book_details(request, book_id):
    book = Book.objects.get(id=book_id)
    return render(request, 'application/book-details.html', {'book': book})
