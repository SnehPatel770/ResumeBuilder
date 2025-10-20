from django.urls import path
from .views import hello_world, login_view, signup_view, me_view, google_login_view

urlpatterns = [
    path('hello-world/', hello_world, name='hello-world'),
    path('auth/login/', login_view, name='login'),
    path('auth/signup/', signup_view, name='signup'),
    path('auth/me/', me_view, name='me'),
    path('auth/google/', google_login_view, name='google_login'),
]
