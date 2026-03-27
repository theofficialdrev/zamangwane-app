import { 
  GraduationCap, 
  Clock, 
  Users, 
  Star,
  CheckCircle2,
  ArrowRight,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const skillCategories = [
  { id: 'all', label: 'All Skills' },
  { id: 'business', label: 'Business' },
  { id: 'technology', label: 'Technology' },
  { id: 'creative', label: 'Creative' },
  { id: 'personal', label: 'Personal Development' },
];

const skillsData = [
  {
    id: '1',
    title: 'Financial Literacy',
    category: 'business',
    description: 'Learn essential financial skills including budgeting, saving, investing, and debt management.',
    duration: '8 weeks',
    level: 'Beginner',
    students: 450,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80',
    topics: ['Budgeting', 'Saving', 'Investing', 'Debt Management'],
  },
  {
    id: '2',
    title: 'Leadership Development',
    category: 'personal',
    description: 'Develop leadership qualities, team management skills, and effective communication.',
    duration: '12 weeks',
    level: 'Intermediate',
    students: 320,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80',
    topics: ['Team Building', 'Communication', 'Decision Making', 'Conflict Resolution'],
  },
  {
    id: '3',
    title: 'Digital Marketing',
    category: 'business',
    description: 'Master digital marketing strategies including social media, SEO, and content marketing.',
    duration: '10 weeks',
    level: 'Intermediate',
    students: 280,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
    topics: ['Social Media', 'SEO', 'Content Marketing', 'Analytics'],
  },
  {
    id: '4',
    title: 'Web Development Basics',
    category: 'technology',
    description: 'Learn the fundamentals of web development with HTML, CSS, and JavaScript.',
    duration: '16 weeks',
    level: 'Beginner',
    students: 520,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80',
    topics: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
  },
  {
    id: '5',
    title: 'Public Speaking',
    category: 'personal',
    description: 'Overcome stage fright and develop confident public speaking skills.',
    duration: '6 weeks',
    level: 'Beginner',
    students: 380,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80',
    topics: ['Speech Writing', 'Delivery', 'Body Language', 'Q&A Handling'],
  },
  {
    id: '6',
    title: 'Graphic Design',
    category: 'creative',
    description: 'Learn design principles and create stunning visuals using professional tools.',
    duration: '12 weeks',
    level: 'Intermediate',
    students: 240,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80',
    topics: ['Design Principles', 'Color Theory', 'Typography', 'Canva/Photoshop'],
  },
  {
    id: '7',
    title: 'Entrepreneurship',
    category: 'business',
    description: 'Learn how to start and grow a successful business from idea to execution.',
    duration: '16 weeks',
    level: 'Advanced',
    students: 190,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600&q=80',
    topics: ['Business Planning', 'Funding', 'Marketing', 'Operations'],
  },
  {
    id: '8',
    title: 'Data Analysis',
    category: 'technology',
    description: 'Learn to analyze data and make data-driven decisions using Excel and other tools.',
    duration: '10 weeks',
    level: 'Intermediate',
    students: 310,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    topics: ['Excel', 'Data Visualization', 'Statistics', 'Reporting'],
  },
];

export function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSkills = skillsData.filter(skill => {
    const matchesCategory = activeCategory === 'all' || skill.category === activeCategory;
    const matchesSearch = skill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-zamangwane-background via-white to-zamangwane-background overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-48 h-64 rounded-2xl overflow-hidden shadow-lg opacity-60 hidden lg:block">
            <img 
              src="/mnt/okcomputer/upload/pexels-andy-barbour-6684503.jpg" 
              alt="Skills training" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-10 right-10 w-56 h-72 rounded-2xl overflow-hidden shadow-lg opacity-60 hidden lg:block">
            <img 
              src="/mnt/okcomputer/upload/pexels-uniqueerique-6572781.jpg" 
              alt="Learning environment" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="relative w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-zamangwane-orange/10 text-zamangwane-orange text-sm font-medium rounded-full mb-6">
              Skills Development
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold text-zamangwane-text mb-6">
              Build Your{' '}
              <span className="text-zamangwane-orange">Skills</span>,{' '}
              Shape Your Future
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Access quality training programs designed to equip you with in-demand skills 
              for personal and professional growth.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 rounded-full border-2 border-gray-200 focus:border-zamangwane-orange text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-wrap justify-center gap-3">
            {skillCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-zamangwane-orange text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-zamangwane-orange/10 hover:text-zamangwane-orange'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="py-20 lg:py-28">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSkills.map((skill) => (
              <Card 
                key={skill.id} 
                className="border-0 shadow-soft hover:shadow-card transition-all duration-300 rounded-3xl overflow-hidden group"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={skill.image} 
                    alt={skill.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="rounded-full bg-zamangwane-orange/10 text-zamangwane-orange">
                      {skill.level}
                    </Badge>
                    <div className="flex items-center gap-1 text-yellow-500 text-sm">
                      <Star className="h-4 w-4 fill-current" />
                      <span>{skill.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-zamangwane-text mb-2">
                    {skill.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {skill.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {skill.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {skill.students}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {skill.topics.slice(0, 2).map((topic, idx) => (
                      <span 
                        key={idx}
                        className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                    {skill.topics.length > 2 && (
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                        +{skill.topics.length - 2}
                      </span>
                    )}
                  </div>

                  <Button 
                    className="w-full rounded-full bg-zamangwane-orange hover:bg-zamangwane-orange/90 text-white"
                  >
                    Enroll Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredSkills.length === 0 && (
            <div className="text-center py-16">
              <GraduationCap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No skills found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or category filter
              </p>
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 bg-zamangwane-orange/10 text-zamangwane-orange text-sm font-medium rounded-full mb-4">
              How It Works
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-zamangwane-text mb-6">
              Start Learning in 3 Easy Steps
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Choose a Skill',
                description: 'Browse our catalog and select a skill program that matches your goals.',
              },
              {
                step: '2',
                title: 'Enroll & Learn',
                description: 'Register for the program and start learning at your own pace.',
              },
              {
                step: '3',
                title: 'Get Certified',
                description: 'Complete the program and earn a certificate to showcase your skills.',
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-zamangwane-orange rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-zamangwane-text mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-28">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="inline-block px-4 py-1 bg-zamangwane-orange/10 text-zamangwane-orange text-sm font-medium rounded-full mb-6">
                Why Choose Us
              </span>
              <h2 className="text-3xl lg:text-5xl font-bold text-zamangwane-text mb-6">
                Benefits of Our Skills Programs
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Our programs are designed to provide you with practical skills that you can 
                immediately apply in your personal and professional life.
              </p>

              <div className="space-y-4">
                {[
                  'Expert instructors with real-world experience',
                  'Flexible learning schedules',
                  'Hands-on projects and assignments',
                  'Industry-recognized certificates',
                  'Career guidance and support',
                  'Access to a community of learners',
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-zamangwane-orange flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80" 
                alt="Skills training"
                className="rounded-3xl shadow-card"
              />
              <div className="absolute -bottom-6 -left-6 bg-zamangwane-orange text-white p-6 rounded-2xl shadow-lg">
                <p className="text-3xl font-bold">{skillsData.length}+</p>
                <p className="text-white/80">Skills Programs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-zamangwane-orange">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center text-white max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Ready to Start Learning?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Join thousands of learners who are already building their skills with us. 
              Registration is free and takes less than 2 minutes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register">
                <Button 
                  size="lg" 
                  className="rounded-full bg-white text-zamangwane-orange hover:bg-white/90 px-8"
                >
                  Register Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="rounded-full border-[#121212] text-[#121212] hover:bg-[#121212] hover:text-white px-8"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
