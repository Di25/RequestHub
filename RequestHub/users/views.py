from django.contrib.auth.views import PasswordResetView
from django.urls import reverse_lazy
from django.views.generic import CreateView

from .forms import CustomUserCreationForm


class SignUp(CreateView):
    form_class = CustomUserCreationForm
    success_url = reverse_lazy('application:index')
    template_name = 'users/signup.html'


class CustomPasswordResetView(PasswordResetView):
    email_template_name = "users/password_reset_email.html"
