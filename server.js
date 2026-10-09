const express = require('express');
const path = require('path');
const PRODUCTS = require('./public/js/data/products.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory orders store
const orders = new Map();

// API: Get all products with query filtering
app.get('/api/products', (req, res) => {
  let list = [...PRODUCTS];
  const { category, search, sort, minPrice, maxPrice, featured } = req.query;

  if (category && category !== 'all') {
    list = list.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase().trim();
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q) ||
      (p.badge && p.badge.toLowerCase().includes(q))
    );
  }

  if (minPrice) {
    list = list.filter(p => p.price >= parseFloat(minPrice));
  }
  if (maxPrice) {
    list = list.filter(p => p.price <= parseFloat(maxPrice));
  }

  if (featured === 'true') {
    list = list.filter(p => p.featured);
  }

  // Sorting
  if (sort === 'price-low') {
    list.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-high') {
    list.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'newest') {
    list.sort((a, b) => (b.badge === 'New Arrival' ? 1 : 0) - (a.badge === 'New Arrival' ? 1 : 0));
  }

  res.json({
    success: true,
    count: list.length,
    products: list
  });
});

// API: Get single product by ID
app.get('/api/products/:id', (req, res) => {
  const product = PRODUCTS.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Garment not found in atelier catalog' });
  }

  const related = PRODUCTS.filter(p => p.id !== product.id && (p.category === product.category || p.featured)).slice(0, 4);

  res.json({
    success: true,
    product,
    related
  });
});

// API: Process Checkout
app.post('/api/checkout', (req, res) => {
  const {
    items,
    customer,
    shippingAddress,
    shippingMethod,
    discountCode,
    payment
  } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ success: false, message: 'Your shopping bag is empty.' });
  }

  if (!customer || !customer.email || !customer.firstName || !customer.lastName) {
    return res.status(400).json({ success: false, message: 'Please provide full contact and recipient details.' });
  }

  if (!shippingAddress || !shippingAddress.address || !shippingAddress.city || !shippingAddress.country) {
    return res.status(400).json({ success: false, message: 'Incomplete delivery destination.' });
  }

  // Validate Mock Payment Card
  if (payment && payment.method === 'card') {
    const rawNumber = (payment.cardNumber || '').replace(/\s+/g, '');
    if (rawNumber.length < 13 || rawNumber.length > 19) {
      return res.status(400).json({ success: false, message: 'Please enter a valid credit or debit card number.' });
    }
  }

  // Calculate pricing server-side to guarantee integrity
  let subtotal = 0;
  const verifiedItems = items.map(cartItem => {
    const catalogItem = PRODUCTS.find(p => p.id === cartItem.id);
    const unitPrice = catalogItem ? catalogItem.price : (cartItem.price || 0);
    const qty = Math.max(1, parseInt(cartItem.quantity, 10) || 1);
    subtotal += unitPrice * qty;
    return {
      id: cartItem.id,
      name: catalogItem ? catalogItem.name : cartItem.name,
      price: unitPrice,
      quantity: qty,
      size: cartItem.size || 'M',
      color: cartItem.color || 'Default',
      image: catalogItem ? catalogItem.images[0] : cartItem.image
    };
  });

  // Calculate discount
  let discountAmount = 0;
  if (discountCode) {
    const code = discountCode.trim().toUpperCase();
    if (code === 'LUXURY10' || code === 'WELCOME10') {
      discountAmount = Math.round(subtotal * 0.10);
    } else if (code === 'AURELIA' || code === 'ATELIER15') {
      discountAmount = Math.round(subtotal * 0.15);
    }
  }

  // Calculate Shipping
  const shippingCost = shippingMethod === 'express' ? 25 : (subtotal >= 250 ? 0 : 20);
  const estimatedTax = Math.round((subtotal - discountAmount) * 0.08); // 8% sales tax estimate
  const total = subtotal - discountAmount + shippingCost + estimatedTax;

  const orderId = 'AUR-' + Math.floor(100000 + Math.random() * 900000);
  const trackingNumber = 'DHL-LUX-' + Math.floor(10000000 + Math.random() * 90000000);

  const orderRecord = {
    orderId,
    createdAt: new Date().toISOString(),
    status: 'Confirmed - Preparing Atelier Dispatch',
    trackingNumber,
    customer,
    shippingAddress,
    shippingMethod: shippingMethod === 'express' ? 'Express DHL Priority Delivery' : 'Complimentary Atelier White-Glove Standard',
    items: verifiedItems,
    pricing: {
      subtotal,
      discountAmount,
      discountCode: discountCode || null,
      shippingCost,
      estimatedTax,
      total
    },
    paymentSummary: {
      method: payment ? payment.method : 'Credit Card',
      cardLast4: payment && payment.cardNumber ? payment.cardNumber.slice(-4) : '4242'
    }
  };

  orders.set(orderId, orderRecord);

  res.status(201).json({
    success: true,
    message: 'Order placed successfully with Atelier Aurélia.',
    order: orderRecord
  });
});

// API: Get Order by ID
app.get('/api/orders/:id', (req, res) => {
  const order = orders.get(req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found in atelier registry.' });
  }
  res.json({ success: true, order });
});

// API: Newsletter subscription
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
  }
  res.json({
    success: true,
    message: 'Welcome to Atelier Aurélia Privé. Your complimentary 10% welcome invitation code is LUXURY10.',
    promoCode: 'LUXURY10'
  });
});

// API: Contact concierge
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Please complete all required concierge inquiry fields.' });
  }
  res.json({
    success: true,
    message: `Thank you, ${name}. Your message has been received by the Atelier Concierge. A client advisor will respond within 24 hours.`
  });
});

// Fallback to index.html for SPA router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`✨ Atelier Aurélia luxury store is live at http://localhost:${PORT}`);
});
