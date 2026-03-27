// User Types
export type UserRole = 'learner' | 'skills_provider' | 'event_coordinator' | 'admin';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isVerified: boolean;
  profileImage?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  userId: string;
  bio?: string;
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  country: string;
  bankName?: string;
  accountNumber?: string;
  accountType?: string;
  branchCode?: string;
  idNumber?: string;
  dateOfBirth?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
  province?: string;
  city?: string;
  referralCode?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// Event Types
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  location: string;
  region: string;
  image?: string;
  maxAttendees?: number;
  currentAttendees: number;
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// Ticket Types
export type TicketType = 'child' | 'adult' | 'vip';

export interface Ticket {
  id: string;
  eventId: string;
  userId: string;
  type: TicketType;
  price: number;
  credits: number;
  quantity: number;
  totalAmount: number;
  purchaseDate: string;
  status: 'active' | 'used' | 'refunded' | 'expired';
  qrCode?: string;
}

export const TICKET_CONFIG: Record<TicketType, { price: number; credits: number; label: string }> = {
  child: { price: 15, credits: 1, label: 'Child' },
  adult: { price: 30, credits: 2, label: 'Adult' },
  vip: { price: 60, credits: 4, label: 'VIP' },
};

// Credit Types
export type ActivityType = 'sports' | 'dance' | 'vocal' | 'music';

export const ACTIVITY_CREDITS: Record<ActivityType, number> = {
  sports: 16,
  dance: 16,
  vocal: 16,
  music: 24,
};

export interface Credit {
  id: string;
  userId: string;
  balance: number;
  totalEarned: number;
  totalUsed: number;
  lastUpdated: string;
}

export interface CreditTransaction {
  id: string;
  userId: string;
  amount: number;
  type: 'earned' | 'used' | 'purchased' | 'bonus';
  description: string;
  referenceId?: string;
  createdAt: string;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  isActive: boolean;
  createdAt: string;
}

// Transaction Types
export interface Transaction {
  id: string;
  userId: string;
  type: 'ticket_purchase' | 'product_purchase' | 'commission' | 'payout' | 'refund';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod?: string;
  paymentReference?: string;
  description: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

// Commission Types
export interface Commission {
  id: string;
  userId: string;
  transactionId: string;
  amount: number;
  percentage: number;
  type: 'learner' | 'coordinator' | 'provider';
  status: 'pending' | 'approved' | 'paid';
  payoutDate?: string;
  createdAt: string;
}

// Referral Types
export interface Referral {
  id: string;
  referrerId: string;
  referredId?: string;
  code: string;
  type: 'learner' | 'coordinator';
  status: 'active' | 'inactive';
  totalConversions: number;
  totalEarnings: number;
  createdAt: string;
}

// Payout Types
export interface Payout {
  id: string;
  userId: string;
  amount: number;
  commissionType: 'learner' | 'coordinator' | 'provider';
  periodStart: string;
  periodEnd: string;
  status: 'calculated' | 'processing' | 'completed' | 'failed';
  bankDetails: {
    bankName: string;
    accountNumber: string;
    accountType: string;
    branchCode: string;
  };
  processedAt?: string;
  createdAt: string;
}

// Contact Types
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  createdAt: string;
}

// Dashboard Types
export interface LearnerDashboard {
  credits: Credit;
  recentTransactions: Transaction[];
  upcomingEvents: Event[];
  referralLink: string;
  totalEarnings: number;
  monthlyStats: {
    month: string;
    earnings: number;
    creditsEarned: number;
  }[];
}

export interface CoordinatorDashboard {
  totalSales: number;
  monthlyCommission: number;
  totalCommission: number;
  recentSales: Transaction[];
  referrals: Referral[];
  monthlyStats: {
    month: string;
    sales: number;
    commission: number;
  }[];
}

export interface ProviderDashboard {
  totalLearners: number;
  activeLearners: number;
  totalEarnings: number;
  pendingEarnings: number;
  recentTrainings: {
    id: string;
    title: string;
    date: string;
    learners: number;
    credits: number;
  }[];
}

export interface AdminDashboard {
  totalUsers: number;
  usersByRole: Record<UserRole, number>;
  pendingApprovals: number;
  totalRevenue: number;
  monthlyRevenue: number;
  recentTransactions: Transaction[];
  upcomingEvents: Event[];
  systemStats: {
    totalEvents: number;
    totalTickets: number;
    totalProducts: number;
    totalPayouts: number;
  };
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
