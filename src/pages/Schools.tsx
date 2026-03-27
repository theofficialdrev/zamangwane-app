import { 
  MapPin, 
  Users, 
  BookOpen,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  Calendar,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const schoolsData = [
  {
    id: '1',
    name: 'Johannesburg Leadership Academy',
    location: 'Johannesburg, Gauteng',
    type: 'Leadership & Management',
    students: 850,
    programs: 12,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80',
    description: 'Specialized in developing future leaders through comprehensive leadership and management programs.',
    features: ['Leadership Training', 'Management Skills', 'Team Building', 'Communication'],
  },
  {
    id: '2',
    name: 'Cape Town Tech Institute',
    location: 'Cape Town, Western Cape',
    type: 'Technology & Digital Skills',
    students: 1200,
    programs: 18,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80',
    description: 'Leading technology education provider offering cutting-edge digital skills training.',
    features: ['Web Development', 'Data Science', 'Digital Marketing', 'Cybersecurity'],
  },
  {
    id: '3',
    name: 'Durban Creative Arts College',
    location: 'Durban, KwaZulu-Natal',
    type: 'Creative Arts & Design',
    students: 650,
    programs: 10,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80',
    description: 'Nurturing creative talent through comprehensive arts and design education.',
    features: ['Graphic Design', 'Photography', 'Video Production', 'Fine Arts'],
  },
  {
    id: '4',
    name: 'Pretoria Business School',
    location: 'Pretoria, Gauteng',
    type: 'Business & Entrepreneurship',
    students: 920,
    programs: 15,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80',
    description: 'Empowering entrepreneurs and business leaders with practical skills and knowledge.',
    features: ['Entrepreneurship', 'Business Management', 'Finance', 'Marketing'],
  },
  {
    id: '5',
    name: 'Port Elizabeth Skills Centre',
    location: 'Port Elizabeth, Eastern Cape',
    type: 'Vocational Training',
    students: 580,
    programs: 14,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80',
    description: 'Providing practical vocational training for in-demand trades and skills.',
    features: ['Carpentry', 'Electrical', 'Plumbing', 'Hospitality'],
  },
  {
    id: '6',
    name: 'Bloemfontein Agricultural College',
    location: 'Bloemfontein, Free State',
    type: 'Agriculture & Farming',
    students: 420,
    programs: 8,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80',
    description: 'Training the next generation of farmers and agricultural professionals.',
    features: ['Crop Production', 'Animal Husbandry', 'Agribusiness', 'Sustainable Farming'],
  },
];

const benefits = [
  {
    icon: GraduationCap,
    title: 'Quality Education',
    description: 'Access to accredited programs and experienced instructors.',
  },
  {
    icon: Users,
    title: 'Community Learning',
    description: 'Learn alongside peers and build valuable networks.',
  },
  {
    icon: BookOpen,
    title: 'Practical Skills',
    description: 'Hands-on training that prepares you for real-world challenges.',
  },
  {
    icon: Calendar,
    title: 'Flexible Scheduling',
    description: 'Programs designed to fit your schedule and lifestyle.',
  },
];

export function Schools() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-zamangwane-background via-white to-zamangwane-background">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-zamangwane-orange/10 text-zamangwane-orange text-sm font-medium rounded-full mb-6">
              Partner Schools
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold text-zamangwane-text mb-6">
              Our Network of{' '}
              <span className="text-zamangwane-orange">Partner Schools</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Collaborating with leading educational institutions across South Africa 
              to bring quality skills training to every community.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-zamangwane-orange">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
            <div>
              <p className="text-4xl font-bold">{schoolsData.length}+</p>
              <p className="text-white/80">Partner Schools</p>
            </div>
            <div>
              <p className="text-4xl font-bold">4,600+</p>
              <p className="text-white/80">Total Students</p>
            </div>
            <div>
              <p className="text-4xl font-bold">77+</p>
              <p className="text-white/80">Programs Offered</p>
            </div>
            <div>
              <p className="text-4xl font-bold">9</p>
              <p className="text-white/80">Provinces Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Schools Grid */}
      <section className="py-20 lg:py-28">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {schoolsData.map((school) => (
              <Card 
                key={school.id} 
                className="border-0 shadow-soft hover:shadow-card transition-all duration-300 rounded-3xl overflow-hidden group"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={school.image} 
                    alt={school.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="rounded-full bg-zamangwane-orange/10 text-zamangwane-orange">
                      {school.type}
                    </Badge>
                    <div className="flex items-center gap-1 text-yellow-500 text-sm">
                      <Star className="h-4 w-4 fill-current" />
                      <span>{school.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-zamangwane-text mb-2">
                    {school.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {school.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {school.location.split(',')[0]}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {school.students} students
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {school.features.slice(0, 2).map((feature, idx) => (
                      <span 
                        key={idx}
                        className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                    {school.features.length > 2 && (
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                        +{school.features.length - 2}
                      </span>
                    )}
                  </div>

                  <Button 
                    className="w-full rounded-full bg-zamangwane-orange hover:bg-zamangwane-orange/90 text-white"
                  >
                    View Programs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 bg-zamangwane-orange/10 text-zamangwane-orange text-sm font-medium rounded-full mb-4">
              Why Partner With Us
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-zamangwane-text mb-6">
              Benefits for Schools
            </h2>
            <p className="text-gray-600 text-lg">
              Partnering with Zamangwane Foundation brings numerous benefits to educational institutions
            </p>
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

      {/* Partnership Process */}
      <section className="py-20 lg:py-28">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="inline-block px-4 py-1 bg-zamangwane-orange/10 text-zamangwane-orange text-sm font-medium rounded-full mb-6">
                Become a Partner
              </span>
              <h2 className="text-3xl lg:text-5xl font-bold text-zamangwane-text mb-6">
                How to Partner With Us
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Join our network of partner schools and help us bring quality education 
                to communities across South Africa.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: 'Submit Application',
                    description: 'Fill out our partner school application form with your institution details.',
                  },
                  {
                    title: 'Review Process',
                    description: 'Our team will review your application and assess alignment with our mission.',
                  },
                  {
                    title: 'Partnership Agreement',
                    description: 'Once approved, we\'ll sign a partnership agreement outlining roles and responsibilities.',
                  },
                  {
                    title: 'Program Launch',
                    description: 'Start offering programs and making an impact in your community.',
                  },
                ].map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-zamangwane-orange rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-zamangwane-text mb-1">{step.title}</h3>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80" 
                alt="Partnership"
                className="rounded-3xl shadow-card"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 bg-zamangwane-orange/10 text-zamangwane-orange text-sm font-medium rounded-full mb-4">
                Requirements
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-zamangwane-text mb-6">
                Partner School Requirements
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Registered educational institution',
                'Minimum 2 years of operation',
                'Qualified instructors and staff',
                'Adequate facilities and equipment',
                'Commitment to quality education',
                'Alignment with our mission and values',
              ].map((requirement, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                  <CheckCircle2 className="h-5 w-5 text-zamangwane-orange flex-shrink-0" />
                  <span className="text-gray-700">{requirement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-zamangwane-orange">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center text-white max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Become a Partner School
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Join our network of educational institutions and help us bring 
              quality skills training to communities across South Africa.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button 
                  size="lg" 
                  className="rounded-full bg-white text-zamangwane-orange hover:bg-white/90 px-8"
                >
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="rounded-full border-[#121212] text-[#121212] hover:bg-[#121212] hover:text-white px-8"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
