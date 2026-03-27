import { useParams } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock,
  Ticket,
  ArrowLeft,
  Share2,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockEvents } from '@/data/mockData';
import { TICKET_CONFIG } from '@/data/mockData';
import { formatDate, formatCurrency } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export function EventDetails() {
  const { id } = useParams();
  const event = mockEvents.find(e => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zamangwane-text mb-4">Event Not Found</h1>
          <Link to="/school-events">
            <Button className="rounded-full bg-zamangwane-orange text-white">
              Back to Events
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zamangwane-background">
      {/* Hero Image */}
      <div className="relative h-96">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
            <Link to="/school-events">
              <Button variant="ghost" className="text-white mb-4 hover:text-white/80">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Events
              </Button>
            </Link>
            <Badge className="rounded-full bg-zamangwane-orange text-white mb-4">
              {event.region}
            </Badge>
            <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">
              {event.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-white/80">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {formatDate(event.date)}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                {new Date(event.date).toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {event.location}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-0 shadow-soft rounded-3xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-zamangwane-text mb-4">About This Event</h2>
                <p className="text-gray-600 leading-relaxed">{event.description}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft rounded-3xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-zamangwane-text mb-4">Location</h2>
                <div className="aspect-video bg-gray-100 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-zamangwane-orange mx-auto mb-2" />
                    <p className="text-gray-600">{event.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            <Card className="border-0 shadow-soft rounded-3xl sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Tickets from</p>
                    <p className="text-3xl font-bold text-zamangwane-orange">
                      {formatCurrency(TICKET_CONFIG.child.price)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => toast.info('Event shared!')}
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                    >
                      <Share2 className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => toast.info('Added to favorites!')}
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                    >
                      <Heart className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-gray-500" />
                      <span className="text-gray-600">Attendees</span>
                    </div>
                    <span className="font-medium">{event.currentAttendees} / {event.maxAttendees ?? 'Unlimited'}</span>
                  </div>
                  {event.maxAttendees && (
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Ticket className="h-5 w-5 text-gray-500" />
                        <span className="text-gray-600">Spots Left</span>
                      </div>
                      <span className="font-medium text-green-600">{event.maxAttendees - event.currentAttendees}</span>
                    </div>
                  )}
                </div>

                <Button 
                  className="w-full rounded-full bg-zamangwane-orange hover:bg-zamangwane-orange/90 text-white py-6"
                  onClick={() => toast.info('Ticket selection coming soon!')}
                >
                  <Ticket className="h-5 w-5 mr-2" />
                  Get Tickets
                </Button>

                <p className="text-center text-sm text-gray-500 mt-4">
                  Secure checkout with PayFast
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
