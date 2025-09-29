from django.shortcuts import render
import google.generativeai as genai

# Configure the Gemini API
genai.configure(api_key="")

def home(request):
    return render(request, 'home.html')
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    
def page(request):
    return render(request, 'page.html')
=======
=======
>>>>>>> Stashed changes

def generate_resume(request):
    if request.method == 'POST':
        plain_text = request.POST.get('plain_text', '')
        
        # Create the model
        model = genai.GenerativeModel('gemini-1.5-flash')
        
        # Generate content
        response = model.generate_content(f"Create a professional resume from the following text:\n\n{plain_text}")
        
        return render(request, 'resume.html', {'plain_text': response.text})
    return render(request, 'home.html')
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
