const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Data file paths for Restaurant System
const ORDERS_FILE = path.join(__dirname, '../data/restaurant/orders.json');
const OPTIONS_FILE = path.join(__dirname, '../data/restaurant/optionData.json');

// Helper functions
const readJSONFile = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
};

const writeJSONFile = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error writing file ${filePath}:`, error);
    return false;
  }
};

// GET /api/restaurant/orders - Fetch all orders
router.get('/orders', (req, res) => {
  const orders = readJSONFile(ORDERS_FILE);
  if (orders === null) {
    return res.status(500).json({ error: 'Failed to read orders data' });
  }
  res.json({
    success: true,
    data: orders,
    message: 'Orders fetched successfully'
  });
});

// GET /api/restaurant/options - Fetch menu options
router.get('/options', (req, res) => {
  const options = readJSONFile(OPTIONS_FILE);
  if (options === null) {
    return res.status(500).json({ error: 'Failed to read options data' });
  }
  res.json({
    success: true,
    data: options,
    message: 'Options fetched successfully'
  });
});

// POST /api/restaurant/orders - Create new order
router.post('/orders', (req, res) => {
  const newOrder = req.body;
  
  // Basic validation
  if (!newOrder.customer || !newOrder.base || !newOrder.protein || !newOrder.spice) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: customer, base, protein, spice'
    });
  }

  const orders = readJSONFile(ORDERS_FILE);
  if (orders === null) {
    return res.status(500).json({ error: 'Failed to read orders data' });
  }

  const orderToAdd = {
    ...newOrder,
    createdAt: new Date().toISOString()
  };

  orders.push(orderToAdd);

  const writeSuccess = writeJSONFile(ORDERS_FILE, orders);
  if (!writeSuccess) {
    return res.status(500).json({ error: 'Failed to save order' });
  }

  res.status(201).json({
    success: true,
    data: orderToAdd,
    message: 'Order created successfully'
  });
});

// GET /api/restaurant/orders/:id - Get specific order
router.get('/orders/:id', (req, res) => {
  const { id } = req.params;
  const orders = readJSONFile(ORDERS_FILE);
  
  if (orders === null) {
    return res.status(500).json({ error: 'Failed to read orders data' });
  }

  const order = orders.find(order => order.id === id);
  if (!order) {
    return res.status(404).json({
      success: false,
      error: 'Order not found'
    });
  }

  res.json({
    success: true,
    data: order,
    message: 'Order fetched successfully'
  });
});

// DELETE /api/restaurant/orders/:id - Delete order
router.delete('/orders/:id', (req, res) => {
  const { id } = req.params;
  const orders = readJSONFile(ORDERS_FILE);
  
  if (orders === null) {
    return res.status(500).json({ error: 'Failed to read orders data' });
  }

  const orderIndex = orders.findIndex(order => order.id === id);
  if (orderIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Order not found'
    });
  }

  const deletedOrder = orders.splice(orderIndex, 1)[0];

  const writeSuccess = writeJSONFile(ORDERS_FILE, orders);
  if (!writeSuccess) {
    return res.status(500).json({ error: 'Failed to delete order' });
  }

  res.json({
    success: true,
    data: deletedOrder,
    message: 'Order deleted successfully'
  });
});

module.exports = router;
