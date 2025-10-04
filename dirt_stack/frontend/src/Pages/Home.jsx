import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "@inertiajs/react";
import { createPageUrl } from "@/utils";
import { Ticket, Clock, Shield, Star, ArrowRight, Users } from "lucide-react";

export default function Home() {

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-6 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="bg-blue-100 text-blue-800 font-semibold mb-4 px-4 py-2">
                <Ticket className="w-4 h-4 mr-2" />
                Professional Ticketing Services
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-blue-900 mb-6 leading-tight">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  TicketPro
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Streamline your event management with our comprehensive ticketing platform. 
                From small gatherings to large-scale events, we've got you covered.
              </p>
            </motion.div>
          </div>



          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid md:grid-cols-3 gap-6 mb-16"
          >
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg text-blue-800 mb-2">Real-time Booking</h3>
              <p className="text-gray-600">Instant ticket booking with live availability updates</p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-lg text-blue-800 mb-2">Secure Payments</h3>
              <p className="text-gray-600">Bank-grade security for all transactions and data</p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg text-blue-800 mb-2">Event Management</h3>
              <p className="text-gray-600">Complete tools for organizers and attendees</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-6 py-12 bg-white/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to create, manage, and attend amazing events
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <Ticket className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Event Tickets</h3>
              <p className="text-gray-600 text-sm">Create and sell tickets for any type of event</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <Users className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Group Bookings</h3>
              <p className="text-gray-600 text-sm">Special rates for bulk ticket purchases</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <Clock className="w-8 h-8 text-orange-600 mb-4" />
              <h3 className="font-semibold text-lg mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">Round-the-clock customer assistance</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <Star className="w-8 h-8 text-yellow-600 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Premium Features</h3>
              <p className="text-gray-600 text-sm">Advanced analytics and customization</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              Join thousands of event organizers who trust our platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-800 hover:bg-blue-50 font-bold px-8 py-4 rounded-xl">
                <Ticket className="w-5 h-5 mr-2" />
                Create Event
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-800 font-bold px-8 py-4 rounded-xl">
                Browse Events
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}