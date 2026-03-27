const { pool } = require('../src/config/database');
const bcrypt = require('bcryptjs');

const seedData = async () => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    // Hash passwords
    const adminPassword = await bcrypt.hash('Prodigy_8434', 10);
    const userPassword = await bcrypt.hash('Prodigy_8434', 10);

    // Insert admin user
    const adminResult = await client.query(`
      INSERT INTO users (email, password, first_name, last_name, phone, role, status, email_verified, province, city, credits, referral_code)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      ON CONFLICT (email) DO NOTHING
      RETURNING id
    `, ['theofficialdrev@gmail.com', adminPassword, 'Admin', 'User', '+27 12 345 6789', 'admin', 'approved', true, 'Gauteng', 'Johannesburg', 100, 'ADMIN001']);

    // Insert normal user
    const userResult = await client.query(`
      INSERT INTO users (email, password, first_name, last_name, phone, role, status, email_verified, province, city, credits, referral_code)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      ON CONFLICT (email) DO NOTHING
      RETURNING id
    `, ['nyashaemmanuel17@gmail.com', userPassword, 'Nyasha', 'Emmanuel', '+27 78 123 4567', 'learner', 'approved', true, 'Gauteng', 'Pretoria', 12, 'NYASHA001']);

    // Insert categories
    const categories = [
      { name: 'Skills Development', description: 'Training and skills development programs', icon: 'GraduationCap' },
      { name: 'Youth Programs', description: 'Programs focused on youth empowerment', icon: 'Users' },
      { name: 'Community Support', description: 'Community upliftment initiatives', icon: 'Heart' },
      { name: 'Events', description: 'Community events and gatherings', icon: 'Calendar' },
      { name: 'Entrepreneurship', description: 'Business and entrepreneurship training', icon: 'TrendingUp' },
      { name: 'Merchandise', description: 'Foundation merchandise and products', icon: 'ShoppingBag' }
    ];

    for (const category of categories) {
      await client.query(`
        INSERT INTO categories (name, description, icon)
        VALUES ($1, $2, $3)
        ON CONFLICT DO NOTHING
      `, [category.name, category.description, category.icon]);
    }

    // Get category IDs
    const categoryResult = await client.query('SELECT id, name FROM categories');
    const categoryMap = {};
    categoryResult.rows.forEach(row => {
      categoryMap[row.name] = row.id;
    });

    // Insert products
    const products = [
      { name: 'Zamangwane T-Shirt', description: 'Premium quality foundation t-shirt', price: 250.00, stock: 100, category_id: categoryMap['Merchandise'], image: '/images/04-300x300.png' },
      { name: 'Zamangwane Cap', description: 'Stylish foundation cap', price: 180.00, stock: 75, category_id: categoryMap['Merchandise'], image: '/images/05-300x300.png' },
      { name: 'Zamangwane Hoodie', description: 'Warm and comfortable hoodie', price: 450.00, stock: 50, category_id: categoryMap['Merchandise'], image: '/images/06-400x400.png' },
      { name: 'Emotional Intelligence Course', description: 'Complete emotional intelligence training program', price: 1200.00, stock: 999, category_id: categoryMap['Skills Development'], image: '/images/EMOTIONAL-INTELLIGENCE-300x300.png' },
      { name: 'Power Over Money Course', description: 'Financial literacy and money management', price: 1500.00, stock: 999, category_id: categoryMap['Skills Development'], image: '/images/POWER-OVER-MONEY-300x300.png' },
      { name: 'Ukwazi Nokuqonda Ubuwena', description: 'Personal development in isiZulu', price: 800.00, stock: 999, category_id: categoryMap['Skills Development'], image: '/images/Ukwazi-Nokuqonda-Ubuwena-300x300.png' }
    ];

    for (const product of products) {
      await client.query(`
        INSERT INTO products (name, description, price, stock, category_id, image, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT DO NOTHING
      `, [product.name, product.description, product.price, product.stock, product.category_id, product.image, 'active']);
    }

    // Insert events
    const events = [
      {
        title: 'Youth Skills Summit 2025',
        description: 'A comprehensive summit bringing together young people from across South Africa to learn new skills, network, and explore opportunities.',
        date: '2025-04-15',
        time: '09:00:00',
        location: 'Johannesburg Convention Centre',
        province: 'Gauteng',
        region: 'Johannesburg',
        image: '/images/1181.jpg',
        max_attendees: 500,
        current_attendees: 320,
        ticket_price: 120.00,
        status: 'upcoming'
      },
      {
        title: 'Community Upliftment Workshop',
        description: 'Learn practical skills for community development and grassroots organizing.',
        date: '2025-04-22',
        time: '10:00:00',
        location: 'Durban Community Hall',
        province: 'KwaZulu-Natal',
        region: 'Durban',
        image: '/images/2149156368.jpg',
        max_attendees: 200,
        current_attendees: 145,
        ticket_price: 120.00,
        status: 'upcoming'
      },
      {
        title: 'Entrepreneurship Bootcamp',
        description: 'Intensive training for aspiring entrepreneurs covering business planning, marketing, and funding.',
        date: '2025-05-01',
        time: '08:30:00',
        location: 'Cape Town Business Hub',
        province: 'Western Cape',
        region: 'Cape Town',
        image: '/images/6123.jpg',
        max_attendees: 150,
        current_attendees: 89,
        ticket_price: 250.00,
        status: 'upcoming'
      },
      {
        title: 'Digital Skills Training',
        description: 'Learn essential digital skills including computer basics, internet navigation, and online safety.',
        date: '2025-05-10',
        time: '09:00:00',
        location: 'Pretoria Tech Centre',
        province: 'Gauteng',
        region: 'Pretoria',
        image: '/images/7.jpg',
        max_attendees: 100,
        current_attendees: 67,
        ticket_price: 120.00,
        status: 'upcoming'
      }
    ];

    for (const event of events) {
      await client.query(`
        INSERT INTO events (title, description, date, time, location, province, region, image, max_attendees, current_attendees, ticket_price, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        ON CONFLICT DO NOTHING
      `, [event.title, event.description, event.date, event.time, event.location, event.province, event.region, event.image, event.max_attendees, event.current_attendees, event.ticket_price, event.status]);
    }

    // Insert skills
    const skills = [
      { name: 'Computer Literacy', description: 'Basic computer skills and digital literacy', duration: '4 weeks', price: 500.00, category_id: categoryMap['Skills Development'], status: 'active' },
      { name: 'Financial Management', description: 'Personal and business financial management', duration: '6 weeks', price: 800.00, category_id: categoryMap['Skills Development'], status: 'active' },
      { name: 'Leadership Development', description: 'Leadership skills for community and workplace', duration: '8 weeks', price: 1200.00, category_id: categoryMap['Youth Programs'], status: 'active' },
      { name: 'Business Planning', description: 'Create comprehensive business plans', duration: '5 weeks', price: 1000.00, category_id: categoryMap['Entrepreneurship'], status: 'active' },
      { name: 'Communication Skills', description: 'Effective communication and public speaking', duration: '3 weeks', price: 600.00, category_id: categoryMap['Skills Development'], status: 'active' }
    ];

    for (const skill of skills) {
      await client.query(`
        INSERT INTO skills (name, description, duration, price, category_id, status)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT DO NOTHING
      `, [skill.name, skill.description, skill.duration, skill.price, skill.category_id, skill.status]);
    }

    await client.query('COMMIT');
    console.log('Seed data inserted successfully');
    
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Seeding error:', err);
    throw err;
  } finally {
    client.release();
  }
};

const runSeeding = async () => {
  try {
    await seedData();
    console.log('Seeding completed successfully');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

runSeeding();
