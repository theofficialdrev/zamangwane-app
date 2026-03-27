import { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  CheckCircle2,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    details: ['info@zamangwane.org', 'support@zamangwane.org'],
    href: 'mailto:info@zamangwane.org',
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+27 12 345 6789', '+27 82 123 4567'],
    href: 'tel:+27123456789',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    details: ['123 Main Street', 'Johannesburg, 2000', 'South Africa'],
    href: '#',
  },
  {
    icon: Clock,
    title: 'Office Hours',
    details: ['Monday - Friday: 8AM - 5PM', 'Saturday: 9AM - 1PM', 'Sunday: Closed'],
    href: '#',
  },
];

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
];

export function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success('Message sent successfully! We will get back to you soon.');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-zamangwane-background via-white to-zamangwane-background overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-12 left-12 w-40 h-52 rounded-2xl overflow-hidden shadow-lg opacity-60 hidden lg:block">
            <img 
              src="/mnt/okcomputer/upload/pexels-ana-kenk-2159501753-36467878.jpg" 
              alt="Community support" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-12 right-12 w-48 h-60 rounded-2xl overflow-hidden shadow-lg opacity-60 hidden lg:block">
            <img 
              src="/mnt/okcomputer/upload/pexels-uniqueerique-6346833.jpg" 
              alt="Team meeting" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="relative w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-zamangwane-orange/10 text-zamangwane-orange text-sm font-medium rounded-full mb-6">
              Contact Us
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold text-zamangwane-text mb-6">
              Get in{' '}
              <span className="text-zamangwane-orange">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions or want to learn more about our programs? 
              We'd love to hear from you. Reach out to us through any of the channels below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 -mt-16 relative z-10">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item, index) => (
              <Card 
                key={index} 
                className="border-0 shadow-card hover:shadow-lg transition-all duration-300 rounded-3xl"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-zamangwane-orange/10 rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-zamangwane-orange" />
                  </div>
                  <h3 className="font-bold text-zamangwane-text mb-2">{item.title}</h3>
                  <div className="space-y-1">
                    {item.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600 text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 lg:py-28">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Form */}
            <div>
              <span className="inline-block px-4 py-1 bg-zamangwane-orange/10 text-zamangwane-orange text-sm font-medium rounded-full mb-6">
                Send a Message
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-zamangwane-text mb-6">
                We'd Love to Hear From You
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      required
                      className="rounded-xl py-5"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      required
                      className="rounded-xl py-5"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="rounded-xl py-5"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone (Optional)</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+27 82 123 4567"
                      className="rounded-xl py-5"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                    className="rounded-xl py-5"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    required
                    rows={5}
                    className="rounded-xl resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-zamangwane-orange hover:bg-zamangwane-orange/90 text-white py-6"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-5 w-5" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </div>

            {/* Social & Quick Links */}
            <div className="space-y-8">
              {/* Social Links */}
              <div>
                <h3 className="font-bold text-zamangwane-text mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-zamangwane-orange hover:text-white transition-all duration-200"
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-zamangwane-text rounded-3xl p-8 text-white">
                <h3 className="font-bold text-xl mb-4">Quick Links</h3>
                <ul className="space-y-3">
                  {[
                    { label: 'Register as a Learner', href: '/register' },
                    { label: 'Become a Skills Provider', href: '/register' },
                    { label: 'Partner With Us', href: '/contact' },
                    { label: 'Shop Products', href: '/shop' },
                    { label: 'Upcoming Events', href: '/school-events' },
                  ].map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href}
                        className="flex items-center gap-2 text-gray-300 hover:text-zamangwane-orange transition-colors"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 bg-zamangwane-orange/10 text-zamangwane-orange text-sm font-medium rounded-full mb-4">
              FAQ
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-zamangwane-text mb-6">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: 'How do I register for a skills program?',
                a: 'You can register online through our website by creating an account and selecting the program you\'re interested in. You can also contact us directly for assistance.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept payments via PayFast, which supports credit/debit cards, EFT, and other popular payment methods in South Africa.',
              },
              {
                q: 'How can I become a skills provider?',
                a: 'To become a skills provider, you need to register on our platform and complete the provider application process. Our team will review your application and get in touch.',
              },
              {
                q: 'Do you offer corporate training programs?',
                a: 'Yes, we offer customized corporate training programs. Contact us to discuss your organization\'s specific needs and requirements.',
              },
              {
                q: 'How does the credit system work for events?',
                a: 'Credits are included with your event ticket and can be used to participate in various activities. Different activities require different amounts of credits.',
              },
            ].map((faq, index) => (
              <Card key={index} className="border-0 shadow-soft rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="font-bold text-zamangwane-text mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
