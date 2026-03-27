import { Shield, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zamangwane-background px-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Shield className="h-12 w-12 text-red-500" />
        </div>
        <h1 className="text-4xl font-bold text-zamangwane-text mb-4">
          Access Denied
        </h1>
        <p className="text-gray-600 mb-8">
          You don't have permission to access this page. Please contact your administrator 
          if you believe this is an error.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/dashboard">
            <Button className="rounded-full bg-zamangwane-orange hover:bg-zamangwane-orange/90 text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go to Dashboard
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" className="rounded-full">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
