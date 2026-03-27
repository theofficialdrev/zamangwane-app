import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { apiService } from '@/services/api';
import { 
  LayoutDashboard, 
  User, 
  CreditCard, 
  Ticket,
  ShoppingBag,
  Users,
  Calendar,
  TrendingUp,
  Settings,
  LogOut,
  Wallet,
  Award,
  BarChart3,
  CheckCircle,
  XCircle,
  Clock,
  ArrowLeft,
  Bell,
  RefreshCw,
  Package,
  Plus,
  Edit,
  Trash2,
  Eye,
  DollarSign,
  Tag,
  AlertTriangle,
  ClipboardList
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn, formatCurrency, formatDate } from '@/lib/utils';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Navigation items based on role
const getNavItems = (role: string) => {
  const baseItems = [
    { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { label: 'My Profile', href: '/profile', icon: User },
    { label: 'My Tickets', href: '/my-tickets', icon: Ticket },
    { label: 'Transactions', href: '/dashboard/transactions', icon: Wallet },
    { label: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  if (role === 'skills_provider') {
    return [
      { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
      { label: 'My Products', href: '/dashboard/products', icon: Package },
      { label: 'Sales', href: '/dashboard/sales', icon: TrendingUp },
      { label: 'Transactions', href: '/dashboard/transactions', icon: Wallet },
      { label: 'Settings', href: '/dashboard/settings', icon: Settings },
    ];
  }

  if (role === 'event_coordinator') {
    return [
      { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
      { label: 'My Events', href: '/dashboard/events', icon: Calendar },
      { label: 'Tickets', href: '/dashboard/tickets', icon: Ticket },
      { label: 'Revenue', href: '/dashboard/revenue', icon: TrendingUp },
      { label: 'Settings', href: '/dashboard/settings', icon: Settings },
    ];
  }

  if (role === 'admin') {
    return [
      { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
      { label: 'Users', href: '/dashboard/users', icon: Users },
      { label: 'Approvals', href: '/dashboard/approvals', icon: CheckCircle },
      { label: 'Transactions', href: '/dashboard/transactions', icon: Wallet },
      { label: 'Settings', href: '/dashboard/settings', icon: Settings },
    ];
  }

  return baseItems;
};

// Learner Dashboard Content
function LearnerDashboard() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

 const fetchDashboardData = async () => {
  try {
    setIsLoading(true);

    const [dashboardRes, productsRes, categoriesRes]: any = await Promise.all([
      apiService.getSkillsProviderDashboard(),
      apiService.getMyProducts(),
      apiService.getCategories(),
    ]);

    setDashboardData(dashboardRes?.data || {});
    setProducts(productsRes?.data?.products || []);
    setCategories(categoriesRes?.data?.categories || []);

  } catch (error) {
    toast.error('Failed to load dashboard data');
  } finally {
    setIsLoading(false);
  }
};

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-zamangwane-orange" />
      </div>
    );
  }

  const stats = dashboardData?.stats || {};
  const upcomingEvents = dashboardData?.upcomingEvents || [];
  const recentTransactions = dashboardData?.recentTransactions || [];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-soft rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Credit Balance</p>
                <p className="text-2xl font-bold text-zamangwane-text">{stats.credits || 0}</p>
              </div>
              <div className="w-12 h-12 bg-zamangwane-orange/10 rounded-xl flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-zamangwane-orange" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-soft rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Earnings</p>
                <p className="text-2xl font-bold text-zamangwane-text">{formatCurrency(stats.totalEarnings || 0)}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-soft rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">My Tickets</p>
                <p className="text-2xl font-bold text-zamangwane-text">{stats.ticketCount || 0}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Ticket className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-soft rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Referrals</p>
                <p className="text-2xl font-bold text-zamangwane-text">{stats.referralCount || 0}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming Events */}
        <Card className="border-0 shadow-soft rounded-2xl lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold">Upcoming Events</CardTitle>
            <Link to="/school-events">
              <Button variant="ghost" size="sm" className="text-zamangwane-orange hover:bg-zamangwane-orange/10">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {upcomingEvents.length > 0 ? (
              <div className="space-y-4">
                {upcomingEvents.map((event: any) => (
                  <div key={event.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-zamangwane-text">{event.title}</h4>
                      <p className="text-sm text-gray-500">{formatDate(event.date)}</p>
                    </div>
                    <Badge className="rounded-full bg-zamangwane-orange text-white hover:bg-zamangwane-orange/90">
                      {event.region}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No upcoming events</p>
                <Link to="/school-events">
                  <Button variant="outline" size="sm" className="mt-4 rounded-full hover:bg-zamangwane-orange hover:text-white hover:border-zamangwane-orange">
                    Browse Events
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-0 shadow-soft rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/school-events">
              <Button variant="outline" className="w-full justify-start rounded-xl hover:bg-zamangwane-orange hover:text-white hover:border-zamangwane-orange transition-all">
                <Ticket className="h-4 w-4 mr-2" />
                Buy Tickets
              </Button>
            </Link>
            <Link to="/shop">
              <Button variant="outline" className="w-full justify-start rounded-xl hover:bg-zamangwane-orange hover:text-white hover:border-zamangwane-orange transition-all">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Shop Products
              </Button>
            </Link>
            <Link to="/skills">
              <Button variant="outline" className="w-full justify-start rounded-xl hover:bg-zamangwane-orange hover:text-white hover:border-zamangwane-orange transition-all">
                <Award className="h-4 w-4 mr-2" />
                Browse Skills
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="w-full justify-start rounded-xl hover:bg-zamangwane-orange hover:text-white hover:border-zamangwane-orange transition-all"
              onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}/#/register?ref=${dashboardData?.user?.referralCode || ''}`);
                toast.success('Referral link copied to clipboard!');
              }}
            >
              <Users className="h-4 w-4 mr-2" />
              Copy Referral Link
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="border-0 shadow-soft rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-bold">Recent Transactions</CardTitle>
          <Link to="/dashboard/transactions">
            <Button variant="ghost" size="sm" className="text-zamangwane-orange hover:bg-zamangwane-orange/10">
              View All
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {recentTransactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Type</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Description</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Amount</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((transaction: any) => (
                    <tr key={transaction.id} className="border-b border-gray-50 last:border-0">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {transaction.type === 'ticket_purchase' && <Ticket className="h-4 w-4 text-blue-500" />}
                          {transaction.type === 'product_purchase' && <ShoppingBag className="h-4 w-4 text-green-500" />}
                          {transaction.type === 'commission' && <TrendingUp className="h-4 w-4 text-zamangwane-orange" />}
                          {transaction.type === 'referral_bonus' && <Users className="h-4 w-4 text-purple-500" />}
                          <span className="text-sm capitalize">{transaction.type.replace(/_/g, ' ')}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">{transaction.description}</td>
                      <td className="py-3 px-4 text-sm font-medium">
                        {transaction.type === 'commission' || transaction.type === 'referral_bonus' ? '+' : '-'}
                        {formatCurrency(transaction.amount)}
                      </td>
                      <td className="py-3 px-4">
                        <Badge 
                          variant="secondary" 
                          className={`rounded-full text-xs ${
                            transaction.status === 'completed' 
                              ? 'bg-green-100 text-green-700 hover:bg-green-100' 
                              : transaction.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                              : 'bg-red-100 text-red-700 hover:bg-red-100'
                          }`}
                        >
                          {transaction.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500">
                        {formatDate(transaction.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Wallet className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No transactions yet</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Skills Provider Dashboard
function SkillsProviderDashboard() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [deleteProductId, setDeleteProductId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    categoryId: '',
    image: '',
  });

  const fetchDashboardData = async () => {
  try {
    setIsLoading(true);

    const [dashboardRes, productsRes, categoriesRes]: any = await Promise.all([
      apiService.getSkillsProviderDashboard(),
      apiService.getMyProducts(),
      apiService.getCategories(),
    ]);

    setDashboardData(dashboardRes?.data || {});
    setProducts(productsRes?.data?.products || []);
    setCategories(categoriesRes?.data?.categories || []);
  } catch (error) {
    toast.error('Failed to load dashboard data');
  } finally {
    setIsLoading(false);
  }
};

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleCreateProduct = async () => {
    try {
      const response = await apiService.createProduct({
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        categoryId: formData.categoryId ? parseInt(formData.categoryId) : undefined,
        image: formData.image,
      });

      if (response.data) {
        toast.success('Product created successfully');
        setShowAddDialog(false);
        setFormData({ name: '', description: '', price: '', stock: '', categoryId: '', image: '' });
        fetchDashboardData();
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to create product');
    }
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;

    try {
      const response = await apiService.updateProduct(editingProduct.id, {
        name: formData.name,
        description: formData.description,
        price: formData.price ? parseFloat(formData.price) : undefined,
        stock: formData.stock ? parseInt(formData.stock) : undefined,
        categoryId: formData.categoryId ? parseInt(formData.categoryId) : undefined,
        image: formData.image,
      });

      if (response.data) {
        toast.success('Product updated successfully');
        setEditingProduct(null);
        setFormData({ name: '', description: '', price: '', stock: '', categoryId: '', image: '' });
        fetchDashboardData();
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update product');
    }
  };

  const handleDeleteProduct = async () => {
    if (!deleteProductId) return;

    try {
      await apiService.deleteProduct(deleteProductId);
      toast.success('Product deleted successfully');
      setDeleteProductId(null);
      fetchDashboardData();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete product');
    }
  };

  const openEditDialog = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price.toString(),
      stock: product.stock.toString(),
      categoryId: product.category_id?.toString() || '',
      image: product.image || '',
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-zamangwane-orange" />
      </div>
    );
  }

  const stats = dashboardData?.stats || {};
  const recentOrders = dashboardData?.recentOrders || [];
  const lowStockProducts = dashboardData?.lowStockProducts || [];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-soft rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Products</p>
                <p className="text-2xl font-bold text-zamangwane-text">{stats.totalProducts || 0}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-soft rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Products</p>
                <p className="text-2xl font-bold text-zamangwane-text">{stats.activeProducts || 0}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-soft rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Sales</p>
                <p className="text-2xl font-bold text-zamangwane-text">{stats.totalSales || 0}</p>
              </div>
              <div className="w-12 h-12 bg-zamangwane-orange/10 rounded-xl flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-zamangwane-orange" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-soft rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold text-zamangwane-text">{formatCurrency(stats.totalRevenue || 0)}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* My Products */}
        <Card className="border-0 shadow-soft rounded-2xl lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold">My Products</CardTitle>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button size="sm" className="rounded-full bg-zamangwane-orange hover:bg-zamangwane-orange/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Product Name</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter product name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Enter product description"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Price (R)</Label>
                      <Input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        placeholder="0.00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Stock</Label>
                      <Input
                        type="number"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select
                      value={formData.categoryId}
                      onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id.toString()}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Image URL</Label>
                    <Input
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddDialog(false)} className="rounded-full border-zamangwane-text text-zamangwane-text hover:bg-zamangwane-text hover:text-white">
                    Cancel
                  </Button>
                  <Button onClick={handleCreateProduct} className="rounded-full bg-zamangwane-orange hover:bg-zamangwane-orange/90">
                    Create Product
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {products.length > 0 ? (
              <div className="space-y-4">
                {products.map((product: any) => (
                  <div key={product.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <img 
                      src={product.image || '/placeholder-product.jpg'} 
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-zamangwane-text">{product.name}</h4>
                      <p className="text-sm text-gray-500">{formatCurrency(product.price)} • Stock: {product.stock}</p>
                    </div>
                    <Badge className={`rounded-full ${
                      product.status === 'active' 
                        ? 'bg-green-100 text-green-700 hover:bg-green-100' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-100'
                    }`}>
                      {product.status}
                    </Badge>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => openEditDialog(product)}
                        className="hover:bg-zamangwane-orange/10 hover:text-zamangwane-orange"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => setDeleteProductId(product.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No products yet</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4 rounded-full hover:bg-zamangwane-orange hover:text-white hover:border-zamangwane-orange"
                  onClick={() => setShowAddDialog(true)}
                >
                  Add Your First Product
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card className="border-0 shadow-soft rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Low Stock Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            {lowStockProducts.length > 0 ? (
              <div className="space-y-3">
                {lowStockProducts.map((product: any) => (
                  <div key={product.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-xl">
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-yellow-600">Only {product.stock} left</p>
                    </div>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => openEditDialog(product)}
                      className="hover:bg-yellow-100"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle className="h-12 w-12 mx-auto mb-3 opacity-50 text-green-500" />
                <p>All products well stocked</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="border-0 shadow-soft rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {recentOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Order</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Customer</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Items</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Total</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order: any) => (
                    <tr key={order.id} className="border-b border-gray-50 last:border-0">
                      <td className="py-3 px-4 text-sm font-medium">{order.order_number}</td>
                      <td className="py-3 px-4 text-sm">{order.first_name} {order.last_name}</td>
                      <td className="py-3 px-4 text-sm">{order.items?.length || 0} items</td>
                      <td className="py-3 px-4 text-sm font-medium">{formatCurrency(order.total_amount)}</td>
                      <td className="py-3 px-4">
                        <Badge className={`rounded-full text-xs ${
                          order.status === 'paid' 
                            ? 'bg-green-100 text-green-700 hover:bg-green-100' 
                            : order.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-100'
                        }`}>
                          {order.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <ClipboardList className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No orders yet</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Product Dialog */}
      <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Product Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter product name"
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter product description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Price (R)</Label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label>Stock</Label>
                <Input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  placeholder="0"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={formData.categoryId}
                onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id.toString()}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingProduct(null)} className="rounded-full border-zamangwane-text text-zamangwane-text hover:bg-zamangwane-text hover:text-white">
              Cancel
            </Button>
            <Button onClick={handleUpdateProduct} className="rounded-full bg-zamangwane-orange hover:bg-zamangwane-orange/90">
              Update Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteProductId} onOpenChange={() => setDeleteProductId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteProduct}
              className="rounded-full bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// Event Coordinator Dashboard
function EventCoordinatorDashboard() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState<any[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [cancelEventId, setCancelEventId] = useState<number | null>(null);
  const [viewEvent, setViewEvent] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    province: '',
    region: '',
    maxAttendees: '',
    ticketPrice: '',
    image: '',
  });

  const fetchDashboardData = async () => {
  try {
    setIsLoading(true);

    const [dashboardRes, eventsRes]: any = await Promise.all([
      apiService.getEventCoordinatorDashboard(),
      apiService.getMyEvents(),
    ]);

    setDashboardData(dashboardRes?.data || {});
    setEvents(eventsRes?.data?.events || []);
  } catch (error) {
    toast.error('Failed to load dashboard data');
  } finally {
    setIsLoading(false);
  }
};

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleCreateEvent = async () => {
    try {
      const response = await apiService.createEvent({
        title: formData.title,
        description: formData.description,
        date: formData.date,
        time: formData.time,
        location: formData.location,
        province: formData.province,
        region: formData.region,
        maxAttendees: formData.maxAttendees ? parseInt(formData.maxAttendees) : undefined,
        ticketPrice: formData.ticketPrice ? parseFloat(formData.ticketPrice) : undefined,
        image: formData.image,
      });

      if (response.data) {
        toast.success('Event created successfully');
        setShowAddDialog(false);
        setFormData({ title: '', description: '', date: '', time: '', location: '', province: '', region: '', maxAttendees: '', ticketPrice: '', image: '' });
        fetchDashboardData();
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to create event');
    }
  };

  const handleUpdateEvent = async () => {
    if (!editingEvent) return;

    try {
      const response = await apiService.updateEvent(editingEvent.id, {
        title: formData.title,
        description: formData.description,
        date: formData.date,
        time: formData.time,
        location: formData.location,
        province: formData.province,
        region: formData.region,
        maxAttendees: formData.maxAttendees ? parseInt(formData.maxAttendees) : undefined,
        ticketPrice: formData.ticketPrice ? parseFloat(formData.ticketPrice) : undefined,
        image: formData.image,
      });

      if (response.data) {
        toast.success('Event updated successfully');
        setEditingEvent(null);
        setFormData({ title: '', description: '', date: '', time: '', location: '', province: '', region: '', maxAttendees: '', ticketPrice: '', image: '' });
        fetchDashboardData();
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update event');
    }
  };

  const handleCancelEvent = async () => {
    if (!cancelEventId) return;

    try {
      await apiService.cancelEvent(cancelEventId);
      toast.success('Event cancelled and refunds processed');
      setCancelEventId(null);
      fetchDashboardData();
    } catch (error: any) {
      toast.error(error.message || 'Failed to cancel event');
    }
  };

  const openEditDialog = (event: any) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description || '',
      date: event.date ? new Date(event.date).toISOString().split('T')[0] : '',
      time: event.time || '',
      location: event.location || '',
      province: event.province || '',
      region: event.region || '',
      maxAttendees: event.max_attendees?.toString() || '',
      ticketPrice: event.ticket_price?.toString() || '',
      image: event.image || '',
    });
  };

  const handleViewEvent = async (eventId: number) => {
    try {
      const response = await apiService.getEventDetails(eventId);
      if (response.data) {
        setViewEvent(response.data);
      }
    } catch (error) {
      toast.error('Failed to load event details');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-zamangwane-orange" />
      </div>
    );
  }

  const stats = dashboardData?.stats || {};
  const recentTickets = dashboardData?.recentTickets || [];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-soft rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Events</p>
                <p className="text-2xl font-bold text-zamangwane-text">{stats.totalEvents || 0}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-soft rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Upcoming</p>
                <p className="text-2xl font-bold text-zamangwane-text">{stats.upcomingEvents || 0}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-soft rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Tickets Sold</p>
                <p className="text-2xl font-bold text-zamangwane-text">{stats.ticketsSold || 0}</p>
              </div>
              <div className="w-12 h-12 bg-zamangwane-orange/10 rounded-xl flex items-center justify-center">
                <Ticket className="h-6 w-6 text-zamangwane-orange" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-soft rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold text-zamangwane-text">{formatCurrency(stats.totalRevenue || 0)}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* My Events */}
        <Card className="border-0 shadow-soft rounded-2xl lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold">My Events</CardTitle>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button size="sm" className="rounded-full bg-zamangwane-orange hover:bg-zamangwane-orange/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Event
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Event</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Event Title</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Enter event title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Enter event description"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Time</Label>
                      <Input
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Enter event location"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Province</Label>
                      <Input
                        value={formData.province}
                        onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                        placeholder="e.g., KwaZulu-Natal"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Region</Label>
                      <Input
                        value={formData.region}
                        onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                        placeholder="e.g., Durban"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Max Attendees</Label>
                      <Input
                        type="number"
                        value={formData.maxAttendees}
                        onChange={(e) => setFormData({ ...formData, maxAttendees: e.target.value })}
                        placeholder="100"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Ticket Price (R)</Label>
                      <Input
                        type="number"
                        value={formData.ticketPrice}
                        onChange={(e) => setFormData({ ...formData, ticketPrice: e.target.value })}
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Image URL</Label>
                    <Input
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddDialog(false)} className="rounded-full border-zamangwane-text text-zamangwane-text hover:bg-zamangwane-text hover:text-white">
                    Cancel
                  </Button>
                  <Button onClick={handleCreateEvent} className="rounded-full bg-zamangwane-orange hover:bg-zamangwane-orange/90">
                    Create Event
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {events.length > 0 ? (
              <div className="space-y-4">
                {events.map((event: any) => (
                  <div key={event.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <img 
                      src={event.image || '/placeholder-event.jpg'} 
                      alt={event.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-zamangwane-text">{event.title}</h4>
                      <p className="text-sm text-gray-500">{formatDate(event.date)} • {event.location}</p>
                      <p className="text-xs text-gray-400">
                        {event.tickets_sold || 0} tickets sold • {formatCurrency(event.revenue || 0)} revenue
                      </p>
                    </div>
                    <Badge className={`rounded-full ${
                      event.status === 'upcoming' 
                        ? 'bg-green-100 text-green-700 hover:bg-green-100' 
                        : event.status === 'ongoing'
                        ? 'bg-blue-100 text-blue-700 hover:bg-blue-100'
                        : event.status === 'completed'
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-100'
                        : 'bg-red-100 text-red-700 hover:bg-red-100'
                    }`}>
                      {event.status}
                    </Badge>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleViewEvent(event.id)}
                        className="hover:bg-zamangwane-orange/10 hover:text-zamangwane-orange"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => openEditDialog(event)}
                        className="hover:bg-zamangwane-orange/10 hover:text-zamangwane-orange"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {event.status === 'upcoming' && (
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => setCancelEventId(event.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No events yet</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4 rounded-full hover:bg-zamangwane-orange hover:text-white hover:border-zamangwane-orange"
                  onClick={() => setShowAddDialog(true)}
                >
                  Create Your First Event
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Ticket Sales */}
        <Card className="border-0 shadow-soft rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            {recentTickets.length > 0 ? (
              <div className="space-y-3">
                {recentTickets.slice(0, 5).map((ticket: any) => (
                  <div key={ticket.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-zamangwane-orange/10 rounded-full flex items-center justify-center">
                      <Ticket className="h-5 w-5 text-zamangwane-orange" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{ticket.event_title}</p>
                      <p className="text-xs text-gray-500">{ticket.first_name} {ticket.last_name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">{formatCurrency(ticket.price)}</p>
                      <Badge className="rounded-full text-xs bg-blue-100 text-blue-700 hover:bg-blue-100">
                        {ticket.ticket_type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Ticket className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No ticket sales yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Edit Event Dialog */}
      <Dialog open={!!editingEvent} onOpenChange={() => setEditingEvent(null)}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Event Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter event title"
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter event description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Time</Label>
                <Input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Enter event location"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Max Attendees</Label>
                <Input
                  type="number"
                  value={formData.maxAttendees}
                  onChange={(e) => setFormData({ ...formData, maxAttendees: e.target.value })}
                  placeholder="100"
                />
              </div>
              <div className="space-y-2">
                <Label>Ticket Price (R)</Label>
                <Input
                  type="number"
                  value={formData.ticketPrice}
                  onChange={(e) => setFormData({ ...formData, ticketPrice: e.target.value })}
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingEvent(null)} className="rounded-full border-zamangwane-text text-zamangwane-text hover:bg-zamangwane-text hover:text-white">
              Cancel
            </Button>
            <Button onClick={handleUpdateEvent} className="rounded-full bg-zamangwane-orange hover:bg-zamangwane-orange/90">
              Update Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Event Dialog */}
      <Dialog open={!!viewEvent} onOpenChange={() => setViewEvent(null)}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Event Details</DialogTitle>
          </DialogHeader>
          {viewEvent && (
            <div className="space-y-6 py-4">
              <div className="flex items-start gap-4">
                <img 
                  src={viewEvent.event?.image || '/placeholder-event.jpg'} 
                  alt={viewEvent.event?.title}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold">{viewEvent.event?.title}</h3>
                  <p className="text-gray-500">{formatDate(viewEvent.event?.date)} • {viewEvent.event?.location}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge className="rounded-full bg-zamangwane-orange text-white hover:bg-zamangwane-orange/90">
                      {viewEvent.event?.status}
                    </Badge>
                    <Badge className="rounded-full bg-blue-100 text-blue-700 hover:bg-blue-100">
                      {viewEvent.tickets?.length || 0} tickets sold
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl text-center">
                  <p className="text-2xl font-bold text-zamangwane-text">{formatCurrency(viewEvent.event?.revenue || 0)}</p>
                  <p className="text-sm text-gray-500">Total Revenue</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl text-center">
                  <p className="text-2xl font-bold text-zamangwane-text">{viewEvent.event?.max_attendees || 0}</p>
                  <p className="text-sm text-gray-500">Capacity</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl text-center">
                  <p className="text-2xl font-bold text-zamangwane-text">{formatCurrency(viewEvent.event?.ticket_price || 0)}</p>
                  <p className="text-sm text-gray-500">Ticket Price</p>
                </div>
              </div>

              {viewEvent.ticketTypeBreakdown && viewEvent.ticketTypeBreakdown.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3">Ticket Type Breakdown</h4>
                  <div className="space-y-2">
                    {viewEvent.ticketTypeBreakdown.map((type: any) => (
                      <div key={type.ticket_type} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <Tag className="h-5 w-5 text-zamangwane-orange" />
                          <span className="capitalize">{type.ticket_type}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-500">{type.count} tickets</span>
                          <span className="font-medium">{formatCurrency(type.revenue)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {viewEvent.tickets && viewEvent.tickets.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3">Recent Attendees</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {viewEvent.tickets.slice(0, 10).map((ticket: any) => (
                      <div key={ticket.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-zamangwane-orange/10 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-zamangwane-orange">
                              {ticket.first_name?.charAt(0)}{ticket.last_name?.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{ticket.first_name} {ticket.last_name}</p>
                            <p className="text-xs text-gray-500">{ticket.ticket_number}</p>
                          </div>
                        </div>
                        <Badge className="rounded-full text-xs bg-green-100 text-green-700 hover:bg-green-100">
                          {ticket.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Cancel Confirmation */}
      <AlertDialog open={!!cancelEventId} onOpenChange={() => setCancelEventId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Event</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this event? All ticket holders will be refunded automatically.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full">Keep Event</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleCancelEvent}
              className="rounded-full bg-red-600 hover:bg-red-700"
            >
              Cancel & Refund
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// Admin Dashboard Content
function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

const fetchDashboardData = async () => {
  try {
    setIsLoading(true);
    const response: any = await apiService.getAdminDashboardStats();
    setDashboardData(response?.data || {});
  } catch (error) {
    toast.error('Failed to load dashboard data');
  } finally {
    setIsLoading(false);
  }
};

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleApproveUser = async (userId: number, status: 'approved' | 'rejected') => {
    try {
      const response = await apiService.approveUser(userId, status);
      if (response.data) {
        toast.success(`User ${status} successfully`);
        fetchDashboardData();
      }
    } catch (error) {
      toast.error('Failed to update user status');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-zamangwane-orange" />
      </div>
    );
  }

  const stats = dashboardData?.stats || {};
  const pendingUsers = dashboardData?.pendingUsers || [];
  const recentUsers = dashboardData?.recentUsers || [];
  const recentTransactions = dashboardData?.recentTransactions || [];

  const userCounts = stats.usersByRole?.reduce((acc: any, item: any) => {
    acc[item.role] = parseInt(item.count);
    return acc;
  }, {}) || {};

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-soft rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-2xl font-bold text-zamangwane-text">{stats.totalUsers?.toLocaleString() || 0}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-soft rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending Approvals</p>
                <p className="text-2xl font-bold text-zamangwane-text">{stats.pendingApprovals || 0}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-soft rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Monthly Revenue</p>
                <p className="text-2xl font-bold text-zamangwane-text">{formatCurrency(stats.monthlyRevenue || 0)}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-soft rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Upcoming Events</p>
                <p className="text-2xl font-bold text-zamangwane-text">{stats.upcomingEvents || 0}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* User Management */}
        <Card className="border-0 shadow-soft rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold">User Management</CardTitle>
            <Link to="/dashboard/users">
              <Button variant="ghost" size="sm" className="text-zamangwane-orange hover:bg-zamangwane-orange/10">
                Manage
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Learners</p>
                    <p className="text-sm text-gray-500">{userCounts.learner || 0} active</p>
                  </div>
                </div>
                <Badge className="rounded-full bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Award className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">Skills Providers</p>
                    <p className="text-sm text-gray-500">{userCounts.skills_provider || 0} active</p>
                  </div>
                </div>
                <Badge className="rounded-full bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium">Event Coordinators</p>
                    <p className="text-sm text-gray-500">{userCounts.event_coordinator || 0} active</p>
                  </div>
                </div>
                <Badge className="rounded-full bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pending Approvals */}
        <Card className="border-0 shadow-soft rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold">Pending Approvals</CardTitle>
            <Link to="/dashboard/approvals">
              <Button variant="ghost" size="sm" className="text-zamangwane-orange hover:bg-zamangwane-orange/10">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {pendingUsers.length > 0 ? (
              <div className="space-y-4">
                {pendingUsers.slice(0, 3).map((item: any) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium">{item.first_name} {item.last_name}</p>
                        <p className="text-sm text-gray-500">{item.role.replace('_', ' ')}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-green-600 hover:text-green-700 hover:bg-green-50"
                        onClick={() => handleApproveUser(item.id, 'approved')}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleApproveUser(item.id, 'rejected')}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle className="h-12 w-12 mx-auto mb-3 opacity-50 text-green-500" />
                <p>No pending approvals</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Analytics */}
      <Card className="border-0 shadow-soft rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Platform Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <BarChart3 className="h-8 w-8 text-zamangwane-orange mx-auto mb-3" />
              <p className="text-2xl font-bold text-zamangwane-text">{stats.upcomingEvents || 0}</p>
              <p className="text-sm text-gray-500">Total Events</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <Ticket className="h-8 w-8 text-zamangwane-orange mx-auto mb-3" />
              <p className="text-2xl font-bold text-zamangwane-text">{stats.ticketsSold?.toLocaleString() || 0}</p>
              <p className="text-sm text-gray-500">Tickets Sold</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <ShoppingBag className="h-8 w-8 text-zamangwane-orange mx-auto mb-3" />
              <p className="text-2xl font-bold text-zamangwane-text">{stats.productsSold?.toLocaleString() || 0}</p>
              <p className="text-sm text-gray-500">Products Sold</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <TrendingUp className="h-8 w-8 text-zamangwane-orange mx-auto mb-3" />
              <p className="text-2xl font-bold text-zamangwane-text">{formatCurrency(stats.totalRevenue || 0)}</p>
              <p className="text-sm text-gray-500">Total Revenue</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-soft rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Recent Users</CardTitle>
          </CardHeader>
          <CardContent>
            {recentUsers.length > 0 ? (
              <div className="space-y-3">
                {recentUsers.slice(0, 5).map((user: any) => (
                  <div key={user.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-zamangwane-orange/10 rounded-full flex items-center justify-center">
                      <span className="font-medium text-zamangwane-orange">
                        {user.first_name.charAt(0)}{user.last_name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{user.first_name} {user.last_name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <Badge className={`rounded-full text-xs ${
                      user.status === 'approved' ? 'bg-green-100 text-green-700 hover:bg-green-100' : 
                      user.status === 'pending' ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100' : 
                      'bg-gray-100 text-gray-700 hover:bg-gray-100'
                    }`}>
                      {user.status}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-4">No recent users</p>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            {recentTransactions.length > 0 ? (
              <div className="space-y-3">
                {recentTransactions.slice(0, 5).map((transaction: any) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-sm capitalize">{transaction.type.replace(/_/g, ' ')}</p>
                      <p className="text-xs text-gray-500">{transaction.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">{formatCurrency(transaction.amount)}</p>
                      <p className="text-xs text-gray-500">{formatDate(transaction.created_at)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-4">No recent transactions</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function Dashboard() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = getNavItems(user?.role || 'learner');

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(href);
  };

  // Render the appropriate dashboard based on role
  const renderDashboardContent = () => {
    switch (user?.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'skills_provider':
        return <SkillsProviderDashboard />;
      case 'event_coordinator':
        return <EventCoordinatorDashboard />;
      default:
        return <LearnerDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-zamangwane-background">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-white h-screen sticky top-0 border-r border-gray-100">
          <div className="p-6">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-bold text-xl text-zamangwane-text">Dashboard</span>
            </Link>
          </div>

          <nav className="flex-1 px-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                  isActive(item.href)
                    ? 'bg-zamangwane-orange text-white'
                    : 'text-gray-600 hover:bg-zamangwane-orange/10 hover:text-zamangwane-orange'
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-100">
            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-600 hover:bg-red-50 transition-all"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden hover:bg-zamangwane-orange/10 hover:text-zamangwane-orange"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-zamangwane-text">
                  Welcome back, {user?.firstName}!
                </h1>
                <p className="text-gray-500">
                  Here's what's happening with your account today.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/dashboard/notifications">
                <Button variant="ghost" size="icon" className="relative hover:bg-zamangwane-orange/10 hover:text-zamangwane-orange">
                  <Bell className="h-5 w-5" />
                </Button>
              </Link>
              <div className="text-right hidden sm:block">
                <p className="font-medium text-zamangwane-text">{user?.firstName} {user?.lastName}</p>
                <p className="text-sm text-gray-500 capitalize">{user?.role?.replace('_', ' ')}</p>
              </div>
              <div className="w-12 h-12 bg-zamangwane-orange rounded-full flex items-center justify-center">
                <span className="text-white font-bold">
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </span>
              </div>
            </div>
          </div>

          {/* Dashboard Content Based on Role */}
          {renderDashboardContent()}
        </main>
      </div>
    </div>
  );
}
