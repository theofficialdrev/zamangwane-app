import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { apiService } from '@/services/api';
import type { User, UserRole, LoginCredentials, RegisterData } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  hasRole: (roles: UserRole[]) => boolean;
  updateUser: (user: User) => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token and validate it
    const initAuth = async () => {
      const token = apiService.getToken();
      if (token) {
        try {
          const response = await apiService.getProfile();
          if (response.data?.user) {
            setUser(response.data.user);
          } else {
            // Token is invalid, clear it
            apiService.setToken(null);
          }
        } catch {
          apiService.setToken(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await apiService.login(credentials.email, credentials.password);
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      if (response.data?.user) {
        setUser(response.data.user);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await apiService.register({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        role: data.role,
        province: data.province,
        city: data.city,
        referralCode: data.referralCode,
      });
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      if (response.data?.user) {
        setUser(response.data.user);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    apiService.setToken(null);
    setUser(null);
  };

  const hasRole = (roles: UserRole[]): boolean => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const refreshUser = async () => {
    try {
      const response = await apiService.getProfile();
      if (response.data?.user) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Failed to refresh user:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        hasRole,
        updateUser,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function RequireAuth({ children, roles }: { children: ReactNode; roles?: UserRole[] }) {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zamangwane-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zamangwane-orange"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login
    window.location.href = '/#/login';
    return null;
  }

  if (roles && !roles.includes(user!.role)) {
    // Redirect to unauthorized
    window.location.href = '/#/unauthorized';
    return null;
  }

  return <>{children}</>;
}
