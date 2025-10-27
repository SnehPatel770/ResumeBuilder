
from django.contrib import admin
from django.urls import path, include
from django.contrib import admin
from django.urls import path, include
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# Custom view to handle the social login token exchange
class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('api/', include('api.urls')),
# ]

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # 1. Standard DRF/JWT Login/Refresh
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # 2. dj-rest-auth paths (login, register, etc.)
    path('api/auth/', include('dj_rest_auth.urls')),
    path('api/auth/registration/', include('dj_rest_auth.registration.urls')),

    # 3. Social Login endpoint (This is what React will POST to)
    path('api/auth/google/login/', GoogleLogin.as_view(), name='google_login'),
]