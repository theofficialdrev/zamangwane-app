const { query } = require('../config/database');

// Get Event Coordinator Dashboard Stats
const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get total events count
    const eventsResult = await query(
      'SELECT COUNT(*) as total FROM events WHERE coordinator_id = $1',
      [userId]
    );

    // Get upcoming events count
    const upcomingResult = await query(
      'SELECT COUNT(*) as upcoming FROM events WHERE coordinator_id = $1 AND status = $2 AND date >= CURRENT_DATE',
      [userId, 'upcoming']
    );

    // Get total tickets sold and revenue
    const ticketsResult = await query(`
      SELECT 
        COALESCE(COUNT(t.id), 0) as tickets_sold,
        COALESCE(SUM(t.price), 0) as total_revenue
      FROM tickets t
      JOIN events e ON t.event_id = e.id
      WHERE e.coordinator_id = $1
    `, [userId]);

    // Get total attendees
    const attendeesResult = await query(`
      SELECT COALESCE(SUM(current_attendees), 0) as total_attendees
      FROM events
      WHERE coordinator_id = $1
    `, [userId]);

    // Get my events with ticket counts
    const myEventsResult = await query(`
      SELECT 
        e.*,
        COALESCE(COUNT(t.id), 0) as tickets_sold,
        COALESCE(SUM(t.price), 0) as revenue
      FROM events e
      LEFT JOIN tickets t ON e.id = t.event_id
      WHERE e.coordinator_id = $1
      GROUP BY e.id
      ORDER BY e.date DESC
      LIMIT 10
    `, [userId]);

    // Get recent ticket purchases
    const recentTicketsResult = await query(`
      SELECT 
        t.id,
        t.ticket_number,
        t.ticket_type,
        t.price,
        t.purchased_at,
        t.status,
        e.title as event_title,
        u.first_name,
        u.last_name,
        u.email
      FROM tickets t
      JOIN events e ON t.event_id = e.id
      JOIN users u ON t.user_id = u.id
      WHERE e.coordinator_id = $1
      ORDER BY t.purchased_at DESC
      LIMIT 10
    `, [userId]);

    // Get monthly revenue data
    const monthlyRevenueResult = await query(`
      SELECT 
        DATE_TRUNC('month', t.purchased_at) as month,
        COALESCE(SUM(t.price), 0) as revenue,
        COUNT(t.id) as tickets
      FROM tickets t
      JOIN events e ON t.event_id = e.id
      WHERE e.coordinator_id = $1
        AND t.purchased_at >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '6 months')
      GROUP BY DATE_TRUNC('month', t.purchased_at)
      ORDER BY month ASC
    `, [userId]);

    res.json({
      stats: {
        totalEvents: parseInt(eventsResult.rows[0].total),
        upcomingEvents: parseInt(upcomingResult.rows[0].upcoming),
        ticketsSold: parseInt(ticketsResult.rows[0].tickets_sold),
        totalRevenue: parseFloat(ticketsResult.rows[0].total_revenue),
        totalAttendees: parseInt(attendeesResult.rows[0].total_attendees),
      },
      myEvents: myEventsResult.rows,
      recentTickets: recentTicketsResult.rows,
      monthlyRevenue: monthlyRevenueResult.rows
    });
  } catch (err) {
    console.error('Get event coordinator dashboard stats error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Get all events for the coordinator
const getMyEvents = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 20, status } = req.query;
    const offset = (page - 1) * limit;

    let queryStr = `
      SELECT e.*, 
        COALESCE(COUNT(t.id), 0) as tickets_sold,
        COALESCE(SUM(t.price), 0) as revenue
      FROM events e
      LEFT JOIN tickets t ON e.id = t.event_id
      WHERE e.coordinator_id = $1
    `;
    let countQueryStr = 'SELECT COUNT(*) FROM events WHERE coordinator_id = $1';
    const params = [userId];
    let paramIndex = 2;

    if (status) {
      queryStr += ` AND e.status = $${paramIndex}`;
      countQueryStr += ` AND status = $${paramIndex}`;
      params.push(status);
      paramIndex++;
    }

    queryStr += ` GROUP BY e.id ORDER BY e.date DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, offset);

    const result = await query(queryStr, params);
    const countResult = await query(countQueryStr, params.slice(0, paramIndex - 1));

    res.json({
      events: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: parseInt(countResult.rows[0].count),
        totalPages: Math.ceil(parseInt(countResult.rows[0].count) / limit)
      }
    });
  } catch (err) {
    console.error('Get my events error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Create a new event
const createEvent = async (req, res) => {
  try {
    const userId = req.user.id;
    const { 
      title, 
      description, 
      date, 
      time, 
      location, 
      province, 
      region, 
      maxAttendees, 
      ticketPrice,
      image 
    } = req.body;

    // Validate required fields
    if (!title || !date || !location) {
      return res.status(400).json({ message: 'Title, date, and location are required.' });
    }

    const result = await query(`
      INSERT INTO events (
        title, description, date, time, location, province, region, 
        max_attendees, ticket_price, image, coordinator_id, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
    `, [
      title, 
      description, 
      date, 
      time, 
      location, 
      province, 
      region, 
      maxAttendees || 100, 
      ticketPrice || 0, 
      image, 
      userId, 
      'upcoming'
    ]);

    res.status(201).json({
      message: 'Event created successfully.',
      event: result.rows[0]
    });
  } catch (err) {
    console.error('Create event error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Update an event
const updateEvent = async (req, res) => {
  try {
    const userId = req.user.id;
    const { eventId } = req.params;
    const { 
      title, 
      description, 
      date, 
      time, 
      location, 
      province, 
      region, 
      maxAttendees, 
      ticketPrice,
      image,
      status 
    } = req.body;

    // Check if event belongs to the coordinator
    const checkResult = await query(
      'SELECT id FROM events WHERE id = $1 AND coordinator_id = $2',
      [eventId, userId]
    );

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found or not authorized.' });
    }

    const result = await query(`
      UPDATE events 
      SET title = COALESCE($1, title),
          description = COALESCE($2, description),
          date = COALESCE($3, date),
          time = COALESCE($4, time),
          location = COALESCE($5, location),
          province = COALESCE($6, province),
          region = COALESCE($7, region),
          max_attendees = COALESCE($8, max_attendees),
          ticket_price = COALESCE($9, ticket_price),
          image = COALESCE($10, image),
          status = COALESCE($11, status),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $12
      RETURNING *
    `, [title, description, date, time, location, province, region, maxAttendees, ticketPrice, image, status, eventId]);

    res.json({
      message: 'Event updated successfully.',
      event: result.rows[0]
    });
  } catch (err) {
    console.error('Update event error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Delete an event
const deleteEvent = async (req, res) => {
  try {
    const userId = req.user.id;
    const { eventId } = req.params;

    // Check if event belongs to the coordinator
    const checkResult = await query(
      'SELECT id FROM events WHERE id = $1 AND coordinator_id = $2',
      [eventId, userId]
    );

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found or not authorized.' });
    }

    // Check if tickets have been sold
    const ticketsResult = await query(
      'SELECT COUNT(*) as count FROM tickets WHERE event_id = $1',
      [eventId]
    );

    if (parseInt(ticketsResult.rows[0].count) > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete event with sold tickets. Cancel the event instead.' 
      });
    }

    await query('DELETE FROM events WHERE id = $1', [eventId]);

    res.json({ message: 'Event deleted successfully.' });
  } catch (err) {
    console.error('Delete event error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Get event details with tickets
const getEventDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const { eventId } = req.params;

    // Get event details
    const eventResult = await query(`
      SELECT e.*,
        COALESCE(COUNT(t.id), 0) as tickets_sold,
        COALESCE(SUM(t.price), 0) as revenue
      FROM events e
      LEFT JOIN tickets t ON e.id = t.event_id
      WHERE e.id = $1 AND e.coordinator_id = $2
      GROUP BY e.id
    `, [eventId, userId]);

    if (eventResult.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found or not authorized.' });
    }

    // Get all tickets for the event
    const ticketsResult = await query(`
      SELECT 
        t.*,
        u.first_name,
        u.last_name,
        u.email
      FROM tickets t
      JOIN users u ON t.user_id = u.id
      WHERE t.event_id = $1
      ORDER BY t.purchased_at DESC
    `, [eventId]);

    // Get ticket type breakdown
    const ticketTypesResult = await query(`
      SELECT 
        ticket_type,
        COUNT(*) as count,
        SUM(price) as revenue
      FROM tickets
      WHERE event_id = $1
      GROUP BY ticket_type
    `, [eventId]);

    res.json({
      event: eventResult.rows[0],
      tickets: ticketsResult.rows,
      ticketTypeBreakdown: ticketTypesResult.rows
    });
  } catch (err) {
    console.error('Get event details error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Get ticket sales for an event
const getTicketSales = async (req, res) => {
  try {
    const userId = req.user.id;
    const { eventId } = req.params;

    // Verify event belongs to coordinator
    const checkResult = await query(
      'SELECT id FROM events WHERE id = $1 AND coordinator_id = $2',
      [eventId, userId]
    );

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found or not authorized.' });
    }

    const result = await query(`
      SELECT 
        t.*,
        u.first_name,
        u.last_name,
        u.email
      FROM tickets t
      JOIN users u ON t.user_id = u.id
      WHERE t.event_id = $1
      ORDER BY t.purchased_at DESC
    `, [eventId]);

    res.json({ tickets: result.rows });
  } catch (err) {
    console.error('Get ticket sales error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Cancel an event
const cancelEvent = async (req, res) => {
  try {
    const userId = req.user.id;
    const { eventId } = req.params;

    // Check if event belongs to the coordinator
    const checkResult = await query(
      'SELECT id FROM events WHERE id = $1 AND coordinator_id = $2',
      [eventId, userId]
    );

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found or not authorized.' });
    }

    await query(
      'UPDATE events SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      ['cancelled', eventId]
    );

    // Cancel all active tickets and create refund transactions
    const ticketsResult = await query(
      'SELECT * FROM tickets WHERE event_id = $1 AND status = $2',
      [eventId, 'active']
    );

    for (const ticket of ticketsResult.rows) {
      // Update ticket status
      await query(
        'UPDATE tickets SET status = $1 WHERE id = $2',
        ['refunded', ticket.id]
      );

      // Create refund transaction
      await query(`
        INSERT INTO transactions (user_id, type, amount, description, reference_id, reference_type, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [ticket.user_id, 'refund', ticket.price, `Refund for cancelled event`, eventId, 'event', 'completed']);
    }

    res.json({ message: 'Event cancelled and refunds processed.' });
  } catch (err) {
    console.error('Cancel event error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = {
  getDashboardStats,
  getMyEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventDetails,
  getTicketSales,
  cancelEvent
};
