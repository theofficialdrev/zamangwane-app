import { 
  Trophy, 
  Star, 
  Calendar,
  Users,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const awardCategories = [
  {
    id: '1',
    title: 'Outstanding Learner of the Year',
    description: 'Recognizing exceptional academic performance and dedication to learning.',
    icon: Trophy,
    prize: 'R5,000 + Certificate',
    criteria: ['Academic Excellence', 'Attendance', 'Participation'],
  },
  {
    id: '2',
    title: 'Most Improved Learner',
    description: 'Celebrating remarkable progress and growth throughout the year.',
    icon: TrendingUp,
    prize: 'R3,000 + Certificate',
    criteria: ['Progress Tracking', 'Skill Development', 'Effort'],
  },
  {
    id: '3',
    title: 'Community Champion',
    description: 'Honoring learners who make significant contributions to their communities.',
    icon: Heart,
    prize: 'R4,000 + Certificate',
    criteria: ['Community Service', 'Leadership', 'Impact'],
  },
  {
    id: '4',
    title: 'Innovation Award',
    description: 'Recognizing creative solutions and innovative thinking.',
    icon: Lightbulb,
    prize: 'R3,500 + Certificate',
    criteria: ['Creativity', 'Problem Solving', 'Implementation'],
  },
  {
    id: '5',
    title: 'Leadership Excellence',
    description: 'Celebrating outstanding leadership qualities and team management.',
    icon: Users,
    prize: 'R4,500 + Certificate',
    criteria: ['Leadership', 'Teamwork', 'Communication'],
  },
  {
    id: '6',
    title: 'Skills Mastery',
    description: 'Honoring learners who have mastered their chosen skills.',
    icon: Star,
    prize: 'R3,000 + Certificate',
    criteria: ['Skill Proficiency', 'Portfolio', 'Application'],
  },
];

const pastWinners = [
  {
    name: 'Thabo Mokoena',
    award: 'Outstanding Learner of the Year',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    quote: 'This award motivates me to continue learning and growing.',
  },
  {
    name: 'Sarah Ndlovu',
    award: 'Community Champion',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    quote: 'Giving back to my community has been the most rewarding experience.',
  },
  {
    name: 'Michael Zulu',
    award: 'Innovation Award',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    quote: 'Innovation is about finding creative solutions to real problems.',
  },
];

import { TrendingUp, Heart, Lightbulb } from 'lucide-react';

export function LearnersAwards() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-zamangwane-background via-white to-zamangwane-background">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-zamangwane-orange/10 text-zamangwane-orange text-sm font-medium rounded-full mb-6">
              Learners Awards
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold text-zamangwane-text mb-6">
              Celebrating{' '}
              <span className="text-zamangwane-orange">Excellence</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Recognizing and rewarding outstanding learners who demonstrate exceptional 
              commitment, growth, and impact in their communities.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-zamangwane-orange">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
            <div>
              <p className="text-4xl font-bold">6</p>
              <p className="text-white/80">Award Categories</p>
            </div>
            <div>
              <p className="text-4xl font-bold">R23,000</p>
              <p className="text-white/80">Total Prize Money</p>
            </div>
            <div>
              <p className="text-4xl font-bold">50+</p>
              <p className="text-white/80">Past Winners</p>
            </div>
            <div>
              <p className="text-4xl font-bold">3</p>
              <p className="text-white/80">Years Running</p>
            </div>
          </div>
        </div>
      </section>

      {/* Award Categories */}
      <section className="py-20 lg:py-28">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 bg-zamangwane-orange/10 text-zamangwane-orange text-sm font-medium rounded-full mb-4">
              Award Categories
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-zamangwane-text mb-6">
              Categories & Prizes
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {awardCategories.map((award) => (
              <Card 
                key={award.id} 
                className="border-0 shadow-soft hover:shadow-card transition-all duration-300 rounded-3xl overflow-hidden"
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-zamangwane-orange/10 rounded-2xl flex items-center justify-center mb-6">
                    <award.icon className="h-8 w-8 text-zamangwane-orange" />
                  </div>
                  <h3 className="text-xl font-bold text-zamangwane-text mb-3">
                    {award.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {award.description}
                  </p>
                  <div className="bg-zamangwane-orange/10 rounded-xl p-4 mb-4">
                    <p className="text-sm text-gray-600 mb-1">Prize</p>
                    <p className="text-lg font-bold text-zamangwane-orange">
                      {award.prize}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Criteria:</p>
                    <div className="flex flex-wrap gap-2">
                      {award.criteria.map((criterion, idx) => (
                        <Badge 
                          key={idx} 
                          variant="secondary" 
                          className="rounded-full bg-gray-100 text-gray-600"
                        >
                          {criterion}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Past Winners */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 bg-zamangwane-orange/10 text-zamangwane-orange text-sm font-medium rounded-full mb-4">
              Hall of Fame
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-zamangwane-text mb-6">
              Past Winners
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pastWinners.map((winner, index) => (
              <Card 
                key={index} 
                className="border-0 shadow-soft rounded-3xl overflow-hidden text-center"
              >
                <CardContent className="p-8">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden">
                    <img 
                      src={winner.image} 
                      alt={winner.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Trophy className="h-8 w-8 text-zamangwane-orange mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-zamangwane-text mb-1">
                    {winner.name}
                  </h3>
                  <p className="text-zamangwane-orange font-medium mb-2">
                    {winner.award}
                  </p>
                  <p className="text-gray-500 text-sm mb-4">{winner.year}</p>
                  <p className="text-gray-600 italic">
                    "{winner.quote}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How to Nominate */}
      <section className="py-20 lg:py-28">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="inline-block px-4 py-1 bg-zamangwane-orange/10 text-zamangwane-orange text-sm font-medium rounded-full mb-6">
                Nomination Process
              </span>
              <h2 className="text-3xl lg:text-5xl font-bold text-zamangwane-text mb-6">
                How to Nominate
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Nominations are open to all learners, instructors, and community members. 
                Follow these simple steps to nominate an outstanding learner.
              </p>

              <div className="space-y-6">
                {[
                  {
                    step: '1',
                    title: 'Review Categories',
                    description: 'Read through the award categories and criteria carefully.',
                  },
                  {
                    step: '2',
                    title: 'Prepare Nomination',
                    description: 'Gather information about the nominee\'s achievements and impact.',
                  },
                  {
                    step: '3',
                    title: 'Submit Online',
                    description: 'Fill out the online nomination form with all required details.',
                  },
                  {
                    step: '4',
                    title: 'Await Results',
                    description: 'The selection committee will review all nominations and announce winners.',
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-zamangwane-orange rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{item.step}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-zamangwane-text mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zamangwane-text rounded-3xl p-8 lg:p-12 text-white">
              <h3 className="text-2xl font-bold mb-6">Important Dates</h3>
              <div className="space-y-4">
                {[
                  { date: '1 March 2024', event: 'Nominations Open' },
                  { date: '30 April 2024', event: 'Nominations Close' },
                  { date: '1-15 May 2024', event: 'Review Period' },
                  { date: '1 June 2024', event: 'Winners Announced' },
                  { date: '15 June 2024', event: 'Awards Ceremony' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 pb-4 border-b border-gray-700 last:border-0">
                    <Calendar className="h-5 w-5 text-zamangwane-orange flex-shrink-0" />
                    <div>
                      <p className="font-medium">{item.event}</p>
                      <p className="text-gray-400 text-sm">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 bg-zamangwane-orange/10 text-zamangwane-orange text-sm font-medium rounded-full mb-4">
                Eligibility
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-zamangwane-text mb-6">
                Who Can Be Nominated?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Active learner in Zamangwane Foundation programs',
                'Minimum 6 months participation',
                'Demonstrated commitment to learning',
                'Positive attitude and behavior',
                'Contributions to community (for relevant categories)',
                'Achievements in the past 12 months',
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

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-zamangwane-orange">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center text-white max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Ready to Nominate?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Help us recognize outstanding learners who are making a difference. 
              Nominations are now open for the 2024 Awards.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="rounded-full bg-white text-zamangwane-orange hover:bg-white/90 px-8"
              >
                Submit Nomination
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
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
