import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/sonner';
import { ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Pages
import { Home } from '@/pages/Home';
import { About } from '@/pages/About';
import { Skills } from '@/pages/Skills';
import { Services } from '@/pages/Services';
import { Contact } from '@/pages/Contact';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import { Dashboard } from '@/pages/Dashboard';
import { Cart } from '@/pages/Cart';
import { Checkout } from '@/pages/Checkout';
import { Shop } from '@/pages/Shop';
import { ProductDetails } from '@/pages/ProductDetails';
import { Profile } from '@/pages/Profile';
import { MyTickets } from '@/pages/MyTickets';
import { SchoolEvents } from '@/pages/SchoolEvents';
import { EventDetails } from '@/pages/EventDetails';
import { LearnersAwards } from '@/pages/LearnersAwards';
import { Schools } from '@/pages/Schools';
import { Distributors } from '@/pages/Distributors';
import { PrivacyPolicy } from '@/pages/PrivacyPolicy';
import { Unauthorized } from '@/pages/Unauthorized';
import { NotFound } from '@/pages/NotFound';

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);
  
  return null;
}

// Floating buttons component
function FloatingButtons() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* WhatsApp Button - Bottom Left with neon glow and pulse */}
      <a
        href="https://wa.me/+27607353608"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] rounded-full flex items-center justify-center transition-all hover:scale-110 animate-whatsapp-pulse"
        style={{
          boxShadow: '0 0 20px rgba(37, 211, 102, 0.6), 0 0 40px rgba(37, 211, 102, 0.4), 0 0 60px rgba(37, 211, 102, 0.2)',
        }}
        aria-label="Chat on WhatsApp"
      >
        {/* WhatsApp Logo SVG */}
        <svg 
          viewBox="0 0 24 24" 
          className="h-8 w-8 text-white"
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* Back to Top Button */}
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-24 right-6 z-50 w-12 h-12 bg-zamangwane-orange hover:bg-zamangwane-orange/90 text-white rounded-full shadow-lg transition-all hover:scale-110"
          aria-label="Back to top"
        >
          <ChevronUp className="h-6 w-6" />
        </Button>
      )}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-zamangwane-background font-clash">
            <Navbar />
            <main className="flex-1 pt-20">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/:id" element={<ProductDetails />} />
                <Route path="/school-events" element={<SchoolEvents />} />
                <Route path="/school-events/:id" element={<EventDetails />} />
                <Route path="/learners-awards" element={<LearnersAwards />} />
                <Route path="/schools" element={<Schools />} />
                <Route path="/distributors" element={<Distributors />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                
                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Protected Routes */}
                <Route path="/dashboard" element={<div className="pt-0"><Dashboard /></div>} />
                <Route path="/dashboard/*" element={<div className="pt-0"><Dashboard /></div>} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/my-tickets" element={<MyTickets />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                
                {/* Error Routes */}
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <FloatingButtons />
            <Toaster position="top-right" richColors />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
