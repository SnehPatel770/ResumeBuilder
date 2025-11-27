from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth import get_user_model

class User(AbstractUser):
    email = models.EmailField(unique=True)
    # Add any additional fields here

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

UserModel = get_user_model()

class UserProfile(models.Model):
    user = models.OneToOneField(UserModel, on_delete=models.CASCADE, related_name='profile')
    google_id = models.CharField(max_length=100, unique=True, null=True, blank=True)
    picture = models.URLField(null=True, blank=True)
    
    def __str__(self):
        return f"{self.user.email} Profile"

class Resume(models.Model):
    TEMPLATE_CHOICES = [
        ('modern', 'Modern Professional'),
        ('classic', 'Classic Traditional'),
        ('creative', 'Creative Designer'),
        ('minimal', 'Minimal Clean'),
        ('executive', 'Executive Professional'),
        ('tech', 'Tech Developer'),
        ('corporate', 'Corporate Business'),
        ('bold', 'Bold Modern'),
        ('elegant', 'Elegant Classic'),
        ('gradient', 'Gradient Creative'),
        ('compact', 'Compact Professional'),
        ('colorful', 'Colorful Vibrant'),
        ('academic', 'Academic Research'),
        ('startup', 'Startup Innovator'),
        ('medical', 'Medical Healthcare'),
    ]
    
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name='resumes')
    title = models.CharField(max_length=200, default='My Resume')
    template = models.CharField(max_length=50, choices=TEMPLATE_CHOICES, default='modern')
    data = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['-updated_at']
    
    def __str__(self):
        return f"{self.title} - {self.user.username}"
