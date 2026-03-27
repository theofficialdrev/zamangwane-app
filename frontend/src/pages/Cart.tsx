import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/utils';

export function Cart() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();

  const shipping = totalPrice > 500 ? 0 : 50;
  const total = totalPrice + shipping;

  return (
    <div className="min-h-screen bg-zamangwane-background py-8">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold text-zamangwane-text mb-8">Shopping Cart</h1>

        {items.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <Card 
                  key={item.productId} 
                  className="border-0 shadow-soft rounded-2xl card-hover"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-xl"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-zamangwane-text">{item.name}</h3>
                            <p className="text-sm text-gray-500">{formatCurrency(item.price)} each</p>
                          </div>
                          <button 
                            onClick={() => removeItem(item.productId)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                        <div className="flex justify-between items-end mt-4">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="font-semibold text-zamangwane-orange">
                            {formatCurrency(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div>
              <Card className="border-0 shadow-soft rounded-2xl sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-zamangwane-text mb-4">Order Summary</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>{formatCurrency(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
                    </div>
                    <div className="border-t border-gray-100 pt-3">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span className="text-zamangwane-orange">{formatCurrency(total)}</span>
                      </div>
                    </div>
                  </div>
                  <Link to="/checkout">
                    <Button className="w-full rounded-full bg-zamangwane-orange hover:bg-zamangwane-orange/90 text-white py-6 font-semibold btn-hover">
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <p className="text-center text-sm text-gray-500 mt-4">
                    Free shipping on orders over {formatCurrency(500)}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 animate-fade-in">
            <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Your cart is empty
            </h3>
            <p className="text-gray-500 mb-6">
              Browse our shop and add some items to your cart
            </p>
            <Link to="/shop">
              <Button className="rounded-full bg-zamangwane-orange hover:bg-zamangwane-orange/90 text-white font-semibold">
                Continue Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
