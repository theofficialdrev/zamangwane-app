import { 
  Ticket, 
  Calendar, 
  MapPin, 
  QrCode,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockEvents } from '@/data/mockData';
import { TICKET_CONFIG } from '@/data/mockData';
import { formatDate, formatCurrency } from '@/lib/utils';
import { toast } from 'sonner';

export function MyTickets() {
  const myTickets = [
    { eventId: '1', type: 'adult' as const, quantity: 2, purchaseDate: '2024-03-20', status: 'active' },
    { eventId: '3', type: 'vip' as const, quantity: 1, purchaseDate: '2024-03-18', status: 'active' },
  ];

  return (
    <div className="min-h-screen bg-zamangwane-background py-8">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-zamangwane-text mb-8">My Tickets</h1>

        <div className="space-y-6">
          {myTickets.map((ticket, index) => {
            const event = mockEvents.find(e => e.id === ticket.eventId);
            if (!event) return null;
            const ticketConfig = TICKET_CONFIG[ticket.type];

            return (
              <Card key={index} className="border-0 shadow-soft rounded-3xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-3">
                    {/* Event Image */}
                    <div className="aspect-video md:aspect-auto">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Ticket Details */}
                    <div className="p-6 md:col-span-2 flex flex-col md:flex-row justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className="rounded-full bg-zamangwane-orange text-white">
                            {ticketConfig.label}
                          </Badge>
                          <Badge variant="secondary" className="rounded-full">
                            {event.region}
                          </Badge>
                        </div>

                        <h3 className="text-xl font-bold text-zamangwane-text mb-2">
                          {event.title}
                        </h3>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="h-4 w-4" />
                            {formatDate(event.date)}
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="h-4 w-4" />
                            {event.location}
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Quantity</p>
                            <p className="font-semibold">{ticket.quantity}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Credits</p>
                            <p className="font-semibold">{ticketConfig.credits * ticket.quantity}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Total</p>
                            <p className="font-semibold text-zamangwane-orange">
                              {formatCurrency(ticketConfig.price * ticket.quantity)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* QR Code & Actions */}
                      <div className="mt-6 md:mt-0 md:ml-6 flex flex-col items-center">
                        <div className="w-32 h-32 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                          <QrCode className="h-20 w-20 text-gray-400" />
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="rounded-full"
                            onClick={() => toast.info('Ticket downloaded!')}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Save
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {myTickets.length === 0 && (
          <div className="text-center py-16">
            <Ticket className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No tickets yet
            </h3>
            <p className="text-gray-500 mb-6">
              Browse our upcoming events and get your tickets today!
            </p>
            <Button 
              className="rounded-full bg-zamangwane-orange hover:bg-zamangwane-orange/90 text-white"
              onClick={() => window.location.href = '/school-events'}
            >
              Browse Events
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
