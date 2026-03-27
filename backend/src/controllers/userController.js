const { query } = require('../config/database');

const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;

    // User stats
    const creditsResult = await query('SELECT credits FROM users WHERE id = $1', [userId]);
    
    // Total earnings from commissions and referrals
    const earningsResult = await query(`
      SELECT COALESCE(SUM(amount), 0) as total
      FROM transactions
      WHERE user_id = $1 AND type IN ('commission', 'referral_bonus')
    `, [userId]);

    // Ticket count
    const ticketsResult = await query(
      'SELECT COUNT(*) as count FROM tickets WHERE user_id = $1',
      [userId]
    );

    // Referral count
    const referralsResult = await query(
      'SELECT COUNT(*) as count FROM referrals WHERE referrer_id = $1',
      [userId]
    );

    // Upcoming events for user
    const upcomingEvents = await query(`
      SELECT e.*, t.ticket_number, t.ticket_type
      FROM events e
      JOIN tickets t ON e.id = t.event_id
      WHERE t.user_id = $1 AND e.date >= CURRENT_DATE
      ORDER BY e.date
      LIMIT 5
    `, [userId]);

    // Recent transactions
    const recentTransactions = await query(`
      SELECT id, type, amount, description, status, created_at
      FROM transactions
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT 10
    `, [userId]);

    // Recent orders
    const recentOrders = await query(`
      SELECT id, order_number, total_amount, status, created_at
      FROM orders
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT 5
    `, [userId]);

    // Enrolled skills
    const enrolledSkills = await query(`
      SELECT s.name, s.duration, e.status, e.progress, e.enrolled_at
      FROM enrollments e
      JOIN skills s ON e.skill_id = s.id
      WHERE e.user_id = $1
      ORDER BY e.enrolled_at DESC
      LIMIT 5
    `, [userId]);

    // Notifications
    const notifications = await query(`
      SELECT id, title, message, type, is_read, created_at
      FROM notifications
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT 10
    `, [userId]);

    // Unread notification count
    const unreadCount = await query(`
      SELECT COUNT(*) as count
      FROM notifications
      WHERE user_id = $1 AND is_read = false
    `, [userId]);

    res.json({
      stats: {
        credits: creditsResult.rows[0]?.credits || 0,
        totalEarnings: parseFloat(earningsResult.rows[0]?.total || 0),
        ticketCount: parseInt(ticketsResult.rows[0]?.count || 0),
        referralCount: parseInt(referralsResult.rows[0]?.count || 0),
        unreadNotifications: parseInt(unreadCount.rows[0]?.count || 0)
      },
      upcomingEvents: upcomingEvents.rows,
      recentTransactions: recentTransactions.rows,
      recentOrders: recentOrders.rows,
      enrolledSkills: enrolledSkills.rows,
      notifications: notifications.rows
    });
  } catch (err) {
    console.error('Get dashboard data error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

const getMyTickets = async (req, res) => {
  try {
    const userId = req.user.id;

    const ticketsResult = await query(`
      SELECT t.*, e.title as event_title, e.date as event_date, e.location, e.image
      FROM tickets t
      JOIN events e ON t.event_id = e.id
      WHERE t.user_id = $1
      ORDER BY e.date DESC
    `, [userId]);

    res.json({
      tickets: ticketsResult.rows
    });
  } catch (err) {
    console.error('Get my tickets error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

const getMyTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const countResult = await query(
      'SELECT COUNT(*) as total FROM transactions WHERE user_id = $1',
      [userId]
    );

    const transactionsResult = await query(`
      SELECT id, type, amount, description, reference_id, reference_type, status, created_at
      FROM transactions
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT $2 OFFSET $3
    `, [userId, limit, offset]);

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
    console.error('Get my transactions error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const countResult = await query(
      'SELECT COUNT(*) as total FROM orders WHERE user_id = $1',
      [userId]
    );

    const ordersResult = await query(`
      SELECT o.*, 
             (SELECT json_agg(json_build_object(
               'id', oi.id,
               'product_id', oi.product_id,
               'quantity', oi.quantity,
               'price', oi.price,
               'product_name', p.name,
               'product_image', p.image
             ))
              FROM order_items oi
              JOIN products p ON oi.product_id = p.id
              WHERE oi.order_id = o.id
             ) as items
      FROM orders o
      WHERE o.user_id = $1
      ORDER BY o.created_at DESC
      LIMIT $2 OFFSET $3
    `, [userId, limit, offset]);

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
    console.error('Get my orders error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

const getMyReferrals = async (req, res) => {
  try {
    const userId = req.user.id;

    const referralsResult = await query(`
      SELECT r.*, u.first_name, u.last_name, u.email, u.created_at as joined_at
      FROM referrals r
      JOIN users u ON r.referred_id = u.id
      WHERE r.referrer_id = $1
      ORDER BY r.created_at DESC
    `, [userId]);

    // Calculate total commission
    const commissionResult = await query(`
      SELECT COALESCE(SUM(commission_amount), 0) as total
      FROM referrals
      WHERE referrer_id = $1
    `, [userId]);

    res.json({
      referrals: referralsResult.rows,
      totalCommission: parseFloat(commissionResult.rows[0]?.total || 0)
    });
  } catch (err) {
    console.error('Get my referrals error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

const markNotificationRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const userId = req.user.id;

    const result = await query(
      'UPDATE notifications SET is_read = true WHERE id = $1 AND user_id = $2 RETURNING *',
      [notificationId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Notification not found.' });
    }

    res.json({
      message: 'Notification marked as read.',
      notification: result.rows[0]
    });
  } catch (err) {
    console.error('Mark notification read error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

const markAllNotificationsRead = async (req, res) => {
  try {
    const userId = req.user.id;

    await query(
      'UPDATE notifications SET is_read = true WHERE user_id = $1 AND is_read = false',
      [userId]
    );

    res.json({
      message: 'All notifications marked as read.'
    });
  } catch (err) {
    console.error('Mark all notifications read error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = {
  getDashboardData,
  getMyTickets,
  getMyTransactions,
  getMyOrders,
  getMyReferrals,
  markNotificationRead,
  markAllNotificationsRead
};
