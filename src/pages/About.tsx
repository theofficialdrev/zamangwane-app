import { 
  Target, 
  Eye, 
  Heart, 
  Users, 
  Award, 
  Globe,
  ArrowRight,
  TrendingUp,
  BookOpen,
  HandHeart,
  Lightbulb,
  MapPin,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const values = [
  {
    icon: Heart,
    title: 'Compassion',
    description: 'We care deeply about the communities we serve and approach our work with empathy and understanding.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We believe in the power of working together with communities, partners, and stakeholders.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We strive for excellence in everything we do, delivering high-quality programs and services.',
  },
  {
    icon: Globe,
    title: 'Impact',
    description: 'We focus on creating measurable, sustainable impact that transforms lives and communities.',
  },
];

const programs = [
  {
    icon: BookOpen,
    title: 'Skills Training',
    value: '50+',
    description: 'Vocational courses offered',
    color: 'bg-blue-500'
  },
  {
    icon: Users,
    title: 'Youth Development',
    value: '5,000+',
    description: 'Young people empowered annually',
    color: 'bg-green-500'
  },
  {
    icon: HandHeart,
    title: 'Community Support',
    value: '120+',
    description: 'Communities actively supported',
    color: 'bg-purple-500'
  },
  {
    icon: Lightbulb,
    title: 'Innovation Hub',
    value: '25+',
    description: 'Entrepreneurship programs',
    color: 'bg-orange-500'
  }
];

const provinces = [
  { name: 'Gauteng', schools: 45, learners: 12500 },
  { name: 'KwaZulu-Natal', schools: 38, learners: 9800 },
  { name: 'Western Cape', schools: 32, learners: 8500 },
  { name: 'Eastern Cape', schools: 28, learners: 7200 },
  { name: 'Limpopo', schools: 25, learners: 6500 },
  { name: 'Mpumalanga', schools: 22, learners: 5800 },
];

const milestones = [
  { year: '2021', title: 'Foundation Established', description: 'Zamangwane Foundation was founded with a vision to empower South African communities.', icon: Lightbulb },
  { year: '2022', title: 'First Programs Launched', description: 'Launched our first skills development programs reaching 500 learners across 3 provinces.', icon: BookOpen },
  { year: '2023', title: 'National Expansion', description: 'Expanded our programs to all 9 provinces of South Africa, reaching 5,000+ learners.', icon: MapPin },
  { year: '2024', title: 'Digital Platform Launch', description: 'Launched our digital platform to reach even more communities and track impact.', icon: TrendingUp },
  { year: '2025', title: 'Future Vision', description: 'Aiming to reach 20,000 learners and establish 200+ school partnerships.', icon: Target },
];

const impactStats = [
  { label: 'Schools Partnered', value: '200+', icon: BookOpen, color: 'from-blue-500 to-blue-600' },
  { label: 'Learners Trained', value: '15,000+', icon: Users, color: 'from-green-500 to-green-600' },
  { label: 'Skills Courses', value: '50+', icon: Award, color: 'from-purple-500 to-purple-600' },
  { label: 'Communities Reached', value: '120+', icon: Globe, color: 'from-orange-500 to-orange-600' },
];

export function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-zamangwane-background via-white to-zamangwane-background overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-20 w-96 h-96 bg-zamangwane-orange/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-zamangwane-orange/5 rounded-full blur-3xl" />
        </div>
        
        <div className="relative w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-zamangwane-orange/10 text-zamangwane-orange text-sm font-medium rounded-full mb-6">
                <Award className="h-4 w-4" />
                About Us
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold text-zamangwane-text mb-6 leading-tight">
                Empowering South African{' '}
                <span className="text-zamangwane-orange">Communities</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Zamangwane Foundation is a non-profit organization dedicated to skills development, 
                youth empowerment, and community upliftment across all 9 provinces of South Africa.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/register">
                  <Button 
                    size="lg" 
                    className="rounded-full bg-zamangwane-orange hover:bg-zamangwane-orange/90 text-white px-8 btn-hover"
                  >
                    Join Our Mission
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="rounded-full border-2 border-zamangwane-text text-zamangwane-text hover:bg-zamangwane-text hover:text-white px-8"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-8">
                  <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-card img-zoom">
                    <img 
                      src="/images/pexels-b-aristotle-guweh-jr-1643208950-28638752.jpg" 
                      alt="South African students"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="aspect-square rounded-3xl overflow-hidden shadow-card img-zoom">
                    <img 
                      src="/images/pexels-tosin-olowoleni-2148141635-34162709.jpg" 
                      alt="Students learning"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-card img-zoom">
                    <img 
                      src="/images/pexels-tosin-olowoleni-2148141635-34162711.jpg" 
                      alt="Youth development"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats Infographic */}
      <section className="py-16 bg-zamangwane-orange">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center text-white animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <p className="text-4xl lg:text-5xl font-bold mb-2">{stat.value}</p>
                <p className="text-white/80 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Mission */}
            <Card className="border-0 shadow-soft rounded-3xl overflow-hidden group hover:shadow-hover transition-all duration-500">
              <CardContent className="p-8 lg:p-12">
                <div className="w-20 h-20 bg-gradient-to-br from-zamangwane-orange to-orange-400 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-zamangwane-text mb-4">
                  Our Mission
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  To empower individuals and communities through accessible skills development, 
                  youth programs, and sustainable initiatives that create lasting positive change 
                  and economic opportunities across South Africa.
                </p>
                <ul className="space-y-3">
                  {['Provide quality education', 'Create employment opportunities', 'Foster community growth'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-600">
                      <CheckCircle2 className="h-5 w-5 text-zamangwane-orange flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="border-0 shadow-soft rounded-3xl overflow-hidden group hover:shadow-hover transition-all duration-500">
              <CardContent className="p-8 lg:p-12">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-400 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Eye className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-zamangwane-text mb-4">
                  Our Vision
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  A South Africa where every individual has access to quality skills training, 
                  youth empowerment opportunities, and community support systems that enable 
                  them to reach their full potential and contribute to nation-building.
                </p>
                <ul className="space-y-3">
                  {['Skilled workforce', 'Economic empowerment', 'Sustainable development'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-600">
                      <CheckCircle2 className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Programs Overview Infographic */}
      <section className="py-20 lg:py-28 bg-zamangwane-background">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-zamangwane-orange/10 text-zamangwane-orange text-sm font-medium rounded-full mb-4">
              <TrendingUp className="h-4 w-4" />
              Our Programs
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-zamangwane-text mb-6">
              What We Do
            </h2>
            <p className="text-gray-600 text-lg">
              Comprehensive programs designed to empower individuals and transform communities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program, index) => (
              <Card 
                key={index} 
                className="border-0 shadow-soft hover:shadow-hover transition-all duration-500 rounded-3xl overflow-hidden group card-hover"
              >
                <CardContent className="p-8 text-center">
                  <div className={`w-20 h-20 ${program.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <program.icon className="h-10 w-10 text-white" />
                  </div>
                  <p className="text-4xl font-bold text-zamangwane-text mb-2">{program.value}</p>
                  <h3 className="text-lg font-semibold text-zamangwane-text mb-2">
                    {program.title}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {program.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Provincial Reach Infographic */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-zamangwane-orange/10 text-zamangwane-orange text-sm font-medium rounded-full mb-4">
                <MapPin className="h-4 w-4" />
                Our Reach
              </span>
              <h2 className="text-3xl lg:text-5xl font-bold text-zamangwane-text mb-6">
                Making an Impact Across South Africa
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Our programs have reached learners and communities across all 9 provinces of South Africa. 
                Here are some of our key impact areas:
              </p>
              
              <div className="space-y-4">
                {provinces.map((province, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-zamangwane-orange/5 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-zamangwane-orange/10 rounded-xl flex items-center justify-center">
                        <span className="font-bold text-zamangwane-orange">{province.name.charAt(0)}</span>
                      </div>
                      <span className="font-medium text-zamangwane-text">{province.name}</span>
                    </div>
                    <div className="flex gap-6 text-sm">
                      <span className="text-gray-500">{province.schools} schools</span>
                      <span className="text-zamangwane-orange font-medium">{province.learners.toLocaleString()} learners</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-card">
                <img 
                  src="/images/pexels-lalgecain-2406271.jpg" 
                  alt="South African education"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-card p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-zamangwane-orange rounded-xl flex items-center justify-center">
                    <Globe className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-zamangwane-text">9/9</p>
                    <p className="text-sm text-gray-500">Provinces Covered</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-zamangwane-background">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-zamangwane-orange/10 text-zamangwane-orange text-sm font-medium rounded-full mb-4">
              <Heart className="h-4 w-4" />
              Our Values
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-zamangwane-text mb-6">
              What We Stand For
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card 
                key={index} 
                className="border-0 shadow-soft hover:shadow-hover transition-all duration-500 rounded-3xl group card-hover"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-zamangwane-orange to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-zamangwane-text mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-zamangwane-orange/10 text-zamangwane-orange text-sm font-medium rounded-full mb-4">
              <Calendar className="h-4 w-4" />
              Our Journey
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-zamangwane-text mb-6">
              Milestones
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className="flex flex-col md:flex-row gap-6 md:gap-12 items-start group"
                >
                  <div className="flex-shrink-0 w-24">
                    <span className="text-2xl font-bold text-zamangwane-orange bg-zamangwane-orange/10 px-4 py-2 rounded-xl">
                      {milestone.year}
                    </span>
                  </div>
                  <div className="flex-1 pb-8 border-l-2 border-zamangwane-orange/20 pl-8 relative">
                    <div className="absolute -left-[11px] top-0 w-5 h-5 bg-zamangwane-orange rounded-full border-4 border-white shadow-md group-hover:scale-125 transition-transform" />
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-zamangwane-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <milestone.icon className="h-6 w-6 text-zamangwane-orange" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-zamangwane-text mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-600">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-zamangwane-background">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="relative bg-zamangwane-text rounded-[3rem] overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-96 h-96 bg-zamangwane-orange rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-zamangwane-orange rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="relative grid lg:grid-cols-2 gap-12 items-center p-8 lg:p-16">
              <div className="text-white">
                <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                  Join Our Mission
                </h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  Whether you want to learn, teach, or support our programs, there's a place for you 
                  in the Zamangwane Foundation community. Together, we can build a brighter future.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/register">
                    <Button 
                      size="lg" 
                      className="rounded-full bg-zamangwane-orange hover:bg-zamangwane-orange/90 text-white px-8 btn-hover"
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="rounded-full border-2 border-[#121212] text-[#121212] hover:bg-[#121212] hover:text-white px-8"
                    >
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="hidden lg:block">
                <img 
                  src="/images/pexels-roman-odintsov-11025020.jpg" 
                  alt="Community coming together"
                  className="rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
