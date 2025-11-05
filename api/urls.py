from django.urls import path
from . import views

urlpatterns = [
    path('auth/google/', views.google_auth, name='google_auth'),
]