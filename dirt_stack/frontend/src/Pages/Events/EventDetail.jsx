import React from 'react';
import { Head } from '@inertiajs/react';
import { Calendar, MapPin, DollarSign, User } from 'lucide-react';

export default function EventDetail({ event }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <>
            <Head title={event.name} />
            
            <div className="min-h-screen bg-neutral-900 py-8">
                <div className="max-w-4xl mx-auto px-6">
                    {/* Cover Photo */}
                    {event.cover_photo && (
                        <div className="mb-8 rounded-2xl overflow-hidden">
                            <img 
                                src={event.cover_photo} 
                                alt={event.name}
                                className="w-full h-96 object-cover"
                            />
                        </div>
                    )}

                    {/* Event Info */}
                    <div className="bg-neutral-800 rounded-2xl p-8 border border-neutral-700">
                        <h1 className="text-4xl font-bold text-white mb-6">{event.name}</h1>
                        
                        {/* Event Details Grid */}
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="flex items-center gap-3 text-neutral-300">
                                <Calendar className="w-5 h-5 text-amber-400" />
                                <div>
                                    <p className="font-semibold">Start: {formatDate(event.start_date)}</p>
                                    <p className="font-semibold">End: {formatDate(event.end_date)}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3 text-neutral-300">
                                <MapPin className="w-5 h-5 text-amber-400" />
                                <span className="font-semibold">{event.venue}</span>
                            </div>
                            
                            <div className="flex items-center gap-3 text-neutral-300">
                                <DollarSign className="w-5 h-5 text-amber-400" />
                                <span className="font-semibold text-2xl">${event.price}</span>
                            </div>
                            
                            <div className="flex items-center gap-3 text-neutral-300">
                                <User className="w-5 h-5 text-amber-400" />
                                <span>Organized by {event.user}</span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">About This Event</h2>
                            <p className="text-neutral-300 leading-relaxed whitespace-pre-wrap">
                                {event.description}
                            </p>
                        </div>

                        {/* Buy Ticket Button */}
                        <button className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-4 px-8 rounded-xl text-lg transition-colors">
                            Buy Ticket - ${event.price}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}