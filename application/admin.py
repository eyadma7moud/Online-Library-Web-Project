from django.contrib import admin
from .models import Book, BorrowRecord, UserProfile

# Register your models here.
admin.site.register(Book)
admin.site.register(BorrowRecord)
admin.site.register(UserProfile)