import { useEffect, useState } from 'react';
import { v4 as generateId } from 'uuid';

/*
  IMPORTANT: Understanding Shallow Copy vs Deep Copy
  
  When you do: const newForm = { ...pre }
  This creates a SHALLOW copy, which means:
  
  ✅ Top-level properties are copied:
     newForm.customer !== pre.customer (new string)
     newForm.spice !== pre.spice (new string)
  
  ❌ Nested objects/arrays are still REFERENCES:
     newForm.dressings === pre.dressings (SAME ARRAY!)
     newForm.pickupDate === pre.pickupDate (SAME DATE OBJECT!)
  
  Example:
  const original = { 
    name: "John", 
    hobbies: ["reading", "coding"] 
  };
  
  const copy = { ...original };
  
  copy.name = "Jane";           // ✅ Changes only copy
  copy.hobbies.push("gaming");  // ❌ Changes BOTH original and copy!
  
  console.log(original.hobbies); // ["reading", "coding", "gaming"] 😱
  */

const FormOrder = ({ onAdd, optionData }) => {
  const bases = optionData['dish'];
  const proteins = optionData['protein'];
  const spices = optionData['spice'];
  const dressings = optionData['dressings'];

  const [formOrder, setFormOrder] = useState({
    customer: '',
    spice: '',
    base: '',
    protein: '',
    dressings: [] as string[], // ✅ Fix: Explicit typing
    quantity: 1, // ✅ Default to 1 instead of 0
    pickupDate: new Date().toISOString().split('T')[0], // ✅ Use string format for date input
    comments: '',
    address: '',
  });

  const handleOnSubmit = e => {
    e.preventDefault();

    // ✅ Enhanced validation for all required fields
    const requiredFields = ['customer', 'base', 'protein', 'spice', 'address'];
    const missingFields = requiredFields.filter(field => !formOrder[field]);
    
    if (missingFields.length > 0 || formOrder.quantity < 1) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}${formOrder.quantity < 1 ? ', quantity must be at least 1' : ''}`);
      return;
    }

    try {
      // ✅ Create proper order object with id
      const newOrder = {
        id: generateId(),
        ...formOrder,
      };

      // ✅ Call onAdd with error handling
      onAdd(newOrder);

      // ✅ Reset form after successful submission
      setFormOrder({
        customer: '',
        spice: '',
        base: '',
        protein: '',
        dressings: [] as string[],
        quantity: 1,
        pickupDate: new Date().toISOString().split('T')[0],
        comments: '',
        address: '',
      });
      
      console.log('Order created successfully:', newOrder);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order. Please try again.');
    }
  };

  const handleOnChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setFormOrder(prevForm => ({ ...prevForm, [name]: value })); // ✅ Fixed: functional update
  };

  useEffect(() => {
    console.log('formOrder: ', formOrder);
  }, [formOrder]);

  const handleCheckbox = e => {
    const { checked, value } = e.target;
    setFormOrder(prevForm => {
      // ✅ Fix: Create a proper copy of the array
      const newDressings = [...prevForm.dressings];
      if (checked) {
        // Add if not already present
        if (!newDressings.includes(value)) {
          newDressings.push(value);
        }
      } else {
        // Remove if present
        const index = newDressings.indexOf(value);
        if (index > -1) {
          newDressings.splice(index, 1);
        }
      }
      return {
        ...prevForm,
        dressings: newDressings,
      };
    });
  };

  return (
    <form className="form-order" onSubmit={handleOnSubmit}>
      <label>
        {'Customer: '}
        <input
          type="text"
          name="customer"
          value={formOrder.customer}
          placeholder="Enter customer name"
          required
          onChange={handleOnChange}
        />
      </label>
      <label>
        {'Base Dish: '}
        <select className="order-base" required name="base" value={formOrder.base} onChange={handleOnChange}>
          <option value="">Select a base dish</option>
          {Object.keys(bases).map(key => (
            <option key={key} value={bases[key]}>
              {bases[key]}
            </option>
          ))}
        </select>
      </label>
      <label>
        {'Protein: '}
        <select className="order-protein" required name="protein" value={formOrder.protein} onChange={handleOnChange}>
          <option value="">Select a protein</option>
          {Object.keys(proteins).map(key => (
            <option key={key} value={proteins[key]}>
              {proteins[key]}
            </option>
          ))}
        </select>
      </label>
      <fieldset>
        <legend>Spice Level: </legend>
        {Object.keys(spices).map(key => (
          <label key={key}>
            <input
              type="radio"
              name="spice"
              value={spices[key]}
              checked={formOrder.spice === spices[key]}
              onChange={handleOnChange}
              required
            />
            {spices[key]}
          </label>
        ))}
      </fieldset>
      <fieldset>
        <legend>Dressings: </legend>
        {Object.keys(dressings).map(key => (
          <label key={key}>
            <input
              type="checkbox"
              className={`dressings-${dressings[key]}`}
              name="dressings"
              value={dressings[key]}
              checked={formOrder.dressings.includes(dressings[key])}
              onChange={handleCheckbox}
            />
            {dressings[key]}
          </label>
        ))}
      </fieldset>
      <button type="submit">Create Order</button>
    </form>
  );
};
export default FormOrder;
