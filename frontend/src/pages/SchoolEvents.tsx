import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock,
  ArrowRight,
  Search,
  Ticket,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockEvents } from '@/data/mockData';
import { TICKET_CONFIG } from '@/data/mockData';
import { formatDate, formatCurrency } from '@/lib/utils';

const regions = [
  { id: 'all', label: 'All Regions' },
  { id: 'Gauteng', label: 'Gauteng' },
  { id: 'Western Cape', label: 'Western Cape' },
  { id: 'KwaZulu-Natal', label: 'KwaZulu-Natal' },
  { id: 'Eastern Cape', label: 'Eastern Cape' },
  { id: 'Free State', label: 'Free State' },
];

export function SchoolEvents() {
  const [activeRegion, setActiveRegion] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = mockEvents.filter(event => {
    const matchesRegion = activeRegion === 'all' || event.region === activeRegion;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch && event.status === 'published';
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-zamangwane-background via-white to-zamangwane-background overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-14 left-14 w-44 h-56 rounded-2xl overflow-hidden shadow-lg opacity-60 hidden lg:block">
            <img 
              src="/mnt/okcomputer/upload/pexels-b-aristotle-guweh-jr-1643208950-36188072.jpg" 
              alt="School event" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-14 right-14 w-52 h-64 rounded-2xl overflow-hidden shadow-lg opacity-60 hidden lg:block">
            <img 
              src="/mnt/okcomputer/upload/pexels-zachary-vessels-26649727-6794181.jpg" 
              alt="Community gathering" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="relative w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-zamangwane-orange/10 text-zamangwane-orange text-sm font-medium rounded-full mb-6">
              School Events
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold text-zamangwane-text mb-6">
              Upcoming{' '}
              <span className="text-zamangwane-orange">Events</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Join our community events, workshops, and festivals. 
              Purchase tickets and be part of the experience.
            </p>

            {/* Search */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 rounded-full border-2 border-gray-200 focus:border-zamangwane-orange text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Region Filter */}
      <section className="py-6 bg-white border-b border-gray-100">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-wrap justify-center gap-2">
            {regions.map((region) => (
              <button
                key={region.id}
                onClick={() => setActiveRegion(region.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeRegion === region.id
                    ? 'bg-zamangwane-orange text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-zamangwane-orange/10 hover:text-zamangwane-orange'
                }`}
              >
                {region.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12 lg:py-20">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredEvents.map((event) => (
              <Card 
                key={event.id} 
                className="border-0 shadow-soft hover:shadow-card transition-all duration-300 rounded-3xl overflow-hidden group"
              >
                <div className="aspect-video overflow-hidden relative">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="rounded-full bg-zamangwane-orange text-white">
                      {event.region}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(event.date)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {new Date(event.date).toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-zamangwane-text mb-2 line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <MapPin className="h-4 w-4" />
                    {event.location}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-gray-500">
                      <Users className="h-4 w-4 inline mr-1" />
                      {event.currentAttendees} / {event.maxAttendees ?? 'Unlimited'}
                    </div>
                    {event.maxAttendees && (
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-sm text-green-600">
                          {event.maxAttendees - event.currentAttendees} spots left
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500">From</p>
                      <p className="text-lg font-bold text-zamangwane-orange">
                        {formatCurrency(TICKET_CONFIG.child.price)}
                      </p>
                    </div>
                    <Link to={`/school-events/${event.id}`}>
                      <Button 
                        className="rounded-full bg-zamangwane-orange hover:bg-zamangwane-orange/90 text-white"
                      >
                        <Ticket className="h-4 w-4 mr-2" />
                        Get Tickets
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-16">
              <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No events found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or region filter
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Ticket Types */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 bg-zamangwane-orange/10 text-zamangwane-orange text-sm font-medium rounded-full mb-4">
              Ticket Information
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-zamangwane-text mb-6">
              Ticket Types & Pricing
            </h2>
            <p className="text-gray-600 text-lg">
              Choose the ticket type that works best for you. All tickets include credits 
              that can be used for activities at the event.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {(Object.entries(TICKET_CONFIG) as [string, { price: number; credits: number; label: string }][]).map(([type, config]) => (
              <Card 
                key={type} 
                className={`border-0 shadow-soft rounded-3xl overflow-hidden ${
                  type === 'adult' ? 'ring-2 ring-zamangwane-orange' : ''
                }`}
              >
                <CardContent className="p-8 text-center">
                  {type === 'adult' && (
                    <Badge className="rounded-full bg-zamangwane-orange text-white mb-4">
                      Most Popular
                    </Badge>
                  )}
                  <h3 className="text-2xl font-bold text-zamangwane-text mb-2 capitalize">
                    {config.label}
                  </h3>
                  <div className="my-6">
                    <span className="text-4xl font-bold text-zamangwane-orange">
                      {formatCurrency(config.price)}
                    </span>
                  </div>
                  <div className="bg-zamangwane-orange/10 rounded-xl p-4 mb-6">
                    <p className="text-sm text-gray-600 mb-1">Includes</p>
                    <p className="text-2xl font-bold text-zamangwane-orange">
                      {config.credits} Credits
                    </p>
                  </div>
                  <ul className="text-left space-y-3 mb-6">
                    <li className="flex items-center gap-2 text-gray-600">
                      <Star className="h-4 w-4 text-zamangwane-orange" />
                      Event access
                    </li>
                    <li className="flex items-center gap-2 text-gray-600">
                      <Star className="h-4 w-4 text-zamangwane-orange" />
                      {config.credits} activity credits
                    </li>
                    <li className="flex items-center gap-2 text-gray-600">
                      <Star className="h-4 w-4 text-zamangwane-orange" />
                      Certificate of attendance
                    </li>
                  </ul>
                  <Button 
                    className={`w-full rounded-full ${
                      type === 'adult' 
                        ? 'bg-zamangwane-orange hover:bg-zamangwane-orange/90 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Select {config.label}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Credit Usage */}
      <section className="py-20 lg:py-28">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="inline-block px-4 py-1 bg-zamangwane-orange/10 text-zamangwane-orange text-sm font-medium rounded-full mb-6">
                How Credits Work
              </span>
              <h2 className="text-3xl lg:text-5xl font-bold text-zamangwane-text mb-6">
                Using Your Credits
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Credits included with your ticket can be used to participate in various 
                activities at our events. Here's how the credit system works:
              </p>

              <div className="space-y-4">
                {[
                  { activity: 'Sports Activities', credits: 16 },
                  { activity: 'Dance & Vocal', credits: 16 },
                  { activity: 'Music Programs', credits: 24 },
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl"
                  >
                    <span className="font-medium text-zamangwane-text">{item.activity}</span>
                    <Badge className="rounded-full bg-zamangwane-orange text-white">
                      {item.credits} Credits
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zamangwane-text rounded-3xl p-8 lg:p-12 text-white">
              <h3 className="text-2xl font-bold mb-6">Credit Benefits</h3>
              <div className="space-y-4">
                {[
                  'Use credits for any activity at the event',
                  'Credits are valid for the entire event duration',
                  'Unused credits can be rolled over to future events',
                  'Earn bonus credits through referrals',
                  'Track your credit usage in your dashboard',
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Star className="h-5 w-5 text-zamangwane-orange flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-zamangwane-orange">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center text-white max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Host an Event
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Are you a school or organization interested in hosting an event? 
              Partner with us to bring quality programs to your community.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button 
                  size="lg" 
                  className="rounded-full bg-white text-zamangwane-orange hover:bg-white/90 px-8"
                >
                  Get in Touch
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
