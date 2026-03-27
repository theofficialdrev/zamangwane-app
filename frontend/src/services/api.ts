import { toast } from 'sonner';

// FORCE production backend URL (fallback removed)
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  'https://backend-service-production-667f.up.railway.app/api';

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
      ...(options.headers as Record<string, string>),
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
        const errorMessage =
          data.message || data.error || 'An error occurred';

        if (response.status === 401) {
          this.setToken(null);
          window.location.href = '/#/login';
        }

        throw new Error(errorMessage);
      }

      return { data };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Network error';
      return { error: errorMessage };
    }
  }

// ================= SKILLS PROVIDER =================

async getSkillsProviderDashboard() {
  return this.request('/skills-provider/dashboard');
}

async getMyProducts() {
  return this.request('/skills-provider/products');
}

async getCategories() {
  return this.request('/skills-provider/categories');
}

async createProduct(data: any) {
  return this.request('/skills-provider/products', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

async updateProduct(id: number, data: any) {
  return this.request(`/skills-provider/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

async deleteProduct(id: number) {
  return this.request(`/skills-provider/products/${id}`, {
    method: 'DELETE',
  });
}


// ================= EVENT COORDINATOR =================

async getEventCoordinatorDashboard() {
  return this.request('/event-coordinator/dashboard');
}

async getMyEvents() {
  return this.request('/event-coordinator/events');
}

async createEvent(data: any) {
  return this.request('/event-coordinator/events', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

async updateEvent(id: number, data: any) {
  return this.request(`/event-coordinator/events/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

async cancelEvent(id: number) {
  return this.request(`/event-coordinator/events/${id}`, {
    method: 'DELETE',
  });
}

async getEventDetails(id: number) {
  return this.request(`/event-coordinator/events/${id}`);
}

  // ================= AUTH =================

  async login(email: string, password: string) {
    const response = await this.request<{
      user: any;
      token: string;
      message: string;
    }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.data?.token) {
      this.setToken(response.data.token);
    }

    return response;
  }

  async register(userData: any) {
    const response = await this.request<{
      user: any;
      token: string;
      message: string;
    }>('/auth/register', {
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

  async updateProfile(profileData: any) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async changePassword(currentPassword: string, newPassword: string) {
    return this.request('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  // ================= USER =================

  async getUserDashboard() {
    return this.request('/user/dashboard');
  }

  async getMyTickets() {
    return this.request('/user/tickets');
  }

  async getMyTransactions(page = 1, limit = 20) {
    return this.request(`/user/transactions?page=${page}&limit=${limit}`);
  }

  async getMyOrders(page = 1, limit = 20) {
    return this.request(`/user/orders?page=${page}&limit=${limit}`);
  }

  async getMyReferrals() {
    return this.request('/user/referrals');
  }

  async markNotificationRead(notificationId: number) {
    return this.request(`/user/notifications/${notificationId}/read`, {
      method: 'PUT',
    });
  }

  async markAllNotificationsRead() {
    return this.request('/user/notifications/read-all', {
      method: 'PUT',
    });
  }

  // ================= ADMIN =================

  async getAdminDashboardStats() {
    return this.request('/admin/dashboard-stats');
  }

  async getAllUsers(params?: any) {
    const queryParams = new URLSearchParams(params);
    return this.request(`/admin/users?${queryParams}`);
  }

  async approveUser(userId: number, status: string) {
    return this.request(`/admin/users/${userId}/approve`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  async suspendUser(userId: number) {
    return this.request(`/admin/users/${userId}/suspend`, {
      method: 'PUT',
    });
  }

  // ================= PAYMENTS =================

  async createTicketPayment(eventId: number, ticketType = 'basic') {
    return this.request('/payments/ticket', {
      method: 'POST',
      body: JSON.stringify({ eventId, ticketType }),
    });
  }

  async createCheckoutPayment(shippingAddress: any) {
    return this.request('/payments/checkout', {
      method: 'POST',
      body: JSON.stringify({ shippingAddress }),
    });
  }

  async getPaymentStatus(orderNumber: string) {
    return this.request(`/payments/status/${orderNumber}`);
  }

  // ================= HEALTH =================

  async healthCheck() {
    return this.request('/health');
  }
}

export const apiService = new ApiService();

export const handleApiError = (error: any, defaultMessage = 'An error occurred') => {
  const message = error?.message || error?.error || defaultMessage;
  toast.error(message);
  return message;
};

export const showSuccessMessage = (message: string) => {
  toast.success(message);
};