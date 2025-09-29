from django.urls import path
from . import views

urlpatterns = [
<<<<<<< Updated upstream
    path('home', views.home, name='home'),
    path('', views.page),
]
=======
    path('', views.home, name='home'),
    path('generate_resume/', views.generate_resume, name='generate_resume'),
]
>>>>>>> Stashed changes
