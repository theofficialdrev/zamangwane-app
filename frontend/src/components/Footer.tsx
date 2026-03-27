import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight
} from 'lucide-react';

const footerLinks = {
  pages: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Skills', href: '/skills' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
  ],
  resources: [
    { label: 'Shop', href: '/shop' },
    { label: 'Events', href: '/school-events' },
    { label: 'Learners Awards', href: '/learners-awards' },
    { label: 'Schools', href: '/schools' },
    { label: 'Distributors', href: '/distributors' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/privacy-policy#terms-of-service' },
    { label: 'Cookie Policy', href: '/privacy-policy#cookie-policy' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/zamangwane', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com/zamangwane', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com/zamangwane', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com/company/zamangwane', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://youtube.com/zamangwane', label: 'YouTube' },
];

export function Footer() {
  return (
    <footer className="bg-zamangwane-text text-white">
      {/* Main Footer */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-zamangwane-orange rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">Z</span>
              </div>
            </Link>
            <p className="text-gray-400 text-lg mb-8 max-w-sm leading-relaxed">
              Empowering communities through skills development, youth programs, 
              and sustainable initiatives that create lasting positive change.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <a 
                href="mailto:info@zamangwanefoundation.africa" 
                className="flex items-center gap-3 text-gray-400 hover:text-zamangwane-orange transition-colors duration-300"
              >
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <Mail className="h-5 w-5" />
                </div>
                <span>info@zamangwanefoundation.africa</span>
              </a>
              <a 
                href="tel:+27607353608" 
                className="flex items-center gap-3 text-gray-400 hover:text-zamangwane-orange transition-colors duration-300"
              >
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <Phone className="h-5 w-5" />
                </div>
                <span>+27 60 735 3608</span>
              </a>
              <div className="flex items-center gap-3 text-gray-400">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <MapPin className="h-5 w-5" />
                </div>
                <span>Durban, KwaZulu-Natal, South Africa</span>
              </div>
            </div>
          </div>

          {/* Pages Links */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-white mb-6 text-lg">Pages</h3>
            <ul className="space-y-4">
              {footerLinks.pages.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-zamangwane-orange transition-colors duration-300 flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="lg:col-span-3">
            <h3 className="font-semibold text-white mb-6 text-lg">Resources</h3>
            <ul className="space-y-4">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-zamangwane-orange transition-colors duration-300 flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="lg:col-span-3">
            <h3 className="font-semibold text-white mb-6 text-lg">Legal</h3>
            <ul className="space-y-4">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-zamangwane-orange transition-colors duration-300 flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div className="mt-8">
              <h4 className="font-medium text-white mb-4">Follow Us</h4>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:bg-zamangwane-orange hover:text-white transition-all duration-300"
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Zamangwane Foundation. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Made with passion in South Africa
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
