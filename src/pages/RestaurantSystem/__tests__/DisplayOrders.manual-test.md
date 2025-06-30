# 🧪 Part 1: Display Orders - Test Requirements

## 📋 **MANUAL TESTING CHECKLIST**

When you complete your implementation, verify these requirements:

### ✅ **BASIC DISPLAY REQUIREMENTS (60 points)**

1. **[10 pts] Render All Orders**

   - [ ] All 3 orders from `orders.json` are displayed
   - [ ] Each order appears as a separate card/item

2. **[5 pts] Order ID Display**

   - [ ] Each order shows a unique UUID
   - [ ] ID should be shortened (first 8 characters)
   - [ ] Format: `3c98f5f1...`, `fc82dc7b...`, `b1f1a770...`

3. **[5 pts] Customer Name**

   - [ ] "Alice" is displayed
   - [ ] "Bob" is displayed
   - [ ] "Clara" is displayed

4. **[5 pts] Base Dish Display**

   - [ ] Shows "Salad Bowl" for Alice
   - [ ] Shows "Grain Bowl" for Bob
   - [ ] Shows "Noodle Bowl" for Clara

5. **[5 pts] Protein Display**

   - [ ] Shows "Grilled Chicken" for Alice
   - [ ] Shows "Tofu" for Bob
   - [ ] Shows "Steak" for Clara

6. **[5 pts] Spice Level**

   - [ ] Shows "Mild" for Alice
   - [ ] Shows "Medium" for Bob
   - [ ] Shows "Hot" for Clara

7. **[10 pts] Dressings Display**

   - [ ] Alice: Shows "Balsamic Vinaigrette, Ranch" (or similar format)
   - [ ] Bob: Shows "None" (empty array)
   - [ ] Clara: Shows "Caesar"

8. **[5 pts] Quantity/Servings**

   - [ ] Alice: Shows "2"
   - [ ] Bob: Shows "1"
   - [ ] Clara: Shows "3"

9. **[5 pts] Pickup Date**

   - [ ] Alice: Shows "2025-07-01"
   - [ ] Bob: Shows "2025-07-02"
   - [ ] Clara: Shows "2025-07-03"

10. **[5 pts] Additional Notes**
    - [ ] Alice: Shows "No onions please"
    - [ ] Bob: Shows "None" (empty comments)
    - [ ] Clara: Shows "Extra spicy and gluten-free"

### ✅ **FUNCTIONALITY REQUIREMENTS (30 points)**

11. **[10 pts] Edit Button**

    - [ ] Each order has an "Edit" button
    - [ ] Clicking Edit loads data into form
    - [ ] Form button changes to "Update Order"

12. **[10 pts] Delete Button**

    - [ ] Each order has a "Delete" button
    - [ ] Clicking Delete removes order from list
    - [ ] Other orders remain visible

13. **[10 pts] Data Loading**
    - [ ] Orders load from `orders.json` on component mount
    - [ ] UUIDs are generated for each order
    - [ ] `useEffect` is used for initial loading

### ✅ **EDGE CASES (10 points)**

14. **[3 pts] Empty Dressings**

    - [ ] Bob's empty dressings array shows "None"
    - [ ] No error/crash when dressings array is empty

15. **[3 pts] Empty Comments**

    - [ ] Bob's empty comments show "None"
    - [ ] No error/crash when comments are empty

16. **[4 pts] Multiple Dressings**
    - [ ] Alice's multiple dressings are displayed properly
    - [ ] Comma-separated or proper formatting

---

## 🎯 **TESTING SCENARIOS**

### **Scenario A: Initial Page Load**

```
GIVEN: User opens the Restaurant Orders page
WHEN: Component mounts
THEN:
  - 3 orders are displayed
  - All order information is correctly mapped and shown
  - Each order has Edit and Delete buttons
```

### **Scenario B: Data Mapping Verification**

```
GIVEN: Orders are loaded from JSON
WHEN: Displaying order details
THEN:
  - Base dish IDs (d1, d2, d3) are mapped to readable names
  - Protein IDs (p1, p2, p3) are mapped to readable names
  - Raw IDs are NOT visible to user
```

### **Scenario C: Empty Data Handling**

```
GIVEN: An order has empty dressings or comments
WHEN: Displaying that order
THEN:
  - Empty fields show "None" instead of blank
  - No JavaScript errors occur
```

### **Scenario D: Button Functionality**

```
GIVEN: Orders are displayed with Edit/Delete buttons
WHEN: User clicks Edit button
THEN: Form is populated with order data

WHEN: User clicks Delete button
THEN: Order is removed from the list
```

---

## 📊 **SCORING (CodeSignal Style)**

**TOTAL: 100 points**

- **Basic Display**: 60 points
- **Functionality**: 30 points
- **Edge Cases**: 10 points

**Grading Scale:**

- 🟢 **90-100**: Excellent (All requirements met)
- 🟡 **70-89**: Good (Most requirements met)
- 🔴 **Below 70**: Needs improvement

---

## 🚀 **EXPECTED OUTPUT EXAMPLE**

Your component should render something like:

```
Restaurant Orders

Order: 3c98f5f1
Customer: Alice
Dish: Salad Bowl
Protein: Grilled Chicken
Spice: Mild
Dressings: Balsamic Vinaigrette, Ranch
Quantity: 2
Pickup: 2025-07-01
Notes: No onions please
[Edit] [Delete]

Order: fc82dc7b
Customer: Bob
Dish: Grain Bowl
Protein: Tofu
Spice: Medium
Dressings: None
Quantity: 1
Pickup: 2025-07-02
Notes: None
[Edit] [Delete]

Order: b1f1a770
Customer: Clara
Dish: Noodle Bowl
Protein: Steak
Spice: Hot
Dressings: Caesar
Quantity: 3
Pickup: 2025-07-03
Notes: Extra spicy and gluten-free
[Edit] [Delete]
```

---

## ⚡ **IMPLEMENTATION TIPS**

1. **Use `useEffect`** to load orders on mount
2. **UUIDs are already included** in the JSON data - no need to generate them
3. **No ID mapping needed** - dish and protein names are already readable
4. **Handle empty arrays/strings** by showing "None"
5. **Add `data-testid`** attributes for easier testing:
   ```jsx
   <div data-testid={`order-card-${order.id}`}>
   ```
6. **Shorten UUIDs for display** - show only first 8 characters

Use this checklist to verify your implementation before considering it complete! ✅
