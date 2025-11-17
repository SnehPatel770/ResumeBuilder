from django.urls import path
from .views import hello_world, signup, login, google_auth, ai_suggest, resume_list, resume_detail

urlpatterns = [
    path('hello-world/', hello_world, name='hello-world'),
    path('auth/signup/', signup, name='signup'),
    path('auth/login/', login, name='login'),
    path('auth/google/', google_auth, name='google-auth'),
    path('ai/suggest/', ai_suggest, name='ai-suggest'),
    path('resumes/', resume_list, name='resume-list'),
    path('resumes/<int:pk>/', resume_detail, name='resume-detail'),
]