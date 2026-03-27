import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Search, 
  ShoppingCart,
  ArrowRight,
  CheckCircle2,
  Truck,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockProducts } from '@/data/mockData';
import { formatCurrency } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

const categories = [
  { id: 'all', label: 'All Products' },
  { id: 'Books', label: 'Books' },
  { id: 'Kits', label: 'Kits' },
  { id: 'Bundles', label: 'Bundles' },
];

export function Shop() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { addItem, totalItems, totalPrice } = useCart();
  const viewCartRef = useRef<HTMLDivElement>(null);

  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch && product.isActive;
  });

  const handleAddToCart = (product: typeof mockProducts[0]) => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    
    // Scroll to view cart section
    setTimeout(() => {
      viewCartRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-zamangwane-background">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-zamangwane-background">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <span className="inline-block px-4 py-1.5 bg-zamangwane-orange/10 text-zamangwane-orange text-sm font-medium rounded-full mb-6">
              Shop
            </span>
            <h1 className="text-4xl lg:text-6xl font-semibold text-zamangwane-text mb-6">
              Support Our{' '}
              <span className="text-zamangwane-orange">Mission</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Purchase our educational materials and merchandise. All proceeds go directly 
              towards funding our community programs and initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-6 bg-white border-b border-gray-100 sticky top-20 z-30">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-zamangwane-orange text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-zamangwane-orange/10 hover:text-zamangwane-orange'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-5 rounded-full border-2 border-gray-200 focus:border-zamangwane-orange transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 lg:py-20">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <Card 
                key={product.id} 
                className="group border-0 shadow-soft hover:shadow-hover transition-all duration-500 rounded-3xl overflow-hidden card-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link to={`/shop/${product.id}`}>
                  <div className="aspect-square overflow-hidden bg-gray-50">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </Link>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="rounded-full bg-zamangwane-orange/10 text-zamangwane-orange text-xs">
                      {product.category}
                    </Badge>
                    {product.stock < 10 && (
                      <span className="text-xs text-red-500 font-medium">
                        Only {product.stock} left
                      </span>
                    )}
                  </div>

                  <Link to={`/shop/${product.id}`}>
                    <h3 className="font-semibold text-zamangwane-text mb-1 group-hover:text-zamangwane-orange transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <p className="text-xl font-semibold text-zamangwane-orange">
                      {formatCurrency(product.price)}
                    </p>
                    <Button
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                      className="rounded-full bg-zamangwane-orange hover:bg-zamangwane-orange/90 text-white btn-hover"
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16 animate-fade-in">
              <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No products found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or category filter
              </p>
            </div>
          )}
        </div>
      </section>

      {/* View Cart Section - Scroll Target */}
      {totalItems > 0 && (
        <section 
          ref={viewCartRef}
          className="py-12 bg-zamangwane-orange animate-slide-up"
        >
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="max-w-4xl mx-auto text-center text-white">
              <ShoppingCart className="h-12 w-12 mx-auto mb-4" />
              <h2 className="text-3xl font-semibold mb-2">
                You have {totalItems} item{totalItems > 1 ? 's' : ''} in your cart
              </h2>
              <p className="text-white/80 text-lg mb-6">
                Total: {formatCurrency(totalPrice)}
              </p>
              <Link to="/cart">
                <Button 
                  size="lg"
                  className="rounded-full bg-white text-zamangwane-orange hover:bg-white/90 px-8 py-6 font-semibold"
                >
                  View Cart
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Secure Payment',
                description: 'Pay safely with PayFast, South Africa\'s trusted payment gateway.',
              },
              {
                icon: Truck,
                title: 'Fast Delivery',
                description: 'We deliver nationwide within 3-5 business days.',
              },
              {
                icon: CheckCircle2,
                title: 'Quality Guaranteed',
                description: 'All our products are carefully curated for quality.',
              },
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-3xl bg-zamangwane-background hover:shadow-soft transition-all duration-300">
                <div className="w-14 h-14 bg-zamangwane-orange/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-7 w-7 text-zamangwane-orange" />
                </div>
                <h3 className="font-semibold text-zamangwane-text mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 lg:py-28 bg-zamangwane-text">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <span className="inline-block px-4 py-1.5 bg-zamangwane-orange/20 text-zamangwane-orange text-sm font-medium rounded-full mb-6">
                Your Impact
              </span>
              <h2 className="text-3xl lg:text-5xl font-semibold mb-6">
                Every Purchase Makes a Difference
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                When you buy from our shop, you're not just getting a great product - 
                you're directly supporting our community programs and helping us empower 
                more people across South Africa.
              </p>

              <div className="space-y-4">
                {[
                  'Funds skills development programs',
                  'Supports youth empowerment initiatives',
                  'Enables community upliftment projects',
                  'Provides resources for partner schools',
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-zamangwane-orange flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zamangwane-orange/10 rounded-3xl p-6 text-center">
                <p className="text-4xl font-semibold text-zamangwane-orange mb-2">100%</p>
                <p className="text-gray-400 text-sm">Proceeds to Programs</p>
              </div>
              <div className="bg-zamangwane-orange/10 rounded-3xl p-6 text-center">
                <p className="text-4xl font-semibold text-zamangwane-orange mb-2">2,500+</p>
                <p className="text-gray-400 text-sm">Lives Impacted</p>
              </div>
              <div className="bg-zamangwane-orange/10 rounded-3xl p-6 text-center">
                <p className="text-4xl font-semibold text-zamangwane-orange mb-2">45+</p>
                <p className="text-gray-400 text-sm">Community Events</p>
              </div>
              <div className="bg-zamangwane-orange/10 rounded-3xl p-6 text-center">
                <p className="text-4xl font-semibold text-zamangwane-orange mb-2">28</p>
                <p className="text-gray-400 text-sm">Communities Served</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="bg-zamangwane-orange rounded-[2rem] p-8 lg:p-16 text-center">
            <h2 className="text-3xl lg:text-5xl font-semibold text-white mb-6">
              Have Questions?
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
              Contact us for bulk orders, custom merchandise, or any other inquiries. 
              We're here to help!
            </p>
            <Link to="/contact">
              <Button 
                size="lg" 
                className="rounded-full bg-white text-zamangwane-orange hover:bg-white/90 px-8 py-6 font-semibold"
              >
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
