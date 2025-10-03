from inertia import render


def home(request):
    """Home page view"""
    return render(request, 'Home', {
        'message': 'hello home',
        'page_name': 'home'
    })
