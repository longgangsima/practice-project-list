/**
 * Restaurant Order System - Backend API Server
 * Node.js Express server with file-based JSON storage
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Data file paths
const ORDERS_FILE = path.join(__dirname, 'data', 'orders.json');
const OPTIONS_FILE = path.join(__dirname, 'data', 'optionData.json');

// Helper function to read JSON file
const readJSONFile = filePath => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
};

// Helper function to write JSON file
const writeJSONFile = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error writing file ${filePath}:`, error);
    return false;
  }
};

// Routes

// GET /api/orders - Fetch all orders
app.get('/api/orders', (req, res) => {
  const orders = readJSONFile(ORDERS_FILE);
  if (orders === null) {
    return res.status(500).json({ error: 'Failed to read orders data' });
  }
  res.json({
    success: true,
    data: orders,
    message: 'Orders fetched successfully',
  });
});

// GET /api/options - Fetch all option data (dishes, proteins, spices, dressings)
app.get('/api/options', (req, res) => {
  const options = readJSONFile(OPTIONS_FILE);
  if (options === null) {
    return res.status(500).json({ error: 'Failed to read options data' });
  }
  res.json({
    success: true,
    data: options,
    message: 'Options fetched successfully',
  });
});

// POST /api/orders - Create a new order
app.post('/api/orders', (req, res) => {
  const newOrder = req.body;

  // Basic validation
  if (!newOrder.customer || !newOrder.base || !newOrder.protein || !newOrder.spice) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: customer, base, protein, spice',
    });
  }

  // Read existing orders
  const orders = readJSONFile(ORDERS_FILE);
  if (orders === null) {
    return res.status(500).json({ error: 'Failed to read orders data' });
  }

  // Add timestamp and ensure proper structure
  const orderToAdd = {
    ...newOrder,
    createdAt: new Date().toISOString(),
  };

  // Add new order to array
  orders.push(orderToAdd);

  // Write back to file
  const writeSuccess = writeJSONFile(ORDERS_FILE, orders);
  if (!writeSuccess) {
    return res.status(500).json({ error: 'Failed to save order' });
  }

  res.status(201).json({
    success: true,
    data: orderToAdd,
    message: 'Order created successfully',
  });
});

// GET /api/orders/:id - Get specific order by ID
app.get('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  const orders = readJSONFile(ORDERS_FILE);

  if (orders === null) {
    return res.status(500).json({ error: 'Failed to read orders data' });
  }

  const order = orders.find(order => order.id === id);
  if (!order) {
    return res.status(404).json({
      success: false,
      error: 'Order not found',
    });
  }

  res.json({
    success: true,
    data: order,
    message: 'Order fetched successfully',
  });
});

// DELETE /api/orders/:id - Delete an order
app.delete('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  const orders = readJSONFile(ORDERS_FILE);

  if (orders === null) {
    return res.status(500).json({ error: 'Failed to read orders data' });
  }

  const orderIndex = orders.findIndex(order => order.id === id);
  if (orderIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Order not found',
    });
  }

  // Remove order from array
  const deletedOrder = orders.splice(orderIndex, 1)[0];

  // Write back to file
  const writeSuccess = writeJSONFile(ORDERS_FILE, orders);
  if (!writeSuccess) {
    return res.status(500).json({ error: 'Failed to delete order' });
  }

  res.json({
    success: true,
    data: deletedOrder,
    message: 'Order deleted successfully',
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Restaurant API is running',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'API endpoint not found',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Restaurant API Server running on http://localhost:${PORT}`);
  console.log(`📋 Available endpoints:`);
  console.log(`   GET    /api/health`);
  console.log(`   GET    /api/orders`);
  console.log(`   POST   /api/orders`);
  console.log(`   GET    /api/orders/:id`);
  console.log(`   DELETE /api/orders/:id`);
  console.log(`   GET    /api/options`);
});
