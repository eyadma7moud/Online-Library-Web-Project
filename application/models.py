from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Book(models.Model):
    STATUS_CHOICES = [
        ('available', 'Available'),
        ('borrowed', 'Borrowed'),
    ]
    CATEGORY_CHOICES = [
        ('Fiction',          'Fiction'),
        ('Science',          'Science'),
        ('History',          'History'),
        ('Technology',       'Technology'),
        ('Philosophy',       'Philosophy'),
        ('Self Development', 'Self Development'),
    ]


    title = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES, default='Fiction')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    image = models.URLField(blank=True, default='')
    year        = models.PositiveIntegerField(null=True, blank=True)
    pages       = models.PositiveIntegerField(null=True, blank=True)
    description = models.TextField(blank=True)
    created_at  = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.title

class BorrowRecord(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    borrow_date = models.DateTimeField(auto_now_add=True)
    return_date = models.DateTimeField(null=True, blank=True)
    is_returned = models.BooleanField(default=False)   

    def __str__(self):
        return f"{self.user.username} borrowed {self.book.title}"   


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_pic = models.ImageField(upload_to='profile_pics/', default='default.png')

    def __str__(self):
        return f"{self.user.username}'s Profile"


class Favourite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.username} - {self.book.title}"

