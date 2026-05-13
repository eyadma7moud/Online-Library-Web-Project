from django import forms
from .models import Book

class BookForm(forms.ModelForm):
    class Meta:
        model  = Book
        fields = ['title', 'author', 'category', 'status', 'image', 'year', 'pages', 'description']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['category'].widget = forms.Select(
            choices=Book.CATEGORY_CHOICES,
            attrs={'id': 'category'}
        )
        self.fields['status'].widget = forms.Select(
            choices=Book.STATUS_CHOICES,
            attrs={'id': 'status'}
        )
        self.fields['title'].widget = forms.TextInput(attrs={
            'id': 'title', 'placeholder': 'Enter book title'
        })
        self.fields['author'].widget = forms.TextInput(attrs={
            'id': 'author', 'placeholder': 'Enter author name'
        })
        self.fields['image'].widget = forms.URLInput(attrs={
            'id': 'image', 'placeholder': 'https://example.com/cover.jpg'
        })
        self.fields['year'].widget = forms.NumberInput(attrs={
            'id': 'year', 'placeholder': 'Year'
        })
        self.fields['pages'].widget = forms.NumberInput(attrs={
            'id': 'pages', 'placeholder': 'Number of pages'
        })
        self.fields['description'].widget = forms.Textarea(attrs={
            'id': 'description', 'rows': 5,
            'placeholder': 'Write a short description'
        })

        self.fields['year'].required        = False
        self.fields['pages'].required       = False
        self.fields['description'].required = False
        self.fields['image'].required       = False