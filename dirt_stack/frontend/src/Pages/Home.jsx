import React from "react";
import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import { createPageUrl } from "@/utils";
import { Ticket, Clock, Shield, Star, ArrowRight, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Decorative African Pattern Overlay */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`,
        }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')`
          }}
        ></div>
        
        {/* Cream/Brown Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/70 via-orange-800/60 to-yellow-900/70"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 mb-8 bg-cream-100/20 backdrop-blur-sm px-6 py-3 rounded-full border border-amber-200/30">
              <div className="w-3 h-3 bg-amber-300 rounded-full animate-pulse shadow-lg"></div>
              <span className="text-amber-100 font-semibold tracking-widest uppercase text-sm">
                Premium Event Ticketing
              </span>
            </div>
            
            <h1 className="font-serif text-6xl lg:text-8xl font-black mb-8 leading-tight tracking-tight">
              <span className="text-cream-50 drop-shadow-2xl">
                Celebrate
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-300 to-yellow-200 drop-shadow-lg">
                Every Moment
              </span>
            </h1>
            
            <p className="text-xl text-cream-100/95 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              Where culture meets community. Discover extraordinary events, connect with passionate creators, 
              and be part of something unforgettable.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="group bg-gradient-to-r from-amber-400 to-orange-500 text-amber-900 font-bold px-12 py-6 rounded-2xl hover:shadow-2xl hover:shadow-amber-400/40 transition-all duration-300 flex items-center justify-center gap-3 border-2 border-amber-300">
                <Ticket className="w-6 h-6" />
                Get Your Tickets
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-3 border-cream-200 text-cream-100 hover:bg-cream-100 hover:text-amber-900 font-bold px-12 py-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-sm">
                Discover Events
              </button>
            </div>
          </motion.div>
        </div>

      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <div className="bg-neutral-800 border border-neutral-700 p-8 rounded-2xl hover:border-amber-500/50 transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500/20 to-orange-600/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Clock className="w-7 h-7 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-white mb-2">Instant Access</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    Book your spot in real-time with seamless digital ticketing
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-neutral-800 border border-neutral-700 p-8 rounded-2xl hover:border-emerald-500/50 transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Shield className="w-7 h-7 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-white mb-2">Protected</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    Your transactions secured with advanced encryption
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-neutral-800 border border-neutral-700 p-8 rounded-2xl hover:border-purple-500/50 transition-all duration-300 group md:col-span-2 lg:col-span-1">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Users className="w-7 h-7 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-white mb-2">Community First</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    Built for organizers and attendees alike
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-6 py-20 bg-neutral-950 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-amber-500/20 to-transparent"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-orange-500/20 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px flex-grow bg-gradient-to-r from-transparent to-amber-500/50"></div>
              <span className="text-amber-400 uppercase tracking-widest text-sm font-semibold">What We Offer</span>
              <div className="h-px flex-grow bg-gradient-to-l from-transparent to-amber-500/50"></div>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white text-center mb-4">
              Everything You Need
            </h2>
            <p className="text-neutral-400 text-center max-w-2xl mx-auto text-lg">
              Powerful tools that bring your events to life
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 p-8 rounded-2xl border border-neutral-700 hover:border-amber-500/50 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center rotate-3">
                  <Ticket className="w-8 h-8 text-amber-400" />
                </div>
                <h3 className="font-bold text-2xl text-white">Event Ticketing</h3>
              </div>
              <p className="text-neutral-400 leading-relaxed mb-4">
                Create, customize, and distribute tickets for concerts, festivals, conferences, 
                and cultural gatherings with ease.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full">QR Codes</span>
                <span className="text-xs bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full">Custom Design</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 p-8 rounded-2xl border border-neutral-700 hover:border-emerald-500/50 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center -rotate-3">
                  <Users className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="font-bold text-2xl text-white">Group Deals</h3>
              </div>
              <p className="text-neutral-400 leading-relaxed mb-4">
                Special pricing for groups, families, and corporate bookings. 
                Make events more accessible to everyone.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full">Bulk Discounts</span>
                <span className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full">Team Bookings</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 p-8 rounded-2xl border border-neutral-700 hover:border-orange-500/50 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center rotate-3">
                  <Clock className="w-8 h-8 text-orange-400" />
                </div>
                <h3 className="font-bold text-2xl text-white">Always Available</h3>
              </div>
              <p className="text-neutral-400 leading-relaxed mb-4">
                Our support team is here around the clock to help you with bookings, 
                refunds, and any questions you might have.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs bg-orange-500/10 text-orange-400 px-3 py-1 rounded-full">24/7 Support</span>
                <span className="text-xs bg-orange-500/10 text-orange-400 px-3 py-1 rounded-full">Live Chat</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 p-8 rounded-2xl border border-neutral-700 hover:border-purple-500/50 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center -rotate-3">
                  <Star className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="font-bold text-2xl text-white">Premium Tools</h3>
              </div>
              <p className="text-neutral-400 leading-relaxed mb-4">
                Advanced analytics, custom branding, and promotional tools to help 
                your events reach their full potential.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full">Analytics</span>
                <span className="text-xs bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full">Marketing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600 via-orange-600 to-red-600"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block mb-6">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-semibold">Join Our Community</span>
              </div>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Make
              <br />
              Something Happen?
            </h2>
            
            <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Thousands of creators, organizers, and communities trust us to bring their visions to life
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group bg-neutral-900 text-white hover:bg-neutral-800 font-bold px-10 py-5 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-2xl hover:shadow-neutral-900/50">
                <Ticket className="w-6 h-6" />
                Create Your Event
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-bold px-10 py-5 rounded-xl flex items-center justify-center gap-3 transition-all duration-300">
                Browse Events
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer accent */}
      <div className="h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500"></div>
    </div>
  );
}