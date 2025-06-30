# Restaurant Order System - Backend API

A simple Node.js Express server that provides REST API endpoints for the Restaurant Order System.

## Features

- ✅ Fetch all orders
- ✅ Create new orders  
- ✅ Get specific order by ID
- ✅ Delete orders
- ✅ Fetch menu options (dishes, proteins, spices, dressings)
- ✅ JSON file-based data storage
- ✅ CORS enabled for frontend integration

## Quick Start

```bash
# Install dependencies
npm install

# Start the server
npm start
```

The server will run on `http://localhost:3001`

## API Endpoints

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create a new order
- `GET /api/orders/:id` - Get order by ID
- `DELETE /api/orders/:id` - Delete order by ID

### Options
- `GET /api/options` - Get menu options (dishes, proteins, spices, dressings)

### Health Check
- `GET /api/health` - Server health check

## Example Usage

### Create a new order:
```bash
curl -X POST http://localhost:3001/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "id": "unique-id-here",
    "customer": "John Doe",
    "spice": "Medium",
    "base": "Grain Bowl",
    "protein": "Grilled Chicken",
    "dressings": ["Ranch", "Caesar"],
    "quantity": 2,
    "pickupDate": "2025-07-01",
    "comments": "Extra spicy",
    "address": "123 Main St"
  }'
```

### Get all orders:
```bash
curl http://localhost:3001/api/orders
```

### Get menu options:
```bash
curl http://localhost:3001/api/options
```

## Data Storage

- Orders: `backend/data/orders.json`
- Menu Options: `backend/data/optionData.json`

Data is persisted to JSON files and will survive server restarts.

## Response Format

All API responses follow this format:

```json
{
  "success": true,
  "data": {...},
  "message": "Description of the operation"
}
```

Error responses:
```json
{
  "success": false,
  "error": "Error description"
}
```
