from django.db import models
from django.contrib.auth.models import User

# Extended user profile to store Google auth data
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    google_id = models.CharField(max_length=100, unique=True, null=True, blank=True)
    picture = models.URLField(null=True, blank=True)
    
    def __str__(self):
        return f"{self.user.email} Profile"

class Resume(models.Model):
    TEMPLATE_CHOICES = [
        ('professional', 'Professional'),
        ('creative', 'Creative'),
        ('minimal', 'Minimal'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='resumes')
    title = models.CharField(max_length=200, default='My Resume')
    template = models.CharField(max_length=50, choices=TEMPLATE_CHOICES, default='professional')
    data = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['-updated_at']
    
    def __str__(self):
        return f"{self.title} - {self.user.username}"