// Home page component
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Users, 
  GraduationCap, 
  Heart, 
  TrendingUp,
  Calendar,
  ChevronRight,
  Star,
  Quote
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { statsData, servicesData, testimonialsData, mockEvents } from '@/data/mockData';
import { formatDate } from '@/lib/utils';

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-zamangwane-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-zamangwane-orange/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-zamangwane-orange/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-zamangwane-orange/10 rounded-full animate-slide-in-left">
              <Star className="h-4 w-4 text-zamangwane-orange" />
              <span className="text-sm font-medium text-zamangwane-orange">
                Empowering Communities Since 2021
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-zamangwane-text leading-tight">
              Building a Brighter{' '}
              <span className="text-zamangwane-orange">Future</span>{' '}
              Together
            </h1>
            
            <p className="text-lg text-gray-600 max-w-xl">
              Zamangwane Foundation is dedicated to skills development, youth empowerment, 
              and community upliftment through innovative programs and sustainable initiatives.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/register">
                <Button 
                  size="lg" 
                  className="rounded-full bg-zamangwane-orange hover:bg-zamangwane-orange/90 text-white px-8 py-6 font-semibold btn-hover"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="rounded-full border-2 border-zamangwane-text text-zamangwane-text hover:bg-zamangwane-text hover:text-white px-8 py-6 font-semibold transition-all"
                >
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div className="animate-slide-up stagger-1">
                <p className="text-3xl font-semibold text-zamangwane-orange">{statsData.totalLearners}+</p>
                <p className="text-sm text-gray-500">Learners Trained</p>
              </div>
              <div className="animate-slide-up stagger-2">
                <p className="text-3xl font-semibold text-zamangwane-orange">{statsData.totalEvents}+</p>
                <p className="text-sm text-gray-500">Events Hosted</p>
              </div>
              <div className="animate-slide-up stagger-3">
                <p className="text-3xl font-semibold text-zamangwane-orange">{statsData.communitiesReached}+</p>
                <p className="text-sm text-gray-500">Communities</p>
              </div>
            </div>
          </div>

          {/* Hero Image Grid */}
          <div className="relative hidden lg:grid grid-cols-3 gap-4 animate-slide-in-right">
            <div className="space-y-4 pt-8">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-card img-zoom">
                <img 
                  src="/images/pexels-katerina-holmes-5905440.jpg" 
                  alt="South African students learning"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-card img-zoom">
                <img 
                  src="/images/pexels-katerina-holmes-5905480.jpg" 
                  alt="Students in classroom"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-card bg-zamangwane-orange flex items-center justify-center animate-scale-in">
                <div className="text-center text-white p-6">
                  <p className="text-4xl font-semibold">{statsData.successRate}%</p>
                  <p className="text-sm opacity-90">Success Rate</p>
                </div>
              </div>
            </div>
            <div className="space-y-4 pt-12">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-card img-zoom">
                <img 
                  src="/images/pexels-tima-miroshnichenko-5428267.jpg" 
                  alt="Youth skills development"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Stats Section
function StatsSection() {
  const stats = [
    { value: statsData.yearsExperience, suffix: '+', label: 'Years of Experience', icon: Calendar },
    { value: statsData.totalLearners, suffix: '+', label: 'Learners Trained', icon: Users },
    { value: statsData.totalEvents, suffix: '+', label: 'Events Hosted', icon: TrendingUp },
    { value: statsData.communitiesReached, suffix: '+', label: 'Communities Reached', icon: Heart },
  ];

  return (
    <section className="py-16 bg-zamangwane-orange">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center text-white animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <stat.icon className="h-8 w-8 mx-auto mb-4 opacity-80" />
              <p className="text-4xl lg:text-5xl font-semibold mb-2">
                {stat.value}{stat.suffix}
              </p>
              <p className="text-white/80 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Services Section
function ServicesSection() {
  return (
    <section className="py-20 lg:py-28 bg-zamangwane-background">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-zamangwane-orange/10 text-zamangwane-orange text-sm font-medium rounded-full mb-4 animate-fade-in">
            Our Services
          </span>
          <h2 className="text-3xl lg:text-5xl font-semibold text-zamangwane-text mb-6 animate-fade-in-up">
            What We Offer
          </h2>
          <p className="text-gray-600 text-lg animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Comprehensive programs designed to empower individuals and transform communities
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {servicesData.map((service, index) => (
            <Card 
              key={service.id} 
              className="group border-0 shadow-soft hover:shadow-hover transition-all duration-500 rounded-3xl overflow-hidden card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-zamangwane-orange/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-zamangwane-orange transition-colors duration-300">
                  {service.icon === 'GraduationCap' && <GraduationCap className="h-7 w-7 text-zamangwane-orange group-hover:text-white transition-colors" />}
                  {service.icon === 'Users' && <Users className="h-7 w-7 text-zamangwane-orange group-hover:text-white transition-colors" />}
                  {service.icon === 'Heart' && <Heart className="h-7 w-7 text-zamangwane-orange group-hover:text-white transition-colors" />}
                  {service.icon === 'Calendar' && <Calendar className="h-7 w-7 text-zamangwane-orange group-hover:text-white transition-colors" />}
                  {service.icon === 'TrendingUp' && <TrendingUp className="h-7 w-7 text-zamangwane-orange group-hover:text-white transition-colors" />}
                  {service.icon === 'Compass' && <TrendingUp className="h-7 w-7 text-zamangwane-orange group-hover:text-white transition-colors" />}
                </div>
                <h3 className="text-xl font-semibold text-zamangwane-text mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                <Link 
                  to="/services" 
                  className="inline-flex items-center text-zamangwane-orange font-medium hover:gap-2 transition-all"
                >
                  Learn More
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Upcoming Events Section
function EventsSection() {
  const upcomingEvents = mockEvents.slice(0, 3);

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="inline-block px-4 py-1.5 bg-zamangwane-orange/10 text-zamangwane-orange text-sm font-medium rounded-full mb-4">
              Upcoming Events
            </span>
            <h2 className="text-3xl lg:text-5xl font-semibold text-zamangwane-text">
              Join Our Events
            </h2>
          </div>
          <Link to="/school-events">
            <Button 
              variant="outline" 
              className="rounded-full border-2 border-zamangwane-text text-zamangwane-text hover:bg-zamangwane-text hover:text-white font-semibold"
            >
              View All Events
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {upcomingEvents.map((event, index) => (
            <Card 
              key={event.id} 
              className="group border-0 shadow-soft hover:shadow-hover transition-all duration-500 rounded-3xl overflow-hidden card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="px-3 py-1 bg-zamangwane-orange/10 text-zamangwane-orange text-xs font-medium rounded-full">
                    {event.region}
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <Calendar className="h-4 w-4" />
                    {formatDate(event.date)}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-zamangwane-text mb-2 line-clamp-2">
                  {event.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {event.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <Users className="h-4 w-4 inline mr-1" />
                    {event.currentAttendees} / {event.maxAttendees} attending
                  </div>
                  <Link to={`/school-events/${event.id}`}>
                    <Button 
                      size="sm" 
                      className="rounded-full bg-zamangwane-orange hover:bg-zamangwane-orange/90 text-white font-medium"
                    >
                      Get Tickets
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 bg-zamangwane-background">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-zamangwane-orange/10 text-zamangwane-orange text-sm font-medium rounded-full mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl lg:text-5xl font-semibold text-zamangwane-text mb-6">
            What People Say
          </h2>
          <p className="text-gray-600 text-lg">
            Hear from our community members about their experiences with Zamangwane Foundation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonialsData.map((testimonial, index) => (
            <Card 
              key={testimonial.id} 
              className="border-0 shadow-soft rounded-3xl overflow-hidden bg-zamangwane-orange text-white card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-white/30 mb-4" />
                <p className="text-white/90 text-sm mb-6 line-clamp-4">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-white/70 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="py-20 lg:py-28 bg-zamangwane-background">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="relative bg-zamangwane-text rounded-[2.5rem] overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-zamangwane-orange rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-zamangwane-orange rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="relative grid lg:grid-cols-2 gap-12 items-center p-8 lg:p-16">
            <div className="text-white">
              <h2 className="text-3xl lg:text-5xl font-semibold mb-6">
                Ready to Make a Difference?
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Join our community of learners, skills providers, and event coordinators. 
                Together, we can create lasting positive change in our communities.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/register">
                  <Button 
                    size="lg" 
                    className="rounded-full bg-zamangwane-orange hover:bg-zamangwane-orange/90 text-white px-8 py-6 font-semibold btn-hover"
                  >
                    Join Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="rounded-full border-2 border-[#121212] text-[#121212] hover:bg-[#121212] hover:text-white px-8 py-6 font-semibold transition-all"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <img 
                src="/images/1181.jpg" 
                alt="South African school community"
                className="rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Home() {
  return (
    <div className="space-y-0">
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <EventsSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
