import { 
  Truck, 
  Phone, 
  Mail,
  CheckCircle2,
  ArrowRight,
  Package,
  Clock,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const distributorsData = [
  {
    id: '1',
    name: 'Johannesburg Distribution Center',
    location: 'Johannesburg, Gauteng',
    address: '123 Main Street, Johannesburg, 2000',
    phone: '+27 11 123 4567',
    email: 'jhb@zamangwane.org',
    coverage: ['Gauteng', 'North West', 'Limpopo'],
    rating: 4.8,
    deliveryTime: '1-2 days',
  },
  {
    id: '2',
    name: 'Cape Town Distribution Center',
    location: 'Cape Town, Western Cape',
    address: '456 Beach Road, Cape Town, 8000',
    phone: '+27 21 987 6543',
    email: 'cpt@zamangwane.org',
    coverage: ['Western Cape', 'Northern Cape'],
    rating: 4.9,
    deliveryTime: '1-3 days',
  },
  {
    id: '3',
    name: 'Durban Distribution Center',
    location: 'Durban, KwaZulu-Natal',
    address: '789 Marine Drive, Durban, 4000',
    phone: '+27 31 456 7890',
    email: 'dbn@zamangwane.org',
    coverage: ['KwaZulu-Natal', 'Mpumalanga'],
    rating: 4.7,
    deliveryTime: '1-2 days',
  },
  {
    id: '4',
    name: 'Port Elizabeth Distribution Center',
    location: 'Port Elizabeth, Eastern Cape',
    address: '321 Harbour Road, Port Elizabeth, 6000',
    phone: '+27 41 234 5678',
    email: 'pe@zamangwane.org',
    coverage: ['Eastern Cape', 'Free State'],
    rating: 4.6,
    deliveryTime: '2-3 days',
  },
];

const benefits = [
  {
    icon: Truck,
    title: 'Nationwide Coverage',
    description: 'Our distribution network covers all 9 provinces of South Africa.',
  },
  {
    icon: Clock,
    title: 'Fast Delivery',
    description: 'Most orders delivered within 1-3 business days.',
  },
  {
    icon: Package,
    title: 'Reliable Service',
    description: 'Track your orders and receive updates every step of the way.',
  },
  {
    icon: Star,
    title: 'Quality Guaranteed',
    description: 'All products carefully handled and delivered in perfect condition.',
  },
];

export function Distributors() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-zamangwane-background via-white to-zamangwane-background">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-zamangwane-orange/10 text-zamangwane-orange text-sm font-medium rounded-full mb-6">
              Distributors
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold text-zamangwane-text mb-6">
              Our Distribution{' '}
              <span className="text-zamangwane-orange">Network</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A nationwide network of distribution centers ensuring fast and reliable 
              delivery of products to communities across South Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-zamangwane-orange">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
            <div>
              <p className="text-4xl font-bold">4</p>
              <p className="text-white/80">Distribution Centers</p>
            </div>
            <div>
              <p className="text-4xl font-bold">9</p>
              <p className="text-white/80">Provinces Covered</p>
            </div>
            <div>
              <p className="text-4xl font-bold">1-3</p>
              <p className="text-white/80">Days Delivery</p>
            </div>
            <div>
              <p className="text-4xl font-bold">99%</p>
              <p className="text-white/80">Delivery Success</p>
            </div>
          </div>
        </div>
      </section>

      {/* Distribution Centers */}
      <section className="py-20 lg:py-28">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 bg-zamangwane-orange/10 text-zamangwane-orange text-sm font-medium rounded-full mb-4">
              Our Centers
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-zamangwane-text mb-6">
              Distribution Centers
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {distributorsData.map((center) => (
              <Card 
                key={center.id} 
                className="border-0 shadow-soft hover:shadow-card transition-all duration-300 rounded-3xl overflow-hidden"
              >
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-zamangwane-orange/10 rounded-2xl flex items-center justify-center">
                      <Truck className="h-7 w-7 text-zamangwane-orange" />
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{center.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-zamangwane-text mb-2">
                    {center.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {center.address}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4 text-zamangwane-orange" />
                      {center.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4 text-zamangwane-orange" />
                      {center.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4 text-zamangwane-orange" />
                      Delivery: {center.deliveryTime}
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm font-medium text-gray-700 mb-2">Coverage Areas:</p>
                    <div className="flex flex-wrap gap-2">
                      {center.coverage.map((area, idx) => (
                        <Badge 
                          key={idx} 
                          variant="secondary" 
                          className="rounded-full bg-zamangwane-orange/10 text-zamangwane-orange"
                        >
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    variant="outline"
                    className="w-full rounded-full border-zamangwane-orange text-zamangwane-orange hover:bg-zamangwane-orange hover:text-white"
                  >
                    Contact Center
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 bg-zamangwane-orange/10 text-zamangwane-orange text-sm font-medium rounded-full mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-zamangwane-text mb-6">
              Distribution Benefits
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card 
                key={index} 
                className="border-0 shadow-soft hover:shadow-card transition-all duration-300 rounded-3xl"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-zamangwane-orange/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <benefit.icon className="h-8 w-8 text-zamangwane-orange" />
                  </div>
                  <h3 className="text-xl font-bold text-zamangwane-text mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Distributor */}
      <section className="py-20 lg:py-28">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="inline-block px-4 py-1 bg-zamangwane-orange/10 text-zamangwane-orange text-sm font-medium rounded-full mb-6">
                Partnership Opportunity
              </span>
              <h2 className="text-3xl lg:text-5xl font-bold text-zamangwane-text mb-6">
                Become a Distributor
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Join our growing network of distributors and help us deliver quality 
                products and educational materials to communities across South Africa.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  'Exclusive territory rights',
                  'Competitive commission structure',
                  'Marketing and sales support',
                  'Training and resources',
                  'Growing product portfolio',
                  'Regular incentives and bonuses',
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-zamangwane-orange flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <Link to="/contact">
                <Button 
                  size="lg" 
                  className="rounded-full bg-zamangwane-orange hover:bg-zamangwane-orange/90 text-white px-8"
                >
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="bg-zamangwane-text rounded-3xl p-8 lg:p-12 text-white">
              <h3 className="text-2xl font-bold mb-6">Requirements</h3>
              <div className="space-y-4">
                {[
                  'Registered business entity',
                  'Storage facility (minimum 100 sqm)',
                  'Delivery vehicle(s)',
                  'Computer and internet access',
                  'Commitment to customer service',
                  'Passion for community development',
                ].map((requirement, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-zamangwane-orange flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{requirement}</span>
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
              Need Products Delivered?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Contact your nearest distribution center for fast and reliable delivery 
              of all Zamangwane Foundation products.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button 
                  size="lg" 
                  className="rounded-full bg-white text-zamangwane-orange hover:bg-white/90 px-8"
                >
                  Contact Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/shop">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="rounded-full border-[#121212] text-[#121212] hover:bg-[#121212] hover:text-white px-8"
                >
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
