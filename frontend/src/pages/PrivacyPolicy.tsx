import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Shield, 
  Cookie, 
  FileText, 
  ChevronRight,
  ArrowLeft,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const sections = [
  { id: 'privacy-policy', label: 'Privacy Policy', icon: Shield },
  { id: 'cookie-policy', label: 'Cookie Policy', icon: Cookie },
  { id: 'terms-of-service', label: 'Terms of Service', icon: FileText },
];

export function PrivacyPolicy() {
  const location = useLocation();

  // Scroll to section based on hash
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-zamangwane-background">
      {/* Header */}
      <div className="relative bg-zamangwane-text py-16 lg:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-zamangwane-orange/20 to-transparent" />
        </div>
        <div className="relative w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <Link to="/">
            <Button
              variant="ghost"
              size="sm"
              className="mb-8 text-white/80 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Legal Information
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Your privacy and trust are important to us. Learn how we protect your data and manage your information.
          </p>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-12 lg:py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-2">
              <h3 className="font-semibold text-zamangwane-text mb-4">Quick Navigation</h3>
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    location.hash === `#${section.id}`
                      ? 'bg-zamangwane-orange text-white'
                      : 'text-gray-600 hover:bg-zamangwane-orange/10 hover:text-zamangwane-orange'
                  }`}
                >
                  <section.icon className="h-5 w-5" />
                  <span className="font-medium">{section.label}</span>
                  <ChevronRight className="h-4 w-4 ml-auto" />
                </a>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-12">
            {/* Privacy Policy Section */}
            <section id="privacy-policy" className="scroll-mt-24">
              <Card className="border-0 shadow-soft rounded-2xl">
                <CardContent className="p-8 lg:p-12">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-zamangwane-orange/10 rounded-xl flex items-center justify-center">
                      <Shield className="h-6 w-6 text-zamangwane-orange" />
                    </div>
                    <h2 className="text-2xl font-bold text-zamangwane-text">Privacy Policy</h2>
                  </div>

                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-600 leading-relaxed">
                      Last updated: {new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>

                    <h3 className="text-xl font-semibold text-zamangwane-text mt-8 mb-4">1. Introduction</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Zamangwane Foundation (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
                      This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                      when you use our website and services.
                    </p>

                    <h3 className="text-xl font-semibold text-zamangwane-text mt-8 mb-4">2. Information We Collect</h3>
                    <p className="text-gray-600 leading-relaxed">We collect information that you provide directly to us, including:</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
                      <li>Personal identification information (name, email address, phone number)</li>
                      <li>Account credentials (username and password)</li>
                      <li>Profile information (province, city, bio)</li>
                      <li>Payment information for transactions</li>
                      <li>Communications and correspondence</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-zamangwane-text mt-8 mb-4">3. How We Use Your Information</h3>
                    <p className="text-gray-600 leading-relaxed">We use the information we collect to:</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
                      <li>Provide, maintain, and improve our services</li>
                      <li>Process transactions and send related information</li>
                      <li>Send administrative information and updates</li>
                      <li>Respond to your comments, questions, and requests</li>
                      <li>Personalize your experience on our platform</li>
                      <li>Monitor and analyze trends and usage</li>
                      <li>Detect, prevent, and address technical issues</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-zamangwane-text mt-8 mb-4">4. Information Sharing</h3>
                    <p className="text-gray-600 leading-relaxed">
                      We do not sell, trade, or rent your personal information to third parties. 
                      We may share your information only in the following circumstances:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
                      <li>With your consent</li>
                      <li>To comply with legal obligations</li>
                      <li>To protect our rights, privacy, safety, or property</li>
                      <li>In connection with a business transfer or merger</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-zamangwane-text mt-8 mb-4">5. Data Security</h3>
                    <p className="text-gray-600 leading-relaxed">
                      We implement appropriate technical and organizational measures to protect 
                      your personal information against unauthorized access, alteration, disclosure, 
                      or destruction. However, no method of transmission over the Internet is 100% secure.
                    </p>

                    <h3 className="text-xl font-semibold text-zamangwane-text mt-8 mb-4">6. Your Rights</h3>
                    <p className="text-gray-600 leading-relaxed">You have the right to:</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
                      <li>Access your personal information</li>
                      <li>Correct inaccurate or incomplete information</li>
                      <li>Request deletion of your personal information</li>
                      <li>Object to processing of your personal information</li>
                      <li>Request restriction of processing</li>
                      <li>Data portability</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-zamangwane-text mt-8 mb-4">7. Contact Us</h3>
                    <p className="text-gray-600 leading-relaxed">
                      If you have any questions about this Privacy Policy, please contact us:
                    </p>
                    <div className="mt-4 space-y-2">
                      <a href="mailto:info@zamangwanefoundation.africa" className="flex items-center gap-2 text-zamangwane-orange hover:underline">
                        <Mail className="h-4 w-4" />
                        info@zamangwanefoundation.africa
                      </a>
                      <a href="tel:+27607353608" className="flex items-center gap-2 text-zamangwane-orange hover:underline">
                        <Phone className="h-4 w-4" />
                        +27 60 735 3608
                      </a>
                      <p className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        Durban, KwaZulu-Natal, South Africa
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Cookie Policy Section */}
            <section id="cookie-policy" className="scroll-mt-24">
              <Card className="border-0 shadow-soft rounded-2xl">
                <CardContent className="p-8 lg:p-12">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-zamangwane-orange/10 rounded-xl flex items-center justify-center">
                      <Cookie className="h-6 w-6 text-zamangwane-orange" />
                    </div>
                    <h2 className="text-2xl font-bold text-zamangwane-text">Cookie Policy</h2>
                  </div>

                  <div className="prose prose-gray max-w-none">
                    <h3 className="text-xl font-semibold text-zamangwane-text mt-8 mb-4">1. What Are Cookies</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Cookies are small text files that are placed on your computer or mobile device 
                      when you visit a website. They are widely used to make websites work more efficiently 
                      and provide information to the website owners.
                    </p>

                    <h3 className="text-xl font-semibold text-zamangwane-text mt-8 mb-4">2. How We Use Cookies</h3>
                    <p className="text-gray-600 leading-relaxed">We use cookies for the following purposes:</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
                      <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                      <li><strong>Authentication Cookies:</strong> To keep you logged in to your account</li>
                      <li><strong>Preference Cookies:</strong> To remember your settings and preferences</li>
                      <li><strong>Analytics Cookies:</strong> To understand how visitors interact with our website</li>
                      <li><strong>Marketing Cookies:</strong> To deliver relevant advertisements</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-zamangwane-text mt-8 mb-4">3. Types of Cookies We Use</h3>
                    <div className="overflow-x-auto mt-4">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 font-semibold text-zamangwane-text">Cookie Type</th>
                            <th className="text-left py-3 px-4 font-semibold text-zamangwane-text">Purpose</th>
                            <th className="text-left py-3 px-4 font-semibold text-zamangwane-text">Duration</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-100">
                            <td className="py-3 px-4 text-gray-600">Session</td>
                            <td className="py-3 px-4 text-gray-600">Maintain login state</td>
                            <td className="py-3 px-4 text-gray-600">Browser session</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-3 px-4 text-gray-600">Persistent</td>
                            <td className="py-3 px-4 text-gray-600">Remember preferences</td>
                            <td className="py-3 px-4 text-gray-600">Up to 1 year</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-3 px-4 text-gray-600">Third-party</td>
                            <td className="py-3 px-4 text-gray-600">Analytics and marketing</td>
                            <td className="py-3 px-4 text-gray-600">Varies</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <h3 className="text-xl font-semibold text-zamangwane-text mt-8 mb-4">4. Managing Cookies</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Most web browsers allow you to control cookies through their settings preferences. 
                      However, if you limit the ability of websites to set cookies, you may worsen your 
                      overall user experience and/or lose access to certain features.
                    </p>

                    <h3 className="text-xl font-semibold text-zamangwane-text mt-8 mb-4">5. Changes to This Policy</h3>
                    <p className="text-gray-600 leading-relaxed">
                      We may update this Cookie Policy from time to time. We encourage you to periodically 
                      review this page for the latest information on our cookie practices.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Terms of Service Section */}
            <section id="terms-of-service" className="scroll-mt-24">
              <Card className="border-0 shadow-soft rounded-2xl">
                <CardContent className="p-8 lg:p-12">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-zamangwane-orange/10 rounded-xl flex items-center justify-center">
                      <FileText className="h-6 w-6 text-zamangwane-orange" />
                    </div>
                    <h2 className="text-2xl font-bold text-zamangwane-text">Terms of Service</h2>
                  </div>

                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-600 leading-relaxed">
                      Last updated: {new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>

                    <h3 className="text-xl font-semibold text-zamangwane-text mt-8 mb-4">1. Acceptance of Terms</h3>
                    <p className="text-gray-600 leading-relaxed">
                      By accessing or using the Zamangwane Foundation website and services, you agree to be 
                      bound by these Terms of Service. If you do not agree to these terms, please do not use 
                      our services.
                    </p>

                    <h3 className="text-xl font-semibold text-zamangwane-text mt-8 mb-4">2. Description of Services</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Zamangwane Foundation provides a platform for skills development, event management, 
                      and community engagement. Our services include:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
                      <li>Skills training and certification programs</li>
                      <li>Event organization and ticket sales</li>
                      <li>E-commerce marketplace for products</li>
                      <li>Community networking and referrals</li>
                      <li>Credit and reward systems</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-zamangwane-text mt-8 mb-4">3. User Accounts</h3>
                    <p className="text-gray-600 leading-relaxed">When you create an account with us, you agree to:</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
                      <li>Provide accurate and complete information</li>
                      <li>Maintain the security of your account credentials</li>
                      <li>Promptly update your information if it changes</li>
                      <li>Accept responsibility for all activities under your account</li>
                      <li>Notify us immediately of any unauthorized access</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-zamangwane-text mt-8 mb-4">4. User Conduct</h3>
                    <p className="text-gray-600 leading-relaxed">You agree not to:</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
                      <li>Use our services for any illegal purpose</li>
                      <li>Impersonate any person or entity</li>
                      <li>Interfere with or disrupt our services</li>
                      <li>Attempt to gain unauthorized access to any part of our services</li>
                      <li>Upload or transmit viruses or malicious code</li>
                      <li>Harass, abuse, or harm another person</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-zamangwane-text mt-8 mb-4">5. Payments and Refunds</h3>
                    <p className="text-gray-600 leading-relaxed">
                      All payments are processed securely through our payment partners. Refunds are handled 
                      on a case-by-case basis according to our refund policy. Event cancellations will result 
                      in automatic refunds to ticket holders.
                    </p>

                    <h3 className="text-xl font-semibold text-zamangwane-text mt-8 mb-4">6. Intellectual Property</h3>
                    <p className="text-gray-600 leading-relaxed">
                      All content on our platform, including text, graphics, logos, and software, is the 
                      property of Zamangwane Foundation or its licensors and is protected by copyright and 
                      other intellectual property laws.
                    </p>

                    <h3 className="text-xl font-semibold text-zamangwane-text mt-8 mb-4">7. Limitation of Liability</h3>
                    <p className="text-gray-600 leading-relaxed">
                      To the maximum extent permitted by law, Zamangwane Foundation shall not be liable for 
                      any indirect, incidental, special, consequential, or punitive damages arising out of 
                      or relating to your use of our services.
                    </p>

                    <h3 className="text-xl font-semibold text-zamangwane-text mt-8 mb-4">8. Termination</h3>
                    <p className="text-gray-600 leading-relaxed">
                      We reserve the right to suspend or terminate your account at any time for any reason, 
                      including violation of these terms. Upon termination, your right to use our services 
                      will immediately cease.
                    </p>

                    <h3 className="text-xl font-semibold text-zamangwane-text mt-8 mb-4">9. Governing Law</h3>
                    <p className="text-gray-600 leading-relaxed">
                      These Terms of Service shall be governed by and construed in accordance with the laws 
                      of the Republic of South Africa. Any disputes shall be subject to the exclusive 
                      jurisdiction of the courts of South Africa.
                    </p>

                    <h3 className="text-xl font-semibold text-zamangwane-text mt-8 mb-4">10. Contact Information</h3>
                    <p className="text-gray-600 leading-relaxed">
                      For any questions about these Terms of Service, please contact us:
                    </p>
                    <div className="mt-4 space-y-2">
                      <a href="mailto:info@zamangwanefoundation.africa" className="flex items-center gap-2 text-zamangwane-orange hover:underline">
                        <Mail className="h-4 w-4" />
                        info@zamangwanefoundation.africa
                      </a>
                      <a href="tel:+27607353608" className="flex items-center gap-2 text-zamangwane-orange hover:underline">
                        <Phone className="h-4 w-4" />
                        +27 60 735 3608
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
