from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Book(models.Model):
    STATUS_CHOICES = [
        ('available', 'Available'),
        ('borrowed', 'Borrowed'),
    ]


    title = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    image = models.URLField()
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
