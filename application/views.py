from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth import authenticate, login, logout, update_session_auth_hash
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib import messages
from django.utils import timezone
from .models import Book, Favourite, BorrowRecord, UserProfile
from .forms import BookForm

# ── Authentication Views ──────────────────────────────────────

def login_view(request):
    if request.user.is_authenticated:
        return redirect('profile')

    if request.method == 'POST':
        user_name = request.POST.get('username')
        user_pass = request.POST.get('password')
        next_url = request.GET.get('next', 'profile')
        
        user = authenticate(request, username=user_name, password=user_pass)
        if user is not None:
            login(request, user)
            messages.success(request, f"Welcome back, {user.username}!")
            return redirect(next_url)
        else:
            messages.error(request, "Invalid username or password")
            
    return render(request, 'application/login.html')

def register_view(request):
    if request.user.is_authenticated:
        return redirect('profile')

    if request.method == 'POST':
        user_name = request.POST.get('username', '').strip()
        user_email = request.POST.get('email', '').strip()
        user_pass = request.POST.get('password', '').strip()
        
        if not user_name or not user_email or not user_pass:
            messages.error(request, "All fields are required.")
        elif "@" not in user_email or "." not in user_email:
            messages.error(request, "Please enter a valid email address.")
        elif len(user_pass) < 6:
            messages.error(request, "Password must be at least 6 characters.")
        elif User.objects.filter(username=user_name).exists():
            messages.error(request, "Username already exists")
        else:
            User.objects.create_user(username=user_name, email=user_email, password=user_pass)
            messages.success(request, "Account created! Please login.")
            return redirect('login')
            
    return render(request, 'application/register.html')

@login_required
def logout_view(request):
    logout(request)
    messages.info(request, "You have been logged out.")
    return redirect('login')

# ── General Views ─────────────────────────────────────────────

def home(request):
    return render(request, 'application/index.html')

def about_page(request):
    return render(request, 'application/about.html')

# ── Book Views ────────────────────────────────────────────────

def books_page(request):
    books = Book.objects.all()
    borrowed_ids = []
    favourite_ids = []
    if request.user.is_authenticated:
        borrowed_ids = BorrowRecord.objects.filter(user=request.user, is_returned=False).values_list('book_id', flat=True)
        favourite_ids = Favourite.objects.filter(user=request.user).values_list('book_id', flat=True)
    
    search = request.GET.get('search')
    category = request.GET.get('category')
    status = request.GET.get('status')

    if search:
        books = books.filter(title__icontains=search)
    if category:
        books = books.filter(category=category)
    if status:
        books = books.filter(status=status)

    return render(request, 'application/books.html', {
        "books": books,
        "borrowed_ids": borrowed_ids,
        "favourite_ids": favourite_ids
    })

def book_details(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    return render(request, 'application/book-details.html', {'book': book})

# ── Borrowing Logic ───────────────────────────────────────────

@login_required 
def borrow_book(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    if book.status == "available":
        BorrowRecord.objects.create(user=request.user, book=book)
        book.status = "borrowed"
        book.save()
        request.session['last_borrowed_book_id'] = book.id
        return redirect("borrow_success")
    else:
        messages.warning(request, "This book is already borrowed.")
        return redirect("books")

@login_required
def return_book(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    if book.status == "borrowed":
        borrow_rec = BorrowRecord.objects.filter(book=book, user=request.user, is_returned=False).last()
        if borrow_rec:
            borrow_rec.is_returned = True
            borrow_rec.return_date = timezone.now()
            borrow_rec.save()
            book.status = "available"
            book.save()
            request.session['last_returned_book_id'] = book.id
            return redirect("return_success")
        else:
            messages.error(request, "No active borrowing record found for this book.")
    return redirect("books")

@login_required
def borrowed_books(request):
    borrowed_records = BorrowRecord.objects.filter(user=request.user, is_returned=False)
    return render(request, "application/borrowed-books.html", {"borrowed_records": borrowed_records})

@login_required
def borrow_history(request):
    history_records = BorrowRecord.objects.filter(user=request.user).order_by('-borrow_date')
    return render(request, "application/borrow-history.html", {"history_records": history_records})

@login_required
def borrow_success(request):
    book_id = request.session.pop('last_borrowed_book_id', None)
    book = get_object_or_404(Book, id=book_id) if book_id else None
    return render(request, 'application/borrow_success.html', {'book': book})

@login_required
def return_success(request):
    book_id = request.session.pop('last_returned_book_id', None)
    book = get_object_or_404(Book, id=book_id) if book_id else None
    return render(request, 'application/return_success.html', {'book': book})

# ── Favourite Views ───────────────────────────────────────────

@login_required
def favourite_page(request):
    favourites = Favourite.objects.filter(user=request.user)
    return render(request, 'application/favourite.html', {'favourites': favourites})

from django.http import JsonResponse

@login_required
def add_to_favourite(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    Favourite.objects.get_or_create(user=request.user, book=book)
    
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        return JsonResponse({'status': 'success', 'action': 'added'})
        
    messages.success(request, f"Added {book.title} to favourites!")
    return redirect(request.META.get('HTTP_REFERER', 'favourite'))

@login_required
def remove_from_favourite(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    Favourite.objects.filter(user=request.user, book=book).delete()
    
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        return JsonResponse({'status': 'success', 'action': 'removed'})
        
    messages.success(request, f"Removed {book.title} from favourites!")
    return redirect(request.META.get('HTTP_REFERER', 'favourite'))

# ── Profile & Settings ────────────────────────────────────────

@login_required
def profile(request):
    profile_obj, created = UserProfile.objects.get_or_create(user=request.user)
    
    if request.method == 'POST' and request.FILES.get('profile_pic'):
        profile_obj.profile_pic = request.FILES.get('profile_pic')
        profile_obj.save()
        messages.success(request, "Profile picture updated!")
        return redirect('profile')

    total_borrowed = BorrowRecord.objects.filter(user=request.user).count()
    currently_active = BorrowRecord.objects.filter(user=request.user, is_returned=False).count()
    returned = BorrowRecord.objects.filter(user=request.user, is_returned=True).count()
    
    context = {
        'total_borrowed': total_borrowed,
        'currently_active': currently_active,
        'returned': returned,
        'profile': profile_obj,
    }
    return render(request, "application/profile.html", context)

@login_required
def profile_info(request):
    return render(request, 'application/profile_info.html')

@login_required
def account_settings(request):
    profile_obj, created = UserProfile.objects.get_or_create(user=request.user)
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
            update_session_auth_hash(request, user)
        else:
            user.save()

        messages.success(request, 'Account updated successfully!')
        return redirect('profile')
    return render(request, 'application/account-settings.html', {'profile': profile_obj})

# ── Admin Dashboard Views ─────────────────────────────────────

@login_required
def admin_dashboard(request):
    # Optional: check if user is staff
    # if not request.user.is_staff: return redirect('home')
    
    books = Book.objects.all().order_by('-created_at')
    total_books = books.count()
    borrowed_count = books.filter(status='borrowed').count()
    total_users = User.objects.count()

    edit_success = request.session.pop('edit_success', None)
    add_success = request.session.pop('add_success', None)

    return render(request, 'application/admin-dashboard.html', {
        'books': books,
        'total_books': total_books,
        'borrowed_books': borrowed_count,
        'total_users': total_users,
        'edit_success': edit_success,
        'add_success': add_success,
    })

@login_required
def add_book(request):
    if request.method == 'POST':
        form = BookForm(request.POST)
        if form.is_valid():
            book = form.save()
            request.session['add_success'] = book.title
            return redirect('admin_dashboard')
    else:
        form = BookForm()
    return render(request, 'application/add-book.html', {'form': form})

@login_required
def edit_book(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    if request.method == 'POST':
        form = BookForm(request.POST, instance=book)
        if form.is_valid():
            form.save()
            request.session['edit_success'] = book.title
            return redirect('admin_dashboard')
    else:
        form = BookForm(instance=book)
    return render(request, 'application/edit-book.html', {'form': form, 'book': book})

@login_required
def delete_book(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    if request.method == 'POST':
        title = book.title
        book.delete()
        messages.success(request, f'"{title}" deleted.')
    return redirect('admin_dashboard')
