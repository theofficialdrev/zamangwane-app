import { Search, ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zamangwane-background px-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-zamangwane-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Search className="h-12 w-12 text-zamangwane-orange" />
        </div>
        <h1 className="text-6xl font-bold text-zamangwane-text mb-4">
          404
        </h1>
        <h2 className="text-2xl font-bold text-zamangwane-text mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved. 
          Please check the URL or navigate back to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="rounded-full bg-zamangwane-orange hover:bg-zamangwane-orange/90 text-white">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <button onClick={() => window.history.back()}>
            <Button variant="outline" className="rounded-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </button>
        </div>
      </div>
    </div>
  );
}
