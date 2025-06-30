#!/bin/bash

# Restaurant API Test Script
echo "🧪 Testing Restaurant API..."

API_URL="http://localhost:3001/api"

echo ""
echo "1. 🔍 Health Check:"
curl -s $API_URL/health | jq '.'

echo ""
echo "2. 📋 Get All Orders:"
curl -s $API_URL/orders | jq '.data | length' 

echo ""
echo "3. 🍽️ Get Menu Options:"
curl -s $API_URL/options | jq '.data | keys'

echo ""
echo "4. ➕ Create New Order:"
NEW_ORDER='{
  "id": "test-'$(date +%s)'",
  "customer": "API Test User",
  "spice": "Hot",
  "base": "Salad Bowl", 
  "protein": "Tofu",
  "dressings": ["Balsamic Vinaigrette", "Caesar"],
  "quantity": 2,
  "pickupDate": "2025-07-05",
  "comments": "Created via API test",
  "address": "456 API Test Lane"
}'

curl -X POST $API_URL/orders \
  -H "Content-Type: application/json" \
  -d "$NEW_ORDER" | jq '.message'

echo ""
echo "5. 📊 Total Orders After Creation:"
curl -s $API_URL/orders | jq '.data | length'

echo ""
echo "✅ API Test Complete!"
