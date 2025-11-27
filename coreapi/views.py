from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from django.conf import settings
from django_ratelimit.decorators import ratelimit
import secrets
import requests
import os
# Environment variables are loaded in settings.py

@api_view(['GET'])
def hello_world(request):
    return Response({'message': 'Hello, world!'})

@api_view(['POST'])
def signup(request):
    """Handle user signup"""
    try:
        email = request.data.get('email')
        password = request.data.get('password')
        first_name = request.data.get('first_name', '')
        last_name = request.data.get('last_name', '')
        
        if not email or not password:
            return Response(
                {'error': 'Email and password are required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if User.objects.filter(email=email).exists():
            return Response(
                {'error': 'User with this email already exists'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user = User.objects.create_user(
            username=email,
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name
        )
        
        token = secrets.token_urlsafe(32)
        
        return Response({
            'message': 'User created successfully',
            'user': {
                'id': user.id,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name
            },
            'token': token
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['POST'])
def login(request):
    """Handle user login"""
    try:
        email = request.data.get('email')
        password = request.data.get('password')
        
        if not email or not password:
            return Response(
                {'error': 'Email and password are required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user = authenticate(username=email, password=password)
        
        if user is None:
            return Response(
                {'error': 'Invalid email or password'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        token = secrets.token_urlsafe(32)
        
        return Response({
            'message': 'Login successful',
            'user': {
                'id': user.id,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name
            },
            'token': token
        })
        
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['POST'])
def google_auth(request):
    """Handle Google OAuth authentication"""
    try:
        token = request.data.get('token')
        
        if not token:
            return Response(
                {'error': 'Token is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            idinfo = id_token.verify_oauth2_token(
                token, 
                google_requests.Request(), 
                settings.GOOGLE_CLIENT_ID
            )
            
            email = idinfo['email']
            name = idinfo.get('name', '')
            picture = idinfo.get('picture', '')
            google_id = idinfo['sub']
            
            name_parts = name.split(' ', 1)
            first_name = name_parts[0] if name_parts else ''
            last_name = name_parts[1] if len(name_parts) > 1 else ''
            
            user, created = User.objects.get_or_create(
                email=email,
                defaults={
                    'username': email,
                    'first_name': first_name,
                    'last_name': last_name
                }
            )
            
            try:
                from .models import UserProfile
                profile, _ = UserProfile.objects.get_or_create(user=user)
                profile.google_id = google_id
                profile.picture = picture
                profile.save()
            except Exception as profile_error:
                print(f"Profile update failed: {profile_error}")
            
            return Response({
                'message': 'Authentication successful',
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'name': name,
                    'picture': picture
                }
            })
            
        except ValueError as e:
            return Response(
                {'error': f'Invalid token: {str(e)}'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
    except Exception as e:
        import traceback
        print(f"Google auth error: {str(e)}")
        print(traceback.format_exc())
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@ratelimit(key='ip', rate='10/m', method='POST')
@api_view(['POST'])
def ai_suggest(request):
    """Generate AI suggestions using Gemini API"""
    import time
    
    # Check if rate limited
    if getattr(request, 'limited', False):
        return Response(
            {'error': 'Too many requests. Please try again later. Limit: 10 requests per minute.'},
            status=status.HTTP_429_TOO_MANY_REQUESTS
        )
    
    try:
        section = request.data.get('section')
        current_content = request.data.get('currentContent', '')
        user_info = request.data.get('userInfo', {})
        custom_prompt = request.data.get('prompt', '')
        
        # Get API key from environment variable
        api_key = os.getenv('GEMINI_API_KEY')
        if not api_key:
            return Response(
                {'error': 'API key not configured. Please set GEMINI_API_KEY environment variable.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
        if custom_prompt:
            prompt = custom_prompt
        else:
            # Build context-aware prompts based on current content
            title = user_info.get('title', 'professional')
            name = user_info.get('name', '')
            
            if section == 'summary':
                if current_content and len(current_content.strip()) > 10:
                    # Improve existing content
                    prompt = f"""You are a professional resume writer. Improve and enhance this resume summary for a {title}.

Current summary:
{current_content}

Instructions:
- Keep the core message but make it more professional and impactful
- Make it concise (2-3 sentences)
- Use strong action words and quantifiable achievements
- Highlight key strengths relevant to {title} role
- Make it compelling for Indian job market
- Return ONLY the improved summary, no explanations"""
                else:
                    # Generate new content
                    prompt = f"""Write a professional resume summary for a {title} named {name if name else 'the candidate'}.

Instructions:
- Make it compelling and concise (2-3 sentences)
- Highlight key strengths and achievements
- Use strong action words
- Focus on skills relevant to {title} role in India
- Make it impactful for recruiters
- Return ONLY the summary, no explanations"""
            
            elif section == 'experience':
                if current_content and len(current_content.strip()) > 10:
                    prompt = f"""Improve these job responsibilities for a {title} role:

Current description:
{current_content}

Instructions:
- Rewrite as 3-4 professional bullet points
- Use action verbs (Led, Developed, Implemented, etc.)
- Quantify results where possible (percentages, numbers)
- Focus on impact and achievements
- Make it ATS-friendly
- Return ONLY the bullet points, no explanations"""
                else:
                    prompt = f"""Write 3-4 professional bullet points describing job responsibilities and achievements for a {title} role.

Instructions:
- Start each point with strong action verbs
- Quantify results where possible (e.g., "Increased efficiency by 30%")
- Focus on impact and achievements, not just duties
- Make it relevant to {title} position
- Return ONLY the bullet points, no explanations"""
            
            elif section == 'skills':
                if current_content and len(current_content.strip()) > 5:
                    prompt = f"""Enhance this skills list for a {title}:

Current skills:
{current_content}

Instructions:
- Add relevant missing skills for {title} role
- Remove any irrelevant skills
- Organize by importance
- Include both technical and soft skills
- Return as comma-separated list ONLY, no explanations"""
                else:
                    prompt = f"""Suggest 8-10 relevant professional and technical skills for a {title} role in India.

Instructions:
- Include both technical and soft skills
- Make them relevant to {title} position
- Include industry-standard tools and technologies
- Return as comma-separated list ONLY, no explanations"""
            
            else:
                prompt = f'Provide professional resume writing advice for {section} section.'
        
        # Use gemini-2.5-flash model (available with this API key)
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"
        
        headers = {
            'Content-Type': 'application/json'
        }
        
        payload = {
            "contents": [{
                "parts": [{
                    "text": prompt
                }]
            }]
        }
        
        max_retries = 3
        retry_delay = 2
        
        for attempt in range(max_retries):
            try:
                response = requests.post(url, json=payload, headers=headers, timeout=30)
                
                if response.status_code == 200:
                    data = response.json()
                    suggestion = data['candidates'][0]['content']['parts'][0]['text']
                    
                    return Response({
                        'suggestion': suggestion.strip()
                    })
                elif response.status_code == 429:
                    # Rate limit - retry with backoff
                    error_data = response.json() if response.text else {}
                    error_message = error_data.get('error', {}).get('message', 'Rate limit exceeded')
                    print(f"Gemini API 429 error: {error_message}")
                    
                    if attempt < max_retries - 1:
                        wait_time = retry_delay * (2 ** attempt)
                        print(f"Rate limit hit, waiting {wait_time} seconds before retry {attempt + 1}/{max_retries}")
                        time.sleep(wait_time)
                        continue
                    else:
                        return Response(
                            {'error': f'Rate Limit Exceeded\n\n{error_message}\n\nPlease wait a few minutes and try again.\n\nTip: The Gemini API free tier allows 15 requests per minute.'},
                            status=status.HTTP_429_TOO_MANY_REQUESTS
                        )
                elif response.status_code == 503:
                    # Service overloaded - retry with backoff
                    error_data = response.json() if response.text else {}
                    error_message = error_data.get('error', {}).get('message', 'Service temporarily overloaded')
                    print(f"Gemini API 503 error: {error_message}")
                    
                    if attempt < max_retries - 1:
                        wait_time = retry_delay * (2 ** attempt)
                        print(f"Service overloaded, waiting {wait_time} seconds before retry {attempt + 1}/{max_retries}")
                        time.sleep(wait_time)
                        continue
                    else:
                        return Response(
                            {'error': f'Service Temporarily Overloaded\n\nThe AI service is experiencing high demand right now.\n\nPlease wait 30-60 seconds and try again.\n\nThis is temporary and will resolve shortly.'},
                            status=status.HTTP_503_SERVICE_UNAVAILABLE
                        )
                else:
                    # Other errors - return detailed message
                    error_data = response.json() if response.text else {}
                    error_message = error_data.get('error', {}).get('message', 'Unknown error')
                    print(f"Gemini API error {response.status_code}: {error_data}")
                    
                    # Don't retry on client errors (4xx)
                    if 400 <= response.status_code < 500:
                        return Response(
                            {'error': f'API Error ({response.status_code}): {error_message}'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR
                        )
                    
                    # Retry on server errors (5xx) except 503 which is handled above
                    if attempt < max_retries - 1:
                        wait_time = retry_delay * (2 ** attempt)
                        print(f"Server error, waiting {wait_time} seconds before retry {attempt + 1}/{max_retries}")
                        time.sleep(wait_time)
                        continue
                    else:
                        return Response(
                            {'error': f'API Error ({response.status_code}): {error_message}'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR
                        )
            except requests.exceptions.Timeout:
                if attempt < max_retries - 1:
                    time.sleep(retry_delay)
                    continue
                else:
                    return Response(
                        {'error': 'Request timed out. Please try again.'},
                        status=status.HTTP_408_REQUEST_TIMEOUT
                    )
            
    except Exception as e:
        import traceback
        print(f"AI suggestion error: {str(e)}")
        print(traceback.format_exc())
        return Response(
            {'error': 'An unexpected error occurred. Please try again.'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


# Resume CRUD Endpoints
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Resume

@api_view(['GET', 'POST'])
def resume_list(request):
    """List all resumes or create a new one"""
    # For now, allow unauthenticated access (will add auth later)
    user_id = request.data.get('user_id') or request.GET.get('user_id')
    
    if request.method == 'GET':
        if user_id:
            try:
                user = User.objects.get(id=user_id)
                resumes = Resume.objects.filter(user=user, is_active=True)
            except User.DoesNotExist:
                return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            resumes = Resume.objects.filter(is_active=True)
        
        data = [{
            'id': r.id,
            'title': r.title,
            'template': r.template,
            'data': r.data,
            'created_at': r.created_at.isoformat(),
            'updated_at': r.updated_at.isoformat()
        } for r in resumes]
        return Response(data)
    
    elif request.method == 'POST':
        try:
            user_id = request.data.get('user_id')
            if not user_id:
                return Response({'error': 'user_id is required'}, status=status.HTTP_400_BAD_REQUEST)
            
            user = User.objects.get(id=user_id)
            resume = Resume.objects.create(
                user=user,
                title=request.data.get('title', 'Untitled Resume'),
                template=request.data.get('template', 'professional'),
                data=request.data.get('data', {})
            )
            return Response({
                'id': resume.id,
                'title': resume.title,
                'template': resume.template,
                'message': 'Resume created successfully'
            }, status=status.HTTP_201_CREATED)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET', 'PUT', 'DELETE'])
def resume_detail(request, pk):
    """Retrieve, update or delete a resume"""
    try:
        resume = Resume.objects.get(pk=pk, is_active=True)
    except Resume.DoesNotExist:
        return Response({'error': 'Resume not found'}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        return Response({
            'id': resume.id,
            'title': resume.title,
            'template': resume.template,
            'data': resume.data,
            'created_at': resume.created_at.isoformat(),
            'updated_at': resume.updated_at.isoformat()
        })
    
    elif request.method == 'PUT':
        try:
            if 'title' in request.data:
                resume.title = request.data['title']
            if 'template' in request.data:
                resume.template = request.data['template']
            if 'data' in request.data:
                resume.data = request.data['data']
            resume.save()
            return Response({
                'id': resume.id,
                'title': resume.title,
                'message': 'Resume updated successfully'
            })
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    elif request.method == 'DELETE':
        resume.is_active = False
        resume.save()
        return Response({'message': 'Resume deleted successfully'})
