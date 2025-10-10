from django.shortcuts import redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from inertia import inertia
from .models import Event
from .forms import EventForm


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