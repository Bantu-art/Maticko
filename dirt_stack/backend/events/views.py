from django.shortcuts import redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from inertia import inertia
from .models import Event
from .forms import EventForm
from datetime import datetime, timezone


@inertia('Events/EventList')
def event_list(request):
    # Sample events for now
    sample_events = [
        {
            'id': 1,
            'name': 'Summer Music Festival',
            'slug': 'summer-music-festival',
            'description': 'Join us for an amazing outdoor music festival featuring top artists.',
            'cover_photo': '/media/matickov1.png',
            'price': '75.00',
            'start_date': '2024-07-15T18:00:00Z',
            'end_date': '2024-07-15T23:00:00Z',
            'venue': 'Central Park Amphitheater',
            'user': 'eventorganizer',
        },
        {
            'id': 2,
            'name': 'Tech Conference 2024',
            'slug': 'tech-conference-2024',
            'description': 'Discover the latest in technology and innovation.',
            'cover_photo': '/media/backv1.png',
            'price': '150.00',
            'start_date': '2024-06-20T09:00:00Z',
            'end_date': '2024-06-21T17:00:00Z',
            'venue': 'Convention Center',
            'user': 'techevents',
        },
        {
            'id': 3,
            'name': 'Art Gallery Opening',
            'slug': 'art-gallery-opening',
            'description': 'Experience contemporary art from emerging artists.',
            'cover_photo': '/media/footer.svg',
            'price': '25.00',
            'start_date': '2024-05-30T19:00:00Z',
            'end_date': '2024-05-30T22:00:00Z',
            'venue': 'Downtown Art Gallery',
            'user': 'artcurator',
        },
    ]
    
    return {'events': sample_events}


@login_required
@inertia('Events/CreateEvent')
def create_event(request):
    if request.method == 'POST':
        form = EventForm(request.POST, request.FILES)
        if form.is_valid():
            event = form.save(commit=False)
            event.user = request.user
            event.save()
            return redirect('event_detail', slug=event.slug)
        return {'form': form, 'errors': form.errors}
    
    return {'form': EventForm()}


@inertia('Events/EventDetail')
def event_detail(request, slug):
    event = get_object_or_404(Event, slug=slug)
    return {
        'event': {
            'id': event.id,
            'name': event.name,
            'slug': event.slug,
            'description': event.description,
            'cover_photo': event.cover_photo.url if event.cover_photo else None,
            'price': str(event.price),
            'start_date': event.start_date.isoformat(),
            'end_date': event.end_date.isoformat(),
            'venue': event.venue,
            'created_at': event.created_at.isoformat(),
            'user': event.user.username,
        }
    }