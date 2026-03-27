import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { 
  Mail, 
  Camera,
  Save,
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

export function Profile() {
  const { user, updateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    bio: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (user) {
      updateUser({
        ...user,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        phone: profileData.phone,
      });
    }

    toast.success('Profile updated successfully!');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-zamangwane-background py-8">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-zamangwane-text mb-8">My Profile</h1>

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="bg-white rounded-full p-1">
            <TabsTrigger value="personal" className="rounded-full px-6">Personal Info</TabsTrigger>
            <TabsTrigger value="security" className="rounded-full px-6">Security</TabsTrigger>
            <TabsTrigger value="banking" className="rounded-full px-6">Banking Details</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <Card className="border-0 shadow-soft rounded-3xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Profile Photo */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-24 h-24 bg-zamangwane-orange rounded-full flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">
                          {user?.firstName.charAt(0)}{user?.lastName.charAt(0)}
                        </span>
                      </div>
                      <button 
                        type="button"
                        className="absolute bottom-0 right-0 w-8 h-8 bg-zamangwane-text rounded-full flex items-center justify-center text-white hover:bg-zamangwane-orange transition-colors"
                      >
                        <Camera className="h-4 w-4" />
                      </button>
                    </div>
                    <div>
                      <h3 className="font-semibold text-zamangwane-text">Profile Photo</h3>
                      <p className="text-sm text-gray-500">Upload a new profile picture</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleChange}
                        className="rounded-xl py-5"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleChange}
                        className="rounded-xl py-5"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileData.email}
                        onChange={handleChange}
                        disabled
                        className="rounded-xl py-5 bg-gray-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleChange}
                        className="rounded-xl py-5"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={profileData.bio}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-zamangwane-orange focus:ring-1 focus:ring-zamangwane-orange resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={profileData.address}
                      onChange={handleChange}
                      className="rounded-xl py-5"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={profileData.city}
                        onChange={handleChange}
                        className="rounded-xl py-5"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="province">Province</Label>
                      <Input
                        id="province"
                        name="province"
                        value={profileData.province}
                        onChange={handleChange}
                        className="rounded-xl py-5"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={profileData.postalCode}
                        onChange={handleChange}
                        className="rounded-xl py-5"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="rounded-full bg-zamangwane-orange hover:bg-zamangwane-orange/90 text-white px-8"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                        Saving...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Save Changes
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="border-0 shadow-soft rounded-3xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 bg-gray-50 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-zamangwane-orange/10 rounded-xl flex items-center justify-center">
                      <Lock className="h-6 w-6 text-zamangwane-orange" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-zamangwane-text">Change Password</h3>
                      <p className="text-sm text-gray-500">Update your password regularly for security</p>
                    </div>
                  </div>
                  <div className="mt-6 space-y-4">
                    <div className="space-y-2">
                      <Label>Current Password</Label>
                      <Input type="password" className="rounded-xl py-5" />
                    </div>
                    <div className="space-y-2">
                      <Label>New Password</Label>
                      <Input type="password" className="rounded-xl py-5" />
                    </div>
                    <div className="space-y-2">
                      <Label>Confirm New Password</Label>
                      <Input type="password" className="rounded-xl py-5" />
                    </div>
                    <Button className="rounded-full bg-zamangwane-orange hover:bg-zamangwane-orange/90 text-white">
                      Update Password
                    </Button>
                  </div>
                </div>

                <div className="p-6 bg-gray-50 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Mail className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-zamangwane-text">Email Verification</h3>
                      <p className="text-sm text-gray-500">Your email is verified</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="banking">
            <Card className="border-0 shadow-soft rounded-3xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Banking Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-6 bg-yellow-50 rounded-2xl mb-6">
                  <p className="text-sm text-yellow-700">
                    Your banking details are required for receiving commissions and payouts. 
                    This information is securely encrypted and protected.
                  </p>
                </div>

                <form className="space-y-6">
                  <div className="space-y-2">
                    <Label>Bank Name</Label>
                    <Input className="rounded-xl py-5" placeholder="e.g., FNB, Standard Bank" />
                  </div>
                  <div className="space-y-2">
                    <Label>Account Number</Label>
                    <Input className="rounded-xl py-5" placeholder="Your account number" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Account Type</Label>
                      <Input className="rounded-xl py-5" placeholder="Savings/Current" />
                    </div>
                    <div className="space-y-2">
                      <Label>Branch Code</Label>
                      <Input className="rounded-xl py-5" placeholder="Branch code" />
                    </div>
                  </div>
                  <Button className="rounded-full bg-zamangwane-orange hover:bg-zamangwane-orange/90 text-white">
                    Save Banking Details
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
