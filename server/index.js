import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { products } from './data/products.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// In-memory stores
const subscribers = [];
const orders = [];

// Middleware
app.use(cors());
app.use(express.json());

// ==================
// PRODUCT ROUTES
// ==================
app.get('/api/products', (req, res) => {
  try {
    const { category } = req.query;
    if (category && category !== 'All') {
      const filtered = products.filter(p => p.category === category);
      return res.json(filtered);
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error retrieving products' });
  }
});

app.get('/api/products/:id', (req, res) => {
  try {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error retrieving product' });
  }
});

// ==================
// CHECKOUT ROUTE
// ==================
app.post('/api/checkout', (req, res) => {
  try {
    const { items, shipping, payment } = req.body;
    
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }
    
    if (!shipping || !shipping.email || !shipping.address) {
      return res.status(400).json({ message: 'Shipping information incomplete' });
    }

    const orderId = 'ORD-' + Math.floor(Math.random() * 1000000);
    
    orders.push({
      orderId,
      items,
      shipping,
      createdAt: new Date().toISOString()
    });

    console.log(`New order placed: ${orderId} (${items.length} items)`);
    
    res.status(201).json({ 
      success: true, 
      message: 'Order placed successfully',
      orderId 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error processing checkout' });
  }
});

// ==================
// NEWSLETTER ROUTE
// ==================
app.post('/api/newsletter', (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    if (subscribers.includes(email)) {
      return res.status(409).json({ message: 'This email is already subscribed' });
    }

    subscribers.push(email);
    console.log(`New subscriber: ${email} (total: ${subscribers.length})`);

    res.status(201).json({ 
      success: true, 
      message: 'Successfully subscribed! Welcome to Mega.' 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error processing subscription' });
  }
});

// ==================
// CONTACT ROUTE
// ==================
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    console.log(`New contact message from ${name} (${email}): ${message}`);

    res.status(201).json({ 
      success: true, 
      message: 'Message received! We will get back to you shortly.' 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error processing message' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
