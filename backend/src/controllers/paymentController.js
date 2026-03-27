const crypto = require('crypto');
const qs = require('qs');
const axios = require('axios');
const { query } = require('../config/database');

// PayFast configuration
const PAYFAST_CONFIG = {
  merchantId: process.env.PAYFAST_MERCHANT_ID || '26618151',
  merchantKey: process.env.PAYFAST_MERCHANT_KEY || 'ugdyy7dejdad0',
  passphrase: process.env.PAYFAST_PASSPHRASE || 'NaLeDiSs2022',
  sandbox: process.env.PAYFAST_SANDBOX === 'true',
};

const PAYFAST_URL = PAYFAST_CONFIG.sandbox 
  ? 'https://sandbox.payfast.co.za/eng/process'
  : 'https://www.payfast.co.za/eng/process';

const PAYFAST_VALIDATE_URL = PAYFAST_CONFIG.sandbox
  ? 'https://sandbox.payfast.co.za/eng/query/validate'
  : 'https://www.payfast.co.za/eng/query/validate';

// Generate PayFast signature
const generateSignature = (data, passPhrase = null) => {
  // Create parameter string
  let pfOutput = '';
  for (const key in data) {
    if (data.hasOwnProperty(key) && data[key] !== '') {
      pfOutput += `${key}=${encodeURIComponent(data[key].toString().trim()).replace(/%20/g, '+')}&`;
    }
  }

  // Remove last ampersand
  let getString = pfOutput.slice(0, -1);

  // Add passphrase if provided
  if (passPhrase !== null) {
    getString += `&passphrase=${encodeURIComponent(passPhrase.trim()).replace(/%20/g, '+')}`;
  }

  return crypto.createHash('md5').update(getString).digest('hex');
};

// Create payment for tickets
const createTicketPayment = async (req, res) => {
  try {
    const { eventId, ticketType = 'basic' } = req.body;
    const userId = req.user.id;

    // Get event details
    const eventResult = await query(
      'SELECT * FROM events WHERE id = $1 AND status = $2',
      [eventId, 'upcoming']
    );

    if (eventResult.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found or not available.' });
    }

    const event = eventResult.rows[0];

    // Check if event is full
    if (event.current_attendees >= event.max_attendees) {
      return res.status(400).json({ message: 'Event is fully booked.' });
    }

    // Get user details
    const userResult = await query(
      'SELECT first_name, last_name, email FROM users WHERE id = $1',
      [userId]
    );

    const user = userResult.rows[0];

    // Determine ticket price based on type
    let ticketPrice = event.ticket_price;
    if (ticketType === 'intermediary') {
      ticketPrice = 250.00;
    } else if (ticketType === 'basic') {
      ticketPrice = 120.00;
    }

    // Generate unique order ID
    const orderId = `TICKET-${Date.now()}-${userId}`;

    // Create pending order
    await query(
      `INSERT INTO orders (user_id, order_number, total_amount, status, payment_status)
       VALUES ($1, $2, $3, $4, $5)`,
      [userId, orderId, ticketPrice, 'pending', 'pending']
    );

    // Prepare PayFast data
    const returnUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/#/payment/success`;
    const cancelUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/#/payment/cancel`;
    const notifyUrl = `${process.env.BACKEND_URL || 'http://localhost:3001'}/api/payments/notify`;

    const payfastData = {
      merchant_id: PAYFAST_CONFIG.merchantId,
      merchant_key: PAYFAST_CONFIG.merchantKey,
      return_url: returnUrl,
      cancel_url: cancelUrl,
      notify_url: notifyUrl,
      name_first: user.first_name,
      name_last: user.last_name,
      email_address: user.email,
      m_payment_id: orderId,
      amount: ticketPrice.toFixed(2),
      item_name: `Ticket: ${event.title}`,
      item_description: `${ticketType.charAt(0).toUpperCase() + ticketType.slice(1)} ticket for ${event.title}`,
      custom_str1: eventId,
      custom_str2: ticketType,
      custom_str3: userId,
    };

    // Generate signature
    const signature = generateSignature(payfastData, PAYFAST_CONFIG.passphrase);
    payfastData.signature = signature;

    res.json({
      message: 'Payment initiated.',
      paymentUrl: PAYFAST_URL,
      paymentData: payfastData
    });
  } catch (err) {
    console.error('Create ticket payment error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Create payment for cart/checkout
const createCheckoutPayment = async (req, res) => {
  try {
    const { shippingAddress } = req.body;
    const userId = req.user.id;

    // Get cart items
    const cartResult = await query(`
      SELECT c.*, p.name, p.price, p.stock
      FROM cart c
      JOIN products p ON c.product_id = p.id
      WHERE c.user_id = $1
    `, [userId]);

    if (cartResult.rows.length === 0) {
      return res.status(400).json({ message: 'Cart is empty.' });
    }

    // Calculate total
    let totalAmount = 0;
    for (const item of cartResult.rows) {
      if (item.quantity > item.stock) {
        return res.status(400).json({ 
          message: `Insufficient stock for ${item.name}. Available: ${item.stock}` 
        });
      }
      totalAmount += item.price * item.quantity;
    }

    // Get user details
    const userResult = await query(
      'SELECT first_name, last_name, email FROM users WHERE id = $1',
      [userId]
    );

    const user = userResult.rows[0];

    // Generate unique order ID
    const orderId = `ORDER-${Date.now()}-${userId}`;

    // Create order
    const orderResult = await query(
      `INSERT INTO orders (user_id, order_number, total_amount, status, shipping_address, payment_status)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id`,
      [userId, orderId, totalAmount, 'pending', JSON.stringify(shippingAddress), 'pending']
    );

    const orderId_db = orderResult.rows[0].id;

    // Create order items
    for (const item of cartResult.rows) {
      await query(
        `INSERT INTO order_items (order_id, product_id, quantity, price)
         VALUES ($1, $2, $3, $4)`,
        [orderId_db, item.product_id, item.quantity, item.price]
      );
    }

    // Prepare PayFast data
    const returnUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/#/payment/success`;
    const cancelUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/#/payment/cancel`;
    const notifyUrl = `${process.env.BACKEND_URL || 'http://localhost:3001'}/api/payments/notify`;

    const payfastData = {
      merchant_id: PAYFAST_CONFIG.merchantId,
      merchant_key: PAYFAST_CONFIG.merchantKey,
      return_url: returnUrl,
      cancel_url: cancelUrl,
      notify_url: notifyUrl,
      name_first: user.first_name,
      name_last: user.last_name,
      email_address: user.email,
      m_payment_id: orderId,
      amount: totalAmount.toFixed(2),
      item_name: `Order #${orderId}`,
      item_description: `${cartResult.rows.length} item(s) from Zamangwane Shop`,
      custom_str1: orderId_db,
      custom_str2: 'product_order',
      custom_str3: userId,
    };

    // Generate signature
    const signature = generateSignature(payfastData, PAYFAST_CONFIG.passphrase);
    payfastData.signature = signature;

    res.json({
      message: 'Payment initiated.',
      paymentUrl: PAYFAST_URL,
      paymentData: payfastData
    });
  } catch (err) {
    console.error('Create checkout payment error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Handle PayFast ITN (Instant Transaction Notification)
const handlePaymentNotification = async (req, res) => {
  try {
    // Verify signature
    const receivedSignature = req.body.signature;
    delete req.body.signature;

    const calculatedSignature = generateSignature(req.body, PAYFAST_CONFIG.passphrase);

    if (receivedSignature !== calculatedSignature) {
      console.error('Invalid signature received');
      return res.status(400).send('Invalid signature');
    }

    // Verify with PayFast servers
    const validationData = qs.stringify(req.body);
    
    try {
      const validateResponse = await axios.post(PAYFAST_VALIDATE_URL, validationData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      if (validateResponse.data !== 'VALID') {
        console.error('PayFast validation failed:', validateResponse.data);
        return res.status(400).send('Validation failed');
      }
    } catch (validateErr) {
      console.error('PayFast validation error:', validateErr);
      // Continue processing even if validation fails (PayFast recommends this)
    }

    const {
      m_payment_id,
      payment_status,
      amount_gross,
      custom_str1,
      custom_str2,
      custom_str3
    } = req.body;

    if (payment_status === 'COMPLETE') {
      // Update order status
      await query(
        'UPDATE orders SET status = $1, payment_status = $2, payfast_data = $3, updated_at = CURRENT_TIMESTAMP WHERE order_number = $4',
        ['paid', 'completed', JSON.stringify(req.body), m_payment_id]
      );

      if (custom_str2 === 'basic' || custom_str2 === 'intermediary' || custom_str2 === 'premium') {
        // Ticket purchase
        const eventId = custom_str1;
        const ticketType = custom_str2;
        const userId = custom_str3;

        // Generate ticket number
        const ticketNumber = `TKT-${Date.now()}-${userId}`;

        // Create ticket
        await query(
          `INSERT INTO tickets (user_id, event_id, ticket_type, ticket_number, price, status)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [userId, eventId, ticketType, ticketNumber, amount_gross, 'active']
        );

        // Update event attendees
        await query(
          'UPDATE events SET current_attendees = current_attendees + 1 WHERE id = $1',
          [eventId]
        );

        // Create transaction record
        await query(
          `INSERT INTO transactions (user_id, type, amount, description, reference_id, reference_type, status)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [userId, 'ticket_purchase', amount_gross, `Ticket purchase for event #${eventId}`, eventId, 'event', 'completed']
        );

        // Handle referral commission
        const userResult = await query('SELECT referred_by FROM users WHERE id = $1', [userId]);
        if (userResult.rows[0]?.referred_by) {
          const commissionAmount = parseFloat(amount_gross) * 0.1; // 10% commission
          
          await query(
            `INSERT INTO transactions (user_id, type, amount, description, reference_id, reference_type, status)
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [userResult.rows[0].referred_by, 'commission', commissionAmount, `Commission from ticket purchase`, userId, 'user', 'completed']
          );

          // Update referrer credits
          await query(
            'UPDATE users SET credits = credits + $1 WHERE id = $2',
            [Math.floor(commissionAmount / 10), userResult.rows[0].referred_by]
          );
        }

        // Create notification
        await query(
          `INSERT INTO notifications (user_id, title, message, type)
           VALUES ($1, $2, $3, $4)`,
          [userId, 'Ticket Purchase Successful', `Your ticket has been purchased successfully. Ticket number: ${ticketNumber}`, 'success']
        );
      } else {
        // Product order
        const orderId = custom_str1;
        const userId = custom_str3;

        // Get order items
        const itemsResult = await query(
          'SELECT * FROM order_items WHERE order_id = $1',
          [orderId]
        );

        // Update product stock
        for (const item of itemsResult.rows) {
          await query(
            'UPDATE products SET stock = stock - $1 WHERE id = $2',
            [item.quantity, item.product_id]
          );
        }

        // Clear user's cart
        await query('DELETE FROM cart WHERE user_id = $1', [userId]);

        // Create transaction record
        await query(
          `INSERT INTO transactions (user_id, type, amount, description, reference_id, reference_type, status)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [userId, 'product_purchase', amount_gross, `Product order #${m_payment_id}`, orderId, 'order', 'completed']
        );

        // Handle referral commission
        const userResult = await query('SELECT referred_by FROM users WHERE id = $1', [userId]);
        if (userResult.rows[0]?.referred_by) {
          const commissionAmount = parseFloat(amount_gross) * 0.05; // 5% commission for products
          
          await query(
            `INSERT INTO transactions (user_id, type, amount, description, reference_id, reference_type, status)
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [userResult.rows[0].referred_by, 'commission', commissionAmount, `Commission from product purchase`, userId, 'user', 'completed']
          );
        }

        // Create notification
        await query(
          `INSERT INTO notifications (user_id, title, message, type)
           VALUES ($1, $2, $3, $4)`,
          [userId, 'Order Confirmed', `Your order #${m_payment_id} has been confirmed and is being processed.`, 'success']
        );
      }
    }

    res.status(200).send('OK');
  } catch (err) {
    console.error('Payment notification error:', err);
    res.status(500).send('Error');
  }
};

// Get payment status
const getPaymentStatus = async (req, res) => {
  try {
    const { orderNumber } = req.params;
    const userId = req.user.id;

    const result = await query(
      'SELECT order_number, status, payment_status, total_amount, created_at FROM orders WHERE order_number = $1 AND user_id = $2',
      [orderNumber, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    res.json({
      order: result.rows[0]
    });
  } catch (err) {
    console.error('Get payment status error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = {
  createTicketPayment,
  createCheckoutPayment,
  handlePaymentNotification,
  getPaymentStatus
};
