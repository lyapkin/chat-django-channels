from django import forms
from django.contrib.auth.models import User

class RegForm(forms.ModelForm):
    template_name = 'django/forms/p.html'
    class Meta:
        model = User
        fields = ['username', 'password', 'first_name', 'last_name']