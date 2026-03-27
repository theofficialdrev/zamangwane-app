import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock,
  User,
  Phone,
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Users,
  Calendar,
  Shield,
  ArrowLeft,
  Check,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth } from '@/context/AuthContext';
import type { UserRole } from '@/types';
import { toast } from 'sonner';

const roles: { value: UserRole; label: string; description: string; icon: any }[] = [
  {
    value: 'learner',
    label: 'Learner',
    description: 'Access skills programs and earn credits',
    icon: GraduationCap,
  },
  {
    value: 'skills_provider',
    label: 'Skills Provider',
    description: 'Teach skills and earn from your expertise',
    icon: Users,
  },
  {
    value: 'event_coordinator',
    label: 'Event Coordinator',
    description: 'Organize events and earn commissions',
    icon: Calendar,
  },
];

// Password strength checker
interface PasswordStrength {
  score: number;
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

const checkPasswordStrength = (password: string): PasswordStrength => {
  return {
    score: [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /\d/.test(password),
      /[@$!%*?&]/.test(password),
    ].filter(Boolean).length,
    hasMinLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[@$!%*?&]/.test(password),
  };
};

// Validate South African phone number
const validatePhoneNumber = (phone: string): boolean => {
  if (!phone) return true; // Optional field
  const saPhoneRegex = /^(\+27|0)[6-8][0-9]{8}$/;
  return saPhoneRegex.test(phone.replace(/\s/g, ''));
};

export function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'learner' as UserRole,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const navigate = useNavigate();
  const { register } = useAuth();

  const passwordStrength = useMemo(() => 
    checkPasswordStrength(formData.password),
    [formData.password]
  );

  const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== '';

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim() || formData.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    if (!formData.lastName.trim() || formData.lastName.length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.phone && !validatePhoneNumber(formData.phone)) {
      newErrors.phone = 'Please enter a valid South African phone number (e.g., +27 60 735 3608)';
    }

    if (passwordStrength.score < 5) {
      newErrors.password = 'Password does not meet all requirements';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleContinue = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: formData.role,
        phone: formData.phone,
      });
      toast.success('Registration successful! Welcome to Zamangwane Foundation.');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStrengthColor = (score: number): string => {
    if (score <= 2) return 'bg-red-500';
    if (score <= 3) return 'bg-yellow-500';
    if (score <= 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthLabel = (score: number): string => {
    if (score <= 2) return 'Weak';
    if (score <= 3) return 'Fair';
    if (score <= 4) return 'Good';
    return 'Strong';
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-zamangwane-background via-white to-zamangwane-background">
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
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-start">
        {/* Left Side - Info */}
        <div className="hidden lg:block sticky top-24">
          <div className="mb-8">
            <Link to="/" className="flex items-center gap-2 mb-8">
              <div className="w-12 h-12 bg-zamangwane-orange rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">Z</span>
              </div>
              <span className="font-bold text-2xl text-zamangwane-text">
                Zamangwane
              </span>
            </Link>
            <h1 className="text-4xl font-bold text-zamangwane-text mb-4">
              Join Our Community
            </h1>
            <p className="text-gray-600 text-lg">
              Create an account to access skills programs, events, and opportunities 
              to grow personally and professionally.
            </p>
          </div>

          <div className="space-y-4">
            {[
              'Free registration for all users',
              'Access to skills development programs',
              'Earn credits and rewards',
              'Connect with a supportive community',
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-zamangwane-orange flex-shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Form */}
        <Card className="border-0 shadow-card rounded-3xl">
          <CardContent className="p-8 lg:p-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-zamangwane-text mb-2">
                Create Account
              </h2>
              <p className="text-gray-600">
                Fill in your details to get started
              </p>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className={`flex items-center gap-2 ${step >= 1 ? 'text-zamangwane-orange' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-zamangwane-orange text-white' : 'bg-gray-200'}`}>
                  1
                </div>
                <span className="text-sm font-medium hidden sm:block">Personal Info</span>
              </div>
              <div className="w-12 h-0.5 bg-gray-200">
                <div className={`h-full bg-zamangwane-orange transition-all ${step >= 2 ? 'w-full' : 'w-0'}`} />
              </div>
              <div className={`flex items-center gap-2 ${step >= 2 ? 'text-zamangwane-orange' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-zamangwane-orange text-white' : 'bg-gray-200'}`}>
                  2
                </div>
                <span className="text-sm font-medium hidden sm:block">Account Type</span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-6 animate-fade-in-up">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="John"
                          required
                          className={`pl-12 py-5 rounded-xl ${errors.firstName ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Doe"
                          required
                          className={`pl-12 py-5 rounded-xl ${errors.lastName ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                    </div>
                  </div>

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
                        className={`pl-12 py-5 rounded-xl ${errors.email ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+27 60 735 3608"
                        className={`pl-12 py-5 rounded-xl ${errors.phone ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                    <p className="text-xs text-gray-500">South African format: +27 60 735 3608 or 060 735 3608</p>
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
                        placeholder="Create a strong password"
                        required
                        className={`pl-12 pr-12 py-5 rounded-xl ${errors.password ? 'border-red-500' : ''}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                    
                    {/* Password Strength Indicator */}
                    {formData.password && (
                      <div className="space-y-2 mt-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Password Strength</span>
                          <span className={`text-sm font-medium ${
                            passwordStrength.score <= 2 ? 'text-red-500' :
                            passwordStrength.score <= 3 ? 'text-yellow-500' :
                            passwordStrength.score <= 4 ? 'text-blue-500' : 'text-green-500'
                          }`}>
                            {getStrengthLabel(passwordStrength.score)}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-300 ${getStrengthColor(passwordStrength.score)}`}
                            style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className={`flex items-center gap-1 ${passwordStrength.hasMinLength ? 'text-green-600' : 'text-gray-400'}`}>
                            {passwordStrength.hasMinLength ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                            At least 8 characters
                          </div>
                          <div className={`flex items-center gap-1 ${passwordStrength.hasUppercase ? 'text-green-600' : 'text-gray-400'}`}>
                            {passwordStrength.hasUppercase ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                            One uppercase letter
                          </div>
                          <div className={`flex items-center gap-1 ${passwordStrength.hasLowercase ? 'text-green-600' : 'text-gray-400'}`}>
                            {passwordStrength.hasLowercase ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                            One lowercase letter
                          </div>
                          <div className={`flex items-center gap-1 ${passwordStrength.hasNumber ? 'text-green-600' : 'text-gray-400'}`}>
                            {passwordStrength.hasNumber ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                            One number
                          </div>
                          <div className={`flex items-center gap-1 ${passwordStrength.hasSpecialChar ? 'text-green-600' : 'text-gray-400'}`}>
                            {passwordStrength.hasSpecialChar ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                            One special character
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        required
                        className={`pl-12 pr-12 py-5 rounded-xl ${errors.confirmPassword ? 'border-red-500' : passwordsMatch ? 'border-green-500' : ''}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
                    {passwordsMatch && !errors.confirmPassword && (
                      <p className="text-sm text-green-600 flex items-center gap-1">
                        <Check className="h-4 w-4" /> Passwords match
                      </p>
                    )}
                  </div>

                  <Button
                    type="button"
                    onClick={handleContinue}
                    size="lg"
                    className="w-full rounded-full bg-zamangwane-orange hover:bg-zamangwane-orange/90 text-white py-6 transition-all"
                  >
                    Continue
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 animate-fade-in-up">
                  <div className="space-y-4">
                    <Label>Select Account Type</Label>
                    <RadioGroup
                      value={formData.role}
                      onValueChange={(value) => setFormData({ ...formData, role: value as UserRole })}
                      className="space-y-3"
                    >
                      {roles.map((role) => (
                        <label
                          key={role.value}
                          className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            formData.role === role.value
                              ? 'border-zamangwane-orange bg-zamangwane-orange/5'
                              : 'border-gray-200 hover:border-zamangwane-orange/50'
                          }`}
                        >
                          <RadioGroupItem value={role.value} id={role.value} className="sr-only" />
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            formData.role === role.value ? 'bg-zamangwane-orange' : 'bg-gray-100'
                          }`}>
                            <role.icon className={`h-6 w-6 ${
                              formData.role === role.value ? 'text-white' : 'text-gray-500'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <p className={`font-semibold ${
                              formData.role === role.value ? 'text-zamangwane-orange' : 'text-zamangwane-text'
                            }`}>
                              {role.label}
                            </p>
                            <p className="text-sm text-gray-500">{role.description}</p>
                          </div>
                        </label>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                      size="lg"
                      className="flex-1 rounded-full py-6 border-zamangwane-text text-zamangwane-text hover:bg-zamangwane-text hover:text-white transition-all"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isLoading}
                      className="flex-1 rounded-full bg-zamangwane-orange hover:bg-zamangwane-orange/90 text-white py-6 transition-all"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                          Creating...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Create Account
                          <ArrowRight className="h-5 w-5" />
                        </span>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="text-zamangwane-orange font-medium hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
              <Shield className="h-4 w-4" />
              <span>Your information is secure and encrypted</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
