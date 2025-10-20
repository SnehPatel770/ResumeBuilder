from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import User
from django.core.exceptions import ValidationError
from django.core.validators import validate_email

@api_view(['GET'])
def hello_world(request):
    return Response({'message': 'Hello, world!'})

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({'error': 'Email and password are required.'}, status=400)

    user = authenticate(request, username=email, password=password)
    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            'token': str(refresh.access_token),
            'refresh': str(refresh),
            'user': {
                'id': user.id,
                'email': user.email,
                'username': user.username,
            }
        })
    else:
        return Response({'error': 'Invalid credentials.'}, status=401)

@api_view(['POST'])
@permission_classes([AllowAny])
def signup_view(request):
    name = request.data.get('name')
    email = request.data.get('email')
    password = request.data.get('password')

    if not name or not email or not password:
        return Response({'error': 'Name, email, and password are required.'}, status=400)

    try:
        validate_email(email)
    except ValidationError:
        return Response({'error': 'Invalid email address.'}, status=400)

    if User.objects.filter(email=email).exists():
        return Response({'error': 'User with this email already exists.'}, status=400)

    user = User.objects.create_user(username=email, email=email, password=password, first_name=name)
    refresh = RefreshToken.for_user(user)
    return Response({
        'token': str(refresh.access_token),
        'refresh': str(refresh),
        'user': {
            'id': user.id,
            'email': user.email,
            'username': user.username,
        }
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me_view(request):
    user = request.user
    return Response({
        'id': user.id,
        'email': user.email,
        'username': user.username,
    })

@api_view(['POST'])
@permission_classes([AllowAny])
def google_login_view(request):
    # For simplicity, we'll assume the token is validated on frontend
    # In production, validate the Google token here
    token = request.data.get('token')
    if not token:
        return Response({'error': 'Token is required.'}, status=400)

    # Mock user creation/login for Google
    # In real implementation, decode and verify the Google JWT
    # For now, create a dummy user or find existing
    email = 'google_user@example.com'  # Extract from token
    user, created = User.objects.get_or_create(email=email, defaults={'username': email})
    refresh = RefreshToken.for_user(user)
    return Response({
        'token': str(refresh.access_token),
        'refresh': str(refresh),
        'user': {
            'id': user.id,
            'email': user.email,
            'username': user.username,
        }
    })
