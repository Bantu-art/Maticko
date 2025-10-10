import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Calendar, MapPin, DollarSign, ArrowRight } from 'lucide-react';

export default function EventList({ events }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <>
            <Head title="Events - Ma-Ticko" />
            
            <div className="min-h-screen bg-neutral-900 py-8">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-white mb-4">Upcoming Events</h1>
                        <p className="text-neutral-400">Discover amazing events happening near you</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map((event) => (
                            <div key={event.id} className="bg-neutral-800 rounded-2xl overflow-hidden border border-neutral-700 hover:border-amber-500/50 transition-all duration-300 group">
                                {/* Cover Photo */}
                                {event.cover_photo && (
                                    <div className="h-48 overflow-hidden">
                                        <img 
                                            src={event.cover_photo} 
                                            alt={event.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                )}

                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                                        {event.name}
                                    </h3>
                                    
                                    <p className="text-neutral-400 text-sm mb-4 line-clamp-2">
                                        {event.description}
                                    </p>

                                    {/* Event Details */}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-neutral-300 text-sm">
                                            <Calendar className="w-4 h-4 text-amber-400" />
                                            <span>{formatDate(event.start_date)}</span>
                                        </div>
                                        
                                        <div className="flex items-center gap-2 text-neutral-300 text-sm">
                                            <MapPin className="w-4 h-4 text-amber-400" />
                                            <span>{event.venue}</span>
                                        </div>
                                        
                                        <div className="flex items-center gap-2 text-neutral-300 text-sm">
                                            <DollarSign className="w-4 h-4 text-amber-400" />
                                            <span className="font-semibold">${event.price}</span>
                                        </div>
                                    </div>

                                    {/* View Details Button */}
                                    <Link 
                                        href={`/events/${event.slug}`}
                                        className="flex items-center justify-between w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold py-3 px-4 rounded-lg transition-colors group"
                                    >
                                        <span>View Details</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {events.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-neutral-400 text-lg">No events found.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}