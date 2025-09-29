from django.shortcuts import render

def home(request):
    return render(request, 'home.html')
    
def page(request):
    return render(request, 'page.html')
