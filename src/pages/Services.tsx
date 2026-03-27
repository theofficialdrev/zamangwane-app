import { 
  GraduationCap, 
  Users, 
  Heart, 
  Calendar,
  TrendingUp,
  Compass,
  ArrowRight,
  CheckCircle2,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { servicesData } from '@/data/mockData';

const additionalServices = [
  {
    id: 'mentorship',
    title: 'Mentorship Program',
    description: 'One-on-one mentorship connecting experienced professionals with aspiring individuals.',
    features: [
      'Personalized guidance',
      'Career advice',
      'Networking opportunities',
      'Goal setting support',
    ],
  },
  {
    id: 'workshops',
    title: 'Corporate Workshops',
    description: 'Customized training programs for organizations and businesses.',
    features: [
      'Team building',
      'Leadership training',
      'Skills development',
      'On-site delivery',
    ],
  },
  {
    id: 'consulting',
    title: 'Community Consulting',
    description: 'Expert consulting services for community development projects.',
    features: [
      'Project planning',
      'Resource mobilization',
      'Impact assessment',
      'Sustainability planning',
    ],
  },
];

const processSteps = [
  {
    step: '1',
    title: 'Initial Consultation',
    description: 'We discuss your needs, goals, and how we can best support you.',
  },
  {
    step: '2',
    title: 'Customized Plan',
    description: 'We develop a tailored program or service plan to meet your specific requirements.',
  },
  {
    step: '3',
    title: 'Implementation',
    description: 'Our team delivers the program with professionalism and dedication.',
  },
  {
    step: '4',
    title: 'Evaluation',
    description: 'We assess outcomes and gather feedback for continuous improvement.',
  },
];

export function Services() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-zamangwane-background via-white to-zamangwane-background overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 left-16 w-44 h-56 rounded-2xl overflow-hidden shadow-lg opacity-60 hidden lg:block">
            <img 
              src="/mnt/okcomputer/upload/pexels-vincent-peters-1057881-5350023.jpg" 
              alt="Community service" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-16 right-16 w-52 h-64 rounded-2xl overflow-hidden shadow-lg opacity-60 hidden lg:block">
            <img 
              src="/mnt/okcomputer/upload/pexels-kata-5986580.jpg" 
              alt="Team collaboration" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="relative w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-zamangwane-orange/10 text-zamangwane-orange text-sm font-medium rounded-full mb-6">
              Our Services
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold text-zamangwane-text mb-6">
              Services That{' '}
              <span className="text-zamangwane-orange">Transform</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive programs and services designed to empower individuals, 
              strengthen communities, and create lasting positive change.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 lg:py-28">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 bg-zamangwane-orange/10 text-zamangwane-orange text-sm font-medium rounded-full mb-4">
              Core Services
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-zamangwane-text mb-6">
              What We Offer
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {servicesData.map((service) => (
              <Card 
                key={service.id} 
                className="group border-0 shadow-soft hover:shadow-card transition-all duration-300 rounded-3xl overflow-hidden"
              >
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-zamangwane-orange/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-zamangwane-orange transition-colors duration-300">
                    {service.icon === 'GraduationCap' && <GraduationCap className="h-7 w-7 text-zamangwane-orange group-hover:text-white transition-colors" />}
                    {service.icon === 'Users' && <Users className="h-7 w-7 text-zamangwane-orange group-hover:text-white transition-colors" />}
                    {service.icon === 'Heart' && <Heart className="h-7 w-7 text-zamangwane-orange group-hover:text-white transition-colors" />}
                    {service.icon === 'Calendar' && <Calendar className="h-7 w-7 text-zamangwane-orange group-hover:text-white transition-colors" />}
                    {service.icon === 'TrendingUp' && <TrendingUp className="h-7 w-7 text-zamangwane-orange group-hover:text-white transition-colors" />}
                    {service.icon === 'Compass' && <Compass className="h-7 w-7 text-zamangwane-orange group-hover:text-white transition-colors" />}
                  </div>
                  <h3 className="text-xl font-bold text-zamangwane-text mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>
                  <Link 
                    to="/contact" 
                    className="inline-flex items-center text-zamangwane-orange font-medium hover:gap-2 transition-all"
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 bg-zamangwane-orange/10 text-zamangwane-orange text-sm font-medium rounded-full mb-4">
              Additional Services
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-zamangwane-text mb-6">
              Specialized Programs
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {additionalServices.map((service) => (
              <Card 
                key={service.id} 
                className="border-0 shadow-soft hover:shadow-card transition-all duration-300 rounded-3xl"
              >
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-zamangwane-text mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="h-4 w-4 text-zamangwane-orange" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 lg:py-28">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 bg-zamangwane-orange/10 text-zamangwane-orange text-sm font-medium rounded-full mb-4">
              Our Process
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-zamangwane-text mb-6">
              How We Work
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-zamangwane-orange rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">{step.step}</span>
                </div>
                <h3 className="text-xl font-bold text-zamangwane-text mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-28 bg-zamangwane-text">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 bg-zamangwane-orange/20 text-zamangwane-orange text-sm font-medium rounded-full mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: 'The skills development program transformed our team. Highly recommended!',
                author: 'John Smith',
                role: 'HR Director, Tech Corp',
              },
              {
                quote: 'Professional, dedicated, and truly passionate about community development.',
                author: 'Sarah Johnson',
                role: 'Community Leader',
              },
              {
                quote: 'Their youth empowerment programs have made a real difference in our area.',
                author: 'Michael Brown',
                role: 'School Principal',
              },
            ].map((testimonial, index) => (
              <Card 
                key={index} 
                className="border-0 bg-white/5 rounded-3xl"
              >
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-white/90 mb-6">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <p className="font-semibold text-white">{testimonial.author}</p>
                    <p className="text-white/60 text-sm">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-zamangwane-orange">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center text-white max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Contact us today to discuss how we can help you or your organization 
              achieve your goals through our comprehensive services.
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
              <Link to="/register">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="rounded-full border-[#121212] text-[#121212] hover:bg-[#121212] hover:text-white px-8"
                >
                  Join Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
