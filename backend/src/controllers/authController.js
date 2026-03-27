const bcrypt = require('bcryptjs');
const { query } = require('../config/database');
const { generateToken } = require('../middleware/auth');
const { validationResult } = require('express-validator');

const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, firstName, lastName, phone, role = 'learner', province, city, referralCode } = req.body;

    // Check if user exists
    const existingUser = await query('SELECT id FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists with this email.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate referral code
    const userReferralCode = `${firstName.substring(0, 3).toUpperCase()}${Date.now().toString(36).toUpperCase()}`;

    // Check if referral code is valid
    let referredBy = null;
    if (referralCode) {
      const referrer = await query('SELECT id FROM users WHERE referral_code = $1', [referralCode]);
      if (referrer.rows.length > 0) {
        referredBy = referrer.rows[0].id;
      }
    }

    // Determine status based on role
    const status = role === 'learner' ? 'approved' : 'pending';

    // Insert user
    const result = await query(
      `INSERT INTO users (email, password, first_name, last_name, phone, role, status, province, city, referral_code, referred_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING id, email, first_name, last_name, role, status, referral_code`,
      [email, hashedPassword, firstName, lastName, phone, role, status, province, city, userReferralCode, referredBy]
    );

    const user = result.rows[0];

    // Create referral record if applicable
    if (referredBy) {
      await query(
        'INSERT INTO referrals (referrer_id, referred_id, status) VALUES ($1, $2, $3)',
        [referredBy, user.id, 'converted']
      );

      // Add referral bonus transaction
      await query(
        `INSERT INTO transactions (user_id, type, amount, description, reference_id, reference_type, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [referredBy, 'referral_bonus', 50.00, `Referral bonus for ${firstName} ${lastName}`, user.id, 'user', 'completed']
      );

      // Update referrer credits
      await query('UPDATE users SET credits = credits + 5 WHERE id = $1', [referredBy]);
    }

    // Generate token
    const token = generateToken(user);

    res.status(201).json({
      message: 'User registered successfully.',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
        status: user.status,
        referralCode: user.referral_code
      },
      token
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error during registration.' });
  }
};

const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Get user
    const result = await query(
      'SELECT id, email, password, first_name, last_name, role, status, credits, profile_image, phone, province, city, bio FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const user = result.rows[0];

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Check status
    if (user.status === 'rejected') {
      return res.status(403).json({ message: 'Your account has been rejected.' });
    }

    if (user.status === 'suspended') {
      return res.status(403).json({ message: 'Your account has been suspended.' });
    }

    // Generate token
    const token = generateToken(user);

    res.json({
      message: 'Login successful.',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
        status: user.status,
        credits: user.credits,
        profileImage: user.profile_image,
        phone: user.phone,
        province: user.province,
        city: user.city,
        bio: user.bio
      },
      token
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login.' });
  }
};

const getProfile = async (req, res) => {
  try {
    const result = await query(
      `SELECT u.id, u.email, u.first_name, u.last_name, u.role, u.status, u.credits, 
              u.profile_image, u.phone, u.province, u.city, u.bio, u.referral_code, u.created_at,
              (SELECT COUNT(*) FROM referrals WHERE referrer_id = u.id) as total_referrals
       FROM users u WHERE u.id = $1`,
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const user = result.rows[0];

    res.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
        status: user.status,
        credits: user.credits,
        profileImage: user.profile_image,
        phone: user.phone,
        province: user.province,
        city: user.city,
        bio: user.bio,
        referralCode: user.referral_code,
        totalReferrals: parseInt(user.total_referrals),
        createdAt: user.created_at
      }
    });
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, phone, province, city, bio } = req.body;

    const result = await query(
      `UPDATE users 
       SET first_name = $1, last_name = $2, phone = $3, province = $4, city = $5, bio = $6, updated_at = CURRENT_TIMESTAMP
       WHERE id = $7
       RETURNING id, email, first_name, last_name, phone, province, city, bio`,
      [firstName, lastName, phone, province, city, bio, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const user = result.rows[0];

    res.json({
      message: 'Profile updated successfully.',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        phone: user.phone,
        province: user.province,
        city: user.city,
        bio: user.bio
      }
    });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Get current password
    const userResult = await query('SELECT password FROM users WHERE id = $1', [req.user.id]);
    
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isValidPassword = await bcrypt.compare(currentPassword, userResult.rows[0].password);
    
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Current password is incorrect.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await query('UPDATE users SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', 
      [hashedPassword, req.user.id]
    );

    res.json({ message: 'Password changed successfully.' });
  } catch (err) {
    console.error('Change password error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword
};
