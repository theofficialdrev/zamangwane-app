import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { 
  ShoppingCart, 
  ArrowLeft,
  Share2,
  Heart,
  Star,
  CheckCircle2,
  Truck,
  Shield,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockProducts } from '@/data/mockData';
import { formatCurrency } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

export function ProductDetails() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { addItem, totalItems, totalPrice } = useCart();
  const product = mockProducts.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zamangwane-background">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-zamangwane-text mb-4">Product Not Found</h1>
          <Link to="/shop">
            <Button className="rounded-full bg-zamangwane-orange text-white">
              Back to Shop
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }
  };

  return (
    <div className="min-h-screen bg-zamangwane-background py-8">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 max-w-6xl mx-auto">
        <Link to="/shop">
          <Button variant="ghost" className="mb-6 hover:bg-zamangwane-orange/10">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shop
          </Button>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="aspect-square bg-white rounded-3xl overflow-hidden shadow-soft img-zoom">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className="rounded-full bg-zamangwane-orange/10 text-zamangwane-orange mb-4">
                {product.category}
              </Badge>
              <h1 className="text-3xl lg:text-4xl font-semibold text-zamangwane-text mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <span className="text-gray-500">(24 reviews)</span>
              </div>
              <p className="text-3xl font-semibold text-zamangwane-orange">
                {formatCurrency(product.price)}
              </p>
            </div>

            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white rounded-full p-1 border border-gray-200">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  -
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  +
                </button>
              </div>
              <span className="text-gray-500">
                {product.stock} in stock
              </span>
            </div>

            <div className="flex gap-4">
              <Button 
                className="flex-1 rounded-full bg-zamangwane-orange hover:bg-zamangwane-orange/90 text-white py-6 font-semibold btn-hover"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <button 
                onClick={() => toast.info('Added to favorites!')}
                className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <Heart className="h-6 w-6" />
              </button>
              <button 
                onClick={() => toast.info('Product shared!')}
                className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <Share2 className="h-6 w-6" />
              </button>
            </div>

            {/* Cart Summary if items exist */}
            {totalItems > 0 && (
              <div className="bg-zamangwane-orange/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Items in cart</span>
                  <span className="font-semibold text-zamangwane-orange">{totalItems}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600">Cart total</span>
                  <span className="font-semibold text-zamangwane-orange">{formatCurrency(totalPrice)}</span>
                </div>
                <Link to="/cart">
                  <Button className="w-full rounded-full bg-zamangwane-orange hover:bg-zamangwane-orange/90 text-white font-semibold">
                    View Cart
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-2xl shadow-soft">
                <Truck className="h-6 w-6 text-zamangwane-orange mx-auto mb-2" />
                <p className="text-sm text-gray-600">Free Delivery</p>
              </div>
              <div className="text-center p-4 bg-white rounded-2xl shadow-soft">
                <Shield className="h-6 w-6 text-zamangwane-orange mx-auto mb-2" />
                <p className="text-sm text-gray-600">Secure Payment</p>
              </div>
              <div className="text-center p-4 bg-white rounded-2xl shadow-soft">
                <CheckCircle2 className="h-6 w-6 text-zamangwane-orange mx-auto mb-2" />
                <p className="text-sm text-gray-600">Quality Guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
