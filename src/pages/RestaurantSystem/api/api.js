// API utility functions for frontend integration
const API_BASE_URL = 'http://localhost:3001/api';

export const api = {
  // Fetch all orders
  async getOrders() {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`);
      const result = await response.json();
      if (result.success) {
        return result.data;
      } else {
        throw new Error(result.error || 'Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  // Create a new order
  async createOrder(orderData) {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      const result = await response.json();
      if (result.success) {
        return result.data;
      } else {
        throw new Error(result.error || 'Failed to create order');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Fetch menu options
  async getOptions() {
    try {
      const response = await fetch(`${API_BASE_URL}/options`);
      const result = await response.json();
      if (result.success) {
        return result.data;
      } else {
        throw new Error(result.error || 'Failed to fetch options');
      }
    } catch (error) {
      console.error('Error fetching options:', error);
      throw error;
    }
  },

  // Get specific order by ID
  async getOrder(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${id}`);
      const result = await response.json();
      if (result.success) {
        return result.data;
      } else {
        throw new Error(result.error || 'Failed to fetch order');
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  },

  // Delete an order
  async deleteOrder(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.success) {
        return result.data;
      } else {
        throw new Error(result.error || 'Failed to delete order');
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  },

  // Health check
  async checkHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      const result = await response.json();
      return result.success;
    } catch (error) {
      console.error('Error checking API health:', error);
      return false;
    }
  },
};

// Example usage:
/*
// Fetch all orders
const orders = await api.getOrders();

// Create new order
const newOrder = await api.createOrder({
  id: 'unique-id',
  customer: 'John Doe',
  spice: 'Medium',
  base: 'Grain Bowl',
  protein: 'Grilled Chicken',
  dressings: ['Ranch'],
  quantity: 1,
  pickupDate: '2025-07-01',
  comments: 'Extra spicy',
  address: '123 Main St'
});

// Get menu options
const options = await api.getOptions();
*/
