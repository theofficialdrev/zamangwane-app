import { useState } from 'react';
import { 
  CreditCard, 
  Lock,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/utils';
import { toast } from 'sonner';
import { useNavigate, Link } from 'react-router-dom';

export function Checkout() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1);
  const [billingData, setBillingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    country: 'South Africa',
  });

  const shipping = totalPrice > 500 ? 0 : 50;
  const total = totalPrice + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBillingData({
      ...billingData,
      [e.target.name]: e.target.value,
    });
  };

  const validateBillingData = () => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'province', 'postalCode'];
    for (const field of required) {
      if (!billingData[field as keyof typeof billingData]) {
        toast.error(`Please fill in your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }
    return true;
  };

  const handleContinueToPayment = () => {
    if (validateBillingData()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    toast.success('Payment successful! Thank you for your order.');
    clearCart();
    setIsProcessing(false);
    navigate('/dashboard');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-zamangwane-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-zamangwane-text mb-4">Your cart is empty</h2>
          <Link to="/shop">
            <Button className="rounded-full bg-zamangwane-orange text-white">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zamangwane-background py-8">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 max-w-4xl mx-auto">
        <Link to="/cart">
          <Button variant="ghost" className="mb-6 hover:bg-zamangwane-orange/10">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Button>
        </Link>

        <h1 className="text-3xl font-semibold text-zamangwane-text mb-8">Checkout</h1>

        {/* Progress */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-zamangwane-orange' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= 1 ? 'bg-zamangwane-orange text-white' : 'bg-gray-200'}`}>
              1
            </div>
            <span className="text-sm font-medium hidden sm:block">Billing</span>
          </div>
          <div className="w-16 h-0.5 bg-gray-200">
            <div className={`h-full bg-zamangwane-orange transition-all ${step >= 2 ? 'w-full' : 'w-0'}`} />
          </div>
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-zamangwane-orange' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= 2 ? 'bg-zamangwane-orange text-white' : 'bg-gray-200'}`}>
              2
            </div>
            <span className="text-sm font-medium hidden sm:block">Payment</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <Card className="border-0 shadow-soft rounded-2xl animate-slide-up">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-zamangwane-text mb-6">Billing Information</h3>
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input 
                          id="firstName" 
                          name="firstName"
                          value={billingData.firstName}
                          onChange={handleInputChange}
                          className="rounded-xl py-5" 
                          placeholder="John"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input 
                          id="lastName" 
                          name="lastName"
                          value={billingData.lastName}
                          onChange={handleInputChange}
                          className="rounded-xl py-5" 
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input 
                          id="email" 
                          name="email"
                          type="email"
                          value={billingData.email}
                          onChange={handleInputChange}
                          className="rounded-xl py-5" 
                          placeholder="john@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input 
                          id="phone" 
                          name="phone"
                          value={billingData.phone}
                          onChange={handleInputChange}
                          className="rounded-xl py-5" 
                          placeholder="+27 82 123 4567"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address *</Label>
                      <Input 
                        id="address" 
                        name="address"
                        value={billingData.address}
                        onChange={handleInputChange}
                        className="rounded-xl py-5" 
                        placeholder="123 Main Street"
                      />
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input 
                          id="city" 
                          name="city"
                          value={billingData.city}
                          onChange={handleInputChange}
                          className="rounded-xl py-5" 
                          placeholder="Johannesburg"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="province">Province *</Label>
                        <Input 
                          id="province" 
                          name="province"
                          value={billingData.province}
                          onChange={handleInputChange}
                          className="rounded-xl py-5" 
                          placeholder="Gauteng"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Postal Code *</Label>
                        <Input 
                          id="postalCode" 
                          name="postalCode"
                          value={billingData.postalCode}
                          onChange={handleInputChange}
                          className="rounded-xl py-5" 
                          placeholder="2000"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input 
                        id="country" 
                        name="country"
                        value={billingData.country}
                        disabled
                        className="rounded-xl py-5 bg-gray-50" 
                      />
                    </div>

                    <Button 
                      className="w-full rounded-full bg-zamangwane-orange hover:bg-zamangwane-orange/90 text-white py-6 font-semibold btn-hover mt-4"
                      onClick={handleContinueToPayment}
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card className="border-0 shadow-soft rounded-2xl animate-slide-up">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-zamangwane-text mb-6">Payment Method</h3>
                  
                  {/* Billing Summary */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <h4 className="font-medium text-zamangwane-text mb-2">Billing Address</h4>
                    <p className="text-gray-600">
                      {billingData.firstName} {billingData.lastName}<br />
                      {billingData.address}<br />
                      {billingData.city}, {billingData.province} {billingData.postalCode}<br />
                      {billingData.country}
                    </p>
                    <button 
                      onClick={() => setStep(1)}
                      className="text-zamangwane-orange text-sm mt-2 hover:underline"
                    >
                      Edit
                    </button>
                  </div>

                  <div className="p-4 bg-zamangwane-orange/10 rounded-xl mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-zamangwane-orange rounded-xl flex items-center justify-center">
                        <CreditCard className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-zamangwane-text">PayFast</p>
                        <p className="text-sm text-gray-500">Secure payment gateway</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-xl mb-6">
                    <p className="text-sm text-yellow-700">
                      You will be redirected to PayFast to complete your payment securely. 
                      All major credit cards and EFT are accepted.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      variant="outline"
                      className="flex-1 rounded-full py-6"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>
                    <Button 
                      className="flex-1 rounded-full bg-zamangwane-orange hover:bg-zamangwane-orange/90 text-white py-6 font-semibold btn-hover"
                      onClick={handlePayment}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <span className="flex items-center gap-2">
                          <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                          Processing...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Lock className="h-4 w-4" />
                          Pay {formatCurrency(total)}
                        </span>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="border-0 shadow-soft rounded-2xl sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-zamangwane-text mb-4">Order Summary</h3>
                <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                  {items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.name} x {item.quantity}
                      </span>
                      <span className="font-medium">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 pt-3 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatCurrency(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-3 mt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-zamangwane-orange">{formatCurrency(total)}</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Secure checkout</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
