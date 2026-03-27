import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ChevronDown, 
  User, 
  LogOut, 
  LayoutDashboard,
  ShoppingCart,
  Ticket,
  ArrowRight,
  GraduationCap,
  Users,
  Heart,
  Calendar,
  TrendingUp,
  Compass
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Skills', href: '/skills' },
  { 
    label: 'Services', 
    href: '/services',
    hasMegaMenu: true,
    megaMenuItems: [
      { 
        title: 'Skills Development', 
        description: 'Comprehensive training programs',
        icon: GraduationCap,
        href: '/services'
      },
      { 
        title: 'Youth Empowerment', 
        description: 'Programs for young people',
        icon: Users,
        href: '/services'
      },
      { 
        title: 'Community Upliftment', 
        description: 'Grassroots initiatives',
        icon: Heart,
        href: '/services'
      },
      { 
        title: 'Event Management', 
        description: 'Professional event planning',
        icon: Calendar,
        href: '/services'
      },
      { 
        title: 'Entrepreneurship', 
        description: 'Business training & support',
        icon: TrendingUp,
        href: '/services'
      },
      { 
        title: 'Career Guidance', 
        description: 'Professional counseling',
        icon: Compass,
        href: '/services'
      },
    ]
  },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-zamangwane-background/95 backdrop-blur-md shadow-soft'
          : 'bg-transparent'
      )}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="/logo.png" 
              alt="Zamangwane Foundation" 
              className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.href} className="relative">
                {item.hasMegaMenu ? (
                  <div 
                    className="relative"
                    onMouseEnter={() => setIsMegaMenuOpen(true)}
                    onMouseLeave={() => setIsMegaMenuOpen(false)}
                  >
                    <Link
                      to={item.href}
                      className={cn(
                        'flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full transition-all duration-300',
                        isActive(item.href)
                          ? 'text-zamangwane-orange'
                          : 'text-zamangwane-text hover:text-zamangwane-orange'
                      )}
                    >
                      {item.label}
                      <ChevronDown className={cn(
                        "h-4 w-4 transition-transform duration-300",
                        isMegaMenuOpen && "rotate-180"
                      )} />
                    </Link>
                    
                    {/* Mega Menu */}
                    <div className={cn(
                      "absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300",
                      isMegaMenuOpen 
                        ? "opacity-100 visible translate-y-0" 
                        : "opacity-0 invisible -translate-y-2"
                    )}>
                      <div className="bg-white rounded-3xl shadow-card p-6 w-[600px] grid grid-cols-2 gap-4">
                        {item.megaMenuItems?.map((subItem, idx) => (
                          <Link
                            key={idx}
                            to={subItem.href}
                            className="flex items-start gap-3 p-4 rounded-2xl hover:bg-zamangwane-light transition-all duration-300 group"
                          >
                            <div className="w-10 h-10 bg-zamangwane-orange/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-zamangwane-orange group-hover:text-white transition-all duration-300">
                              <subItem.icon className="h-5 w-5 text-zamangwane-orange group-hover:text-white transition-colors" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-zamangwane-text group-hover:text-zamangwane-orange transition-colors">
                                {subItem.title}
                              </h4>
                              <p className="text-sm text-gray-500">{subItem.description}</p>
                            </div>
                          </Link>
                        ))}
                        <div className="col-span-2 mt-2 pt-4 border-t border-gray-100">
                          <Link 
                            to="/services" 
                            className="flex items-center justify-center gap-2 text-zamangwane-orange font-medium hover:gap-3 transition-all"
                          >
                            View All Services
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={cn(
                      'px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 relative',
                      isActive(item.href)
                        ? 'text-zamangwane-orange'
                        : 'text-zamangwane-text hover:text-zamangwane-orange'
                    )}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-zamangwane-orange rounded-full" />
                    )}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Cart Button */}
            <Link to="/cart" className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full hover:bg-zamangwane-orange/10 transition-colors"
              >
                <ShoppingCart className="h-5 w-5 text-zamangwane-text" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-zamangwane-orange text-white text-xs font-medium rounded-full flex items-center justify-center animate-scale-up">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 rounded-full hover:bg-zamangwane-orange/10 transition-colors"
                  >
                    <div className="w-9 h-9 bg-zamangwane-orange rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {user?.firstName.charAt(0)}{user?.lastName.charAt(0)}
                      </span>
                    </div>
                    <span className="hidden sm:block text-sm font-medium text-zamangwane-text">
                      {user?.firstName}
                    </span>
                    <ChevronDown className="h-4 w-4 text-zamangwane-text" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2">
                  <div className="px-3 py-2">
                    <p className="text-sm font-semibold">{user?.firstName} {user?.lastName}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
                    <Link to="/dashboard" className="flex items-center gap-2">
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
                    <Link to="/profile" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
                    <Link to="/my-tickets" className="flex items-center gap-2">
                      <Ticket className="h-4 w-4" />
                      My Tickets
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={logout}
                    className="rounded-xl cursor-pointer text-red-600 focus:text-red-600"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="hidden sm:block">
                  <Button
                    variant="ghost"
                    className="rounded-full text-zamangwane-text hover:text-zamangwane-orange hover:bg-zamangwane-orange/10 transition-colors"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="rounded-full bg-zamangwane-orange hover:bg-zamangwane-orange/90 text-white btn-hover">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden rounded-full hover:bg-zamangwane-orange/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-zamangwane-text" />
              ) : (
                <Menu className="h-6 w-6 text-zamangwane-text" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-zamangwane-background border-t border-gray-100 animate-slide-down">
          <nav className="flex flex-col p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300',
                  isActive(item.href)
                    ? 'text-zamangwane-orange bg-zamangwane-orange/10'
                    : 'text-zamangwane-text hover:text-zamangwane-orange hover:bg-zamangwane-orange/5'
                )}
              >
                {item.label}
              </Link>
            ))}
            {!isAuthenticated && (
              <>
                <div className="border-t border-gray-100 my-2" />
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-zamangwane-text hover:text-zamangwane-orange rounded-xl"
                >
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
