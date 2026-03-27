import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock,
  ArrowRight,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login({
        email: formData.email,
        password: formData.password,
      });
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-zamangwane-background">
      {/* Back Button */}
      <div className="fixed top-24 left-4 sm:left-8 z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-zamangwane-orange transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
      </div>
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Info */}
        <div className="hidden lg:block animate-slide-in-left">
          <div className="mb-8">
            <Link to="/" className="flex items-center gap-3 mb-8 group">
              <div className="w-14 h-14 bg-zamangwane-orange rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <span className="text-white font-bold text-2xl">Z</span>
              </div>
              <span className="font-semibold text-3xl text-zamangwane-text">
                Zamangwane
              </span>
            </Link>
            <h1 className="text-4xl font-semibold text-zamangwane-text mb-4">
              Welcome Back!
            </h1>
            <p className="text-gray-600 text-lg">
              Sign in to access your dashboard, manage your profile, and continue your learning journey.
            </p>
          </div>

          <div className="space-y-4">
            {[
              'Access your personalized dashboard',
              'Track your progress and credits',
              'Register for events and programs',
              'Connect with your community',
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-zamangwane-orange flex-shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Form */}
        <Card className="border-0 shadow-card rounded-3xl animate-slide-in-right">
          <CardContent className="p-8 lg:p-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-zamangwane-text mb-2">
                Sign In
              </h2>
              <p className="text-gray-600">
                Enter your credentials to access your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="pl-12 py-5 rounded-xl border-2 border-gray-200 focus:border-zamangwane-orange transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="pl-12 pr-12 py-5 rounded-xl border-2 border-gray-200 focus:border-zamangwane-orange transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, rememberMe: checked as boolean })
                    }
                  />
                  <Label htmlFor="rememberMe" className="text-sm text-gray-600 cursor-pointer">
                    Remember me
                  </Label>
                </div>
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-zamangwane-orange hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="w-full rounded-full bg-zamangwane-orange hover:bg-zamangwane-orange/90 text-white py-6 font-semibold btn-hover"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Sign In
                    <ArrowRight className="h-5 w-5" />
                  </span>
                )}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link 
                  to="/register" 
                  className="text-zamangwane-orange font-medium hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>

            {/* Demo Accounts */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <p className="text-sm text-gray-500 text-center mb-4">
                Demo Accounts
              </p>
              <div className="grid grid-cols-1 gap-2 text-xs text-gray-500">
                <div className="p-3 bg-gray-50 rounded-xl flex justify-between items-center">
                  <div>
                    <p className="font-medium text-zamangwane-text">Admin User</p>
                    <p>theofficialdrev@gmail.com</p>
                  </div>
                  <span className="text-zamangwane-orange font-medium">Admin</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl flex justify-between items-center">
                  <div>
                    <p className="font-medium text-zamangwane-text">Normal User</p>
                    <p>nyashaemmanuel17@gmail.com</p>
                  </div>
                  <span className="text-green-600 font-medium">Learner</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 text-center mt-2">
                Password for all accounts: Prodigy_8434
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
