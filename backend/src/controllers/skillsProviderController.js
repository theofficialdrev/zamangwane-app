const { query } = require('../config/database');

// Get Skills Provider Dashboard Stats
const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get total products/services count
    const productsResult = await query(
      'SELECT COUNT(*) as total FROM products WHERE provider_id = $1',
      [userId]
    );

    // Get active products count
    const activeProductsResult = await query(
      'SELECT COUNT(*) as active FROM products WHERE provider_id = $1 AND status = $2',
      [userId, 'active']
    );

    // Get total sales/revenue
    const salesResult = await query(`
      SELECT 
        COALESCE(SUM(oi.quantity), 0) as total_sales,
        COALESCE(SUM(oi.price * oi.quantity), 0) as total_revenue
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE p.provider_id = $1
    `, [userId]);

    // Get recent orders for provider's products
    const recentOrdersResult = await query(`
      SELECT 
        o.id,
        o.order_number,
        o.total_amount,
        o.status,
        o.created_at,
        u.first_name,
        u.last_name,
        json_agg(json_build_object(
          'product_name', p.name,
          'quantity', oi.quantity,
          'price', oi.price
        )) as items
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      JOIN products p ON oi.product_id = p.id
      JOIN users u ON o.user_id = u.id
      WHERE p.provider_id = $1
      GROUP BY o.id, o.order_number, o.total_amount, o.status, o.created_at, u.first_name, u.last_name
      ORDER BY o.created_at DESC
      LIMIT 10
    `, [userId]);

    // Get products with low stock
    const lowStockResult = await query(
      'SELECT * FROM products WHERE provider_id = $1 AND stock < 10 ORDER BY stock ASC',
      [userId]
    );

    // Get monthly sales data for chart
    const monthlySalesResult = await query(`
      SELECT 
        DATE_TRUNC('month', o.created_at) as month,
        COALESCE(SUM(oi.price * oi.quantity), 0) as revenue,
        COALESCE(SUM(oi.quantity), 0) as sales
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      JOIN products p ON oi.product_id = p.id
      WHERE p.provider_id = $1
        AND o.created_at >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '6 months')
      GROUP BY DATE_TRUNC('month', o.created_at)
      ORDER BY month ASC
    `, [userId]);

    res.json({
      stats: {
        totalProducts: parseInt(productsResult.rows[0].total),
        activeProducts: parseInt(activeProductsResult.rows[0].active),
        totalSales: parseInt(salesResult.rows[0].total_sales),
        totalRevenue: parseFloat(salesResult.rows[0].total_revenue),
      },
      recentOrders: recentOrdersResult.rows,
      lowStockProducts: lowStockResult.rows,
      monthlySales: monthlySalesResult.rows
    });
  } catch (err) {
    console.error('Get skills provider dashboard stats error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Get all products for the provider
const getMyProducts = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 20, status } = req.query;
    const offset = (page - 1) * limit;

    let queryStr = 'SELECT * FROM products WHERE provider_id = $1';
    let countQueryStr = 'SELECT COUNT(*) FROM products WHERE provider_id = $1';
    const params = [userId];
    let paramIndex = 2;

    if (status) {
      queryStr += ` AND status = $${paramIndex}`;
      countQueryStr += ` AND status = $${paramIndex}`;
      params.push(status);
      paramIndex++;
    }

    queryStr += ` ORDER BY created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, offset);

    const result = await query(queryStr, params);
    const countResult = await query(countQueryStr, params.slice(0, paramIndex - 1));

    res.json({
      products: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: parseInt(countResult.rows[0].count),
        totalPages: Math.ceil(parseInt(countResult.rows[0].count) / limit)
      }
    });
  } catch (err) {
    console.error('Get my products error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, description, price, stock, categoryId, image } = req.body;

    // Validate required fields
    if (!name || !price) {
      return res.status(400).json({ message: 'Name and price are required.' });
    }

    const result = await query(`
      INSERT INTO products (name, description, price, stock, category_id, image, provider_id, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `, [name, description, price, stock || 0, categoryId, image, userId, 'active']);

    res.status(201).json({
      message: 'Product created successfully.',
      product: result.rows[0]
    });
  } catch (err) {
    console.error('Create product error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    const { name, description, price, stock, categoryId, image, status } = req.body;

    // Check if product belongs to the provider
    const checkResult = await query(
      'SELECT id FROM products WHERE id = $1 AND provider_id = $2',
      [productId, userId]
    );

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found or not authorized.' });
    }

    const result = await query(`
      UPDATE products 
      SET name = COALESCE($1, name),
          description = COALESCE($2, description),
          price = COALESCE($3, price),
          stock = COALESCE($4, stock),
          category_id = COALESCE($5, category_id),
          image = COALESCE($6, image),
          status = COALESCE($7, status),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $8
      RETURNING *
    `, [name, description, price, stock, categoryId, image, status, productId]);

    res.json({
      message: 'Product updated successfully.',
      product: result.rows[0]
    });
  } catch (err) {
    console.error('Update product error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    // Check if product belongs to the provider
    const checkResult = await query(
      'SELECT id FROM products WHERE id = $1 AND provider_id = $2',
      [productId, userId]
    );

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found or not authorized.' });
    }

    await query('DELETE FROM products WHERE id = $1', [productId]);

    res.json({ message: 'Product deleted successfully.' });
  } catch (err) {
    console.error('Delete product error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Get product sales history
const getProductSales = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    // Verify product belongs to provider
    const checkResult = await query(
      'SELECT id FROM products WHERE id = $1 AND provider_id = $2',
      [productId, userId]
    );

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found or not authorized.' });
    }

    const result = await query(`
      SELECT 
        o.id,
        o.order_number,
        oi.quantity,
        oi.price,
        o.status,
        o.created_at,
        u.first_name,
        u.last_name
      FROM order_items oi
      JOIN orders o ON oi.order_id = o.id
      JOIN users u ON o.user_id = u.id
      WHERE oi.product_id = $1
      ORDER BY o.created_at DESC
    `, [productId]);

    res.json({ sales: result.rows });
  } catch (err) {
    console.error('Get product sales error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Get all categories
const getCategories = async (req, res) => {
  try {
    const result = await query('SELECT * FROM categories ORDER BY name ASC');
    res.json({ categories: result.rows });
  } catch (err) {
    console.error('Get categories error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = {
  getDashboardStats,
  getMyProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductSales,
  getCategories
};
