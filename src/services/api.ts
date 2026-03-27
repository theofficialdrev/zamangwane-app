import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

class ApiService {
  private baseUrl: string;
  private token: string | null;

  constructor() {
    this.baseUrl = API_BASE_URL;
    this.token = localStorage.getItem('token');
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  getToken(): string | null {
    return this.token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...((options.headers as Record<string, string>) || {}),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.message || data.error || 'An error occurred';
        
        // Handle specific error codes
        if (response.status === 401) {
          this.setToken(null);
          window.location.href = '/#/login';
        }
        
        throw new Error(errorMessage);
      }

      return { data };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Network error';
      return { error: errorMessage };
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    const response = await this.request<{ user: any; token: string; message: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.data?.token) {
      this.setToken(response.data.token);
    }

    return response;
  }

  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
    role?: string;
    province?: string;
    city?: string;
    referralCode?: string;
  }) {
    const response = await this.request<{ user: any; token: string; message: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.data?.token) {
      this.setToken(response.data.token);
    }

    return response;
  }

  async getProfile() {
    return this.request<{ user: any }>('/auth/profile');
  }

  async updateProfile(profileData: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    province?: string;
    city?: string;
    bio?: string;
  }) {
    return this.request<{ user: any; message: string }>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async changePassword(currentPassword: string, newPassword: string) {
    return this.request<{ message: string }>('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  // User dashboard endpoints
  async getUserDashboard() {
    return this.request<{
      stats: any;
      upcomingEvents: any[];
      recentTransactions: any[];
      recentOrders: any[];
      enrolledSkills: any[];
      notifications: any[];
    }>('/user/dashboard');
  }

  async getMyTickets() {
    return this.request<{ tickets: any[] }>('/user/tickets');
  }

  async getMyTransactions(page = 1, limit = 20) {
    return this.request<{ transactions: any[]; pagination: any }>(
      `/user/transactions?page=${page}&limit=${limit}`
    );
  }

  async getMyOrders(page = 1, limit = 20) {
    return this.request<{ orders: any[]; pagination: any }>(
      `/user/orders?page=${page}&limit=${limit}`
    );
  }

  async getMyReferrals() {
    return this.request<{ referrals: any[]; totalCommission: number }>('/user/referrals');
  }

  async markNotificationRead(notificationId: number) {
    return this.request<{ message: string }>(`/user/notifications/${notificationId}/read`, {
      method: 'PUT',
    });
  }

  async markAllNotificationsRead() {
    return this.request<{ message: string }>('/user/notifications/read-all', {
      method: 'PUT',
    });
  }

  // Admin endpoints
  async getAdminDashboardStats() {
    return this.request<{
      stats: any;
      recentUsers: any[];
      pendingUsers: any[];
      recentTransactions: any[];
      monthlyStats: any[];
    }>('/admin/dashboard-stats');
  }

  async getAllUsers(params?: { page?: number; limit?: number; role?: string; status?: string; search?: string }) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.role) queryParams.append('role', params.role);
    if (params?.status) queryParams.append('status', params.status);
    if (params?.search) queryParams.append('search', params.search);

    return this.request<{ users: any[]; pagination: any }>(`/admin/users?${queryParams}`);
  }

  async approveUser(userId: number, status: 'approved' | 'rejected') {
    return this.request<{ message: string; user: any }>(`/admin/users/${userId}/approve`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  async suspendUser(userId: number) {
    return this.request<{ message: string; user: any }>(`/admin/users/${userId}/suspend`, {
      method: 'PUT',
    });
  }

  async getAllTransactions(params?: { page?: number; limit?: number; type?: string; status?: string }) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.type) queryParams.append('type', params.type);
    if (params?.status) queryParams.append('status', params.status);

    return this.request<{ transactions: any[]; pagination: any }>(`/admin/transactions?${queryParams}`);
  }

  async getAllOrders(params?: { page?: number; limit?: number; status?: string }) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.status) queryParams.append('status', params.status);

    return this.request<{ orders: any[]; pagination: any }>(`/admin/orders?${queryParams}`);
  }

  async updateOrderStatus(orderId: number, status: string) {
    return this.request<{ message: string; order: any }>(`/admin/orders/${orderId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // Payment endpoints
  async createTicketPayment(eventId: number, ticketType: 'basic' | 'intermediary' | 'premium' = 'basic') {
    return this.request<{
      message: string;
      paymentUrl: string;
      paymentData: any;
    }>('/payments/ticket', {
      method: 'POST',
      body: JSON.stringify({ eventId, ticketType }),
    });
  }

  async createCheckoutPayment(shippingAddress: any) {
    return this.request<{
      message: string;
      paymentUrl: string;
      paymentData: any;
    }>('/payments/checkout', {
      method: 'POST',
      body: JSON.stringify({ shippingAddress }),
    });
  }

  async getPaymentStatus(orderNumber: string) {
    return this.request<{ order: any }>(`/payments/status/${orderNumber}`);
  }

  // Health check
  async healthCheck() {
    return this.request<{ status: string; timestamp: string; version: string }>('/health');
  }

  // Skills Provider endpoints
  async getSkillsProviderDashboard() {
    return this.request<{
      stats: any;
      recentOrders: any[];
      lowStockProducts: any[];
      monthlySales: any[];
    }>('/skills-provider/dashboard-stats');
  }

  async getMyProducts(params?: { page?: number; limit?: number; status?: string }) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.status) queryParams.append('status', params.status);

    return this.request<{ products: any[]; pagination: any }>(`/skills-provider/products?${queryParams}`);
  }

  async createProduct(productData: {
    name: string;
    description?: string;
    price: number;
    stock?: number;
    categoryId?: number;
    image?: string;
  }) {
    return this.request<{ message: string; product: any }>('/skills-provider/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  async updateProduct(productId: number, productData: {
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    categoryId?: number;
    image?: string;
    status?: string;
  }) {
    return this.request<{ message: string; product: any }>(`/skills-provider/products/${productId}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  }

  async deleteProduct(productId: number) {
    return this.request<{ message: string }>(`/skills-provider/products/${productId}`, {
      method: 'DELETE',
    });
  }

  async getProductSales(productId: number) {
    return this.request<{ sales: any[] }>(`/skills-provider/products/${productId}/sales`);
  }

  async getCategories() {
    return this.request<{ categories: any[] }>('/skills-provider/categories');
  }

  // Event Coordinator endpoints
  async getEventCoordinatorDashboard() {
    return this.request<{
      stats: any;
      myEvents: any[];
      recentTickets: any[];
      monthlyRevenue: any[];
    }>('/event-coordinator/dashboard-stats');
  }

  async getMyEvents(params?: { page?: number; limit?: number; status?: string }) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.status) queryParams.append('status', params.status);

    return this.request<{ events: any[]; pagination: any }>(`/event-coordinator/events?${queryParams}`);
  }

  async createEvent(eventData: {
    title: string;
    description?: string;
    date: string;
    time?: string;
    location: string;
    province?: string;
    region?: string;
    maxAttendees?: number;
    ticketPrice?: number;
    image?: string;
  }) {
    return this.request<{ message: string; event: any }>('/event-coordinator/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  }

  async updateEvent(eventId: number, eventData: {
    title?: string;
    description?: string;
    date?: string;
    time?: string;
    location?: string;
    province?: string;
    region?: string;
    maxAttendees?: number;
    ticketPrice?: number;
    image?: string;
    status?: string;
  }) {
    return this.request<{ message: string; event: any }>(`/event-coordinator/events/${eventId}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
    });
  }

  async deleteEvent(eventId: number) {
    return this.request<{ message: string }>(`/event-coordinator/events/${eventId}`, {
      method: 'DELETE',
    });
  }

  async cancelEvent(eventId: number) {
    return this.request<{ message: string }>(`/event-coordinator/events/${eventId}/cancel`, {
      method: 'PUT',
    });
  }

  async getEventDetails(eventId: number) {
    return this.request<{
      event: any;
      tickets: any[];
      ticketTypeBreakdown: any[];
    }>(`/event-coordinator/events/${eventId}`);
  }

  async getEventTickets(eventId: number) {
    return this.request<{ tickets: any[] }>(`/event-coordinator/events/${eventId}/tickets`);
  }
}

export const apiService = new ApiService();

// Helper function to handle API errors
export const handleApiError = (error: any, defaultMessage = 'An error occurred') => {
  const message = error?.message || error?.error || defaultMessage;
  toast.error(message);
  return message;
};

// Helper function to show success message
export const showSuccessMessage = (message: string) => {
  toast.success(message);
};
