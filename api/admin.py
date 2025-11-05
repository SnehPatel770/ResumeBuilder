from django.contrib import admin
from .models import UserProfile, Resume

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'google_id', 'picture')
    search_fields = ('user__email', 'user__first_name', 'user__last_name')

@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'created_at', 'updated_at')
    list_filter = ('created_at', 'updated_at')
    search_fields = ('title', 'user__email')
    readonly_fields = ('created_at', 'updated_at')
