const { query } = require('../config/database');

const getDashboardStats = async (req, res) => {
  try {
    // Total users by role
    const usersByRole = await query(`
      SELECT role, COUNT(*) as count 
      FROM users 
      GROUP BY role
    `);

    // Pending approvals count
    const pendingApprovals = await query(`
      SELECT COUNT(*) as count 
      FROM users 
      WHERE status = 'pending' AND role != 'learner'
    `);

    // Monthly revenue
    const monthlyRevenue = await query(`
      SELECT COALESCE(SUM(amount), 0) as total
      FROM transactions
      WHERE type IN ('ticket_purchase', 'product_purchase')
      AND created_at >= DATE_TRUNC('month', CURRENT_DATE)
    `);

    // Total revenue
    const totalRevenue = await query(`
      SELECT COALESCE(SUM(amount), 0) as total
      FROM transactions
      WHERE type IN ('ticket_purchase', 'product_purchase')
    `);

    // Upcoming events count
    const upcomingEvents = await query(`
      SELECT COUNT(*) as count
      FROM events
      WHERE status = 'upcoming' AND date >= CURRENT_DATE
    `);

    // Total tickets sold
    const ticketsSold = await query(`
      SELECT COUNT(*) as count
      FROM tickets
    `);

    // Total products sold
    const productsSold = await query(`
      SELECT COALESCE(SUM(quantity), 0) as total
      FROM order_items
    `);

    // Recent users
    const recentUsers = await query(`
      SELECT id, first_name, last_name, email, role, status, created_at
      FROM users
      ORDER BY created_at DESC
      LIMIT 10
    `);

    // Pending approval users
    const pendingUsers = await query(`
      SELECT id, first_name, last_name, email, role, created_at
      FROM users
      WHERE status = 'pending' AND role != 'learner'
      ORDER BY created_at DESC
      LIMIT 10
    `);

    // Recent transactions
    const recentTransactions = await query(`
      SELECT t.id, t.type, t.amount, t.description, t.status, t.created_at,
             u.first_name, u.last_name
      FROM transactions t
      JOIN users u ON t.user_id = u.id
      ORDER BY t.created_at DESC
      LIMIT 10
    `);

    // Monthly stats for chart
    const monthlyStats = await query(`
      SELECT 
        DATE_TRUNC('month', created_at) as month,
        COUNT(*) as count,
        COALESCE(SUM(amount), 0) as revenue
      FROM transactions
      WHERE created_at >= CURRENT_DATE - INTERVAL '6 months'
      GROUP BY DATE_TRUNC('month', created_at)
      ORDER BY month
    `);

    res.json({
      stats: {
        totalUsers: usersByRole.rows.reduce((acc, row) => acc + parseInt(row.count), 0),
        usersByRole: usersByRole.rows,
        pendingApprovals: parseInt(pendingApprovals.rows[0].count),
        monthlyRevenue: parseFloat(monthlyRevenue.rows[0].total),
        totalRevenue: parseFloat(totalRevenue.rows[0].total),
        upcomingEvents: parseInt(upcomingEvents.rows[0].count),
        ticketsSold: parseInt(ticketsSold.rows[0].count),
        productsSold: parseInt(productsSold.rows[0].total)
      },
      recentUsers: recentUsers.rows,
      pendingUsers: pendingUsers.rows,
      recentTransactions: recentTransactions.rows,
      monthlyStats: monthlyStats.rows
    });
  } catch (err) {
    console.error('Get dashboard stats error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20, role, status, search } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = 'WHERE 1=1';
    const params = [];
    let paramIndex = 1;

    if (role) {
      whereClause += ` AND role = $${paramIndex}`;
      params.push(role);
      paramIndex++;
    }

    if (status) {
      whereClause += ` AND status = $${paramIndex}`;
      params.push(status);
      paramIndex++;
    }

    if (search) {
      whereClause += ` AND (first_name ILIKE $${paramIndex} OR last_name ILIKE $${paramIndex} OR email ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    const countResult = await query(`SELECT COUNT(*) as total FROM users ${whereClause}`, params);

    const usersResult = await query(`
      SELECT id, email, first_name, last_name, phone, role, status, 
             credits, province, city, created_at, updated_at
      FROM users
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `, [...params, limit, offset]);

    res.json({
      users: usersResult.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: parseInt(countResult.rows[0].total),
        totalPages: Math.ceil(parseInt(countResult.rows[0].total) / limit)
      }
    });
  } catch (err) {
    console.error('Get all users error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

const approveUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body; // 'approved' or 'rejected'

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status.' });
    }

    const result = await query(
      'UPDATE users SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [status, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Create notification for user
    await query(
      `INSERT INTO notifications (user_id, title, message, type)
       VALUES ($1, $2, $3, $4)`,
      [userId, `Account ${status}`, `Your account has been ${status} by an administrator.`, status === 'approved' ? 'success' : 'warning']
    );

    res.json({
      message: `User ${status} successfully.`,
      user: result.rows[0]
    });
  } catch (err) {
    console.error('Approve user error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

const suspendUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await query(
      "UPDATE users SET status = 'suspended', updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({
      message: 'User suspended successfully.',
      user: result.rows[0]
    });
  } catch (err) {
    console.error('Suspend user error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const { page = 1, limit = 20, type, status } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = 'WHERE 1=1';
    const params = [];
    let paramIndex = 1;

    if (type) {
      whereClause += ` AND t.type = $${paramIndex}`;
      params.push(type);
      paramIndex++;
    }

    if (status) {
      whereClause += ` AND t.status = $${paramIndex}`;
      params.push(status);
      paramIndex++;
    }

    const countResult = await query(`SELECT COUNT(*) as total FROM transactions t ${whereClause}`, params);

    const transactionsResult = await query(`
      SELECT t.*, u.first_name, u.last_name, u.email
      FROM transactions t
      JOIN users u ON t.user_id = u.id
      ${whereClause}
      ORDER BY t.created_at DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `, [...params, limit, offset]);

    res.json({
      transactions: transactionsResult.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: parseInt(countResult.rows[0].total),
        totalPages: Math.ceil(parseInt(countResult.rows[0].total) / limit)
      }
    });
  } catch (err) {
    console.error('Get all transactions error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = 'WHERE 1=1';
    const params = [];
    let paramIndex = 1;

    if (status) {
      whereClause += ` AND o.status = $${paramIndex}`;
      params.push(status);
      paramIndex++;
    }

    const countResult = await query(`SELECT COUNT(*) as total FROM orders o ${whereClause}`, params);

    const ordersResult = await query(`
      SELECT o.*, u.first_name, u.last_name, u.email,
             (SELECT SUM(quantity) FROM order_items WHERE order_id = o.id) as total_items
      FROM orders o
      JOIN users u ON o.user_id = u.id
      ${whereClause}
      ORDER BY o.created_at DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `, [...params, limit, offset]);

    res.json({
      orders: ordersResult.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: parseInt(countResult.rows[0].total),
        totalPages: Math.ceil(parseInt(countResult.rows[0].total) / limit)
      }
    });
  } catch (err) {
    console.error('Get all orders error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const result = await query(
      'UPDATE orders SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [status, orderId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    res.json({
      message: 'Order status updated successfully.',
      order: result.rows[0]
    });
  } catch (err) {
    console.error('Update order status error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = {
  getDashboardStats,
  getAllUsers,
  approveUser,
  suspendUser,
  getAllTransactions,
  getAllOrders,
  updateOrderStatus
};
