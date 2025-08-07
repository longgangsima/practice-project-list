import { useEffect, useState } from 'react';
import { v4 as generateId } from 'uuid';

const FormOrder = ({ onAdd, optionData }) => {
  const bases = optionData['base'] || optionData['dish']; // Support both 'base' and legacy 'dish'
  const proteins = optionData['protein'];
  const spices = optionData['spice'];
  const dressings = optionData['dressings'];

  const [formData, setFormData] = useState({
    customer: '',
    spice: '',
    base: '',
    protein: '',
    dressings: [] as string[],
    quantity: 1,
    pickupDate: new Date().toISOString().split('T')[0],
    comments: '',
    address: '',
    // Additional form fields
    email: '',
    phone: '',
    website: '',
    password: '',
    deliveryTime: '',
    orderDateTime: '',
    favoriteColor: '#ff6b6b',
    spiceLevel: 3,
    rating: 5,
    isVegetarian: false,
    isGlutenFree: false,
    acceptTerms: false,
    newsletter: false,
    dietaryRestrictions: [] as string[],
    urgency: 'normal',
    profilePicture: null as File | null,
  });

  const handleSubmit = e => {
    e.preventDefault();

    // Enhanced validation for all required fields
    const requiredFields = ['customer', 'base', 'protein', 'spice'];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0 || formData.quantity < 1 || !formData.acceptTerms) {
      alert(
        `Please complete: ${missingFields.join(', ')}${formData.quantity < 1 ? ', quantity must be at least 1' : ''}${!formData.acceptTerms ? ', accept terms and conditions' : ''}`
      );
      return;
    }

    try {
      // Create proper order object with id
      const newOrder = {
        id: generateId(),
        ...formData,
      };

      // Call onAdd with error handling
      onAdd(newOrder);

      // Reset form after successful submission
      setFormData({
        customer: '',
        spice: '',
        base: '',
        protein: '',
        dressings: [] as string[],
        quantity: 1,
        pickupDate: new Date().toISOString().split('T')[0],
        comments: '',
        address: '',
        email: '',
        phone: '',
        website: '',
        password: '',
        deliveryTime: '',
        orderDateTime: '',
        favoriteColor: '#ff6b6b',
        spiceLevel: 3,
        rating: 5,
        isVegetarian: false,
        isGlutenFree: false,
        acceptTerms: false,
        newsletter: false,
        dietaryRestrictions: [] as string[],
        urgency: 'normal',
        profilePicture: null as File | null,
      });

      console.log('Order created successfully:', newOrder);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order. Please try again.');
    }
  };

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleNumberChange = e => {
    const name = e.target.name;
    const value = parseFloat(e.target.value) || 0;
    setFormData(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleBooleanChange = e => {
    const name = e.target.name;
    const checked = e.target.checked;
    setFormData(prevForm => ({ ...prevForm, [name]: checked }));
  };

  const handleMultiCheckbox = e => {
    const { checked, value, name } = e.target;
    setFormData(prevForm => {
      const currentArray = prevForm[name] as string[];
      const newArray = [...currentArray];
      if (checked) {
        if (!newArray.includes(value)) {
          newArray.push(value);
        }
      } else {
        const index = newArray.indexOf(value);
        if (index > -1) {
          newArray.splice(index, 1);
        }
      }
      return { ...prevForm, [name]: newArray };
    });
  };

  const handleFileChange = e => {
    const name = e.target.name;
    const file = e.target.files?.[0] || null;
    setFormData(prevForm => ({ ...prevForm, [name]: file }));
  };

  const handleCheckbox = e => {
    const { checked, value } = e.target;
    setFormData(prevForm => {
      const newDressings = [...prevForm.dressings];
      if (checked) {
        if (!newDressings.includes(value)) {
          newDressings.push(value);
        }
      } else {
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

  useEffect(() => {
    console.log('formData: ', formData);
  }, [formData]);

  return (
    <form className="form-order" onSubmit={handleSubmit}>
      {/* 👤 CUSTOMER INFORMATION SECTION */}
      <div className="form-section">
        <h3 className="section-title">👤 Customer Information</h3>

        <div className="form-row">
          <label className="form-field">
            Customer Name *
            <input
              type="text"
              name="customer"
              value={formData.customer}
              placeholder="Enter full name"
              required
              onChange={handleChange}
            />
          </label>

          <label className="form-field">
            Email Address
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="customer@example.com"
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form-row">
          <label className="form-field">
            Phone Number
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              placeholder="+1 (555) 123-4567"
              pattern="[+]?[\d\s\-\(\)]+"
              onChange={handleChange}
            />
          </label>

          <label className="form-field">
            Website (Optional)
            <input
              type="url"
              name="website"
              value={formData.website}
              placeholder="https://example.com"
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form-row">
          <label className="form-field">
            Account Password
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Create a secure password"
              minLength={8}
              onChange={handleChange}
            />
          </label>

          <label className="form-field">
            Profile Picture
            <input
              type="file"
              name="profilePicture"
              accept="image/*"
              onChange={handleFileChange}
              title="Upload a profile picture"
            />
          </label>
        </div>
      </div>

      {/* 🍽️ ORDER DETAILS SECTION */}
      <div className="form-section">
        <h3 className="section-title">🍽️ Order Details</h3>

        <div className="form-row">
          <label className="form-field">
            Base Dish *
            <select
              className="order-base"
              required
              name="base"
              value={formData.base}
              onChange={handleChange}
            >
              <option value="">Select a base dish</option>
              {Object.keys(bases).map(key => (
                <option key={key} value={bases[key]}>
                  {bases[key]}
                </option>
              ))}
            </select>
          </label>

          <label className="form-field">
            Protein *
            <select
              className="order-protein"
              required
              name="protein"
              value={formData.protein}
              onChange={handleChange}
            >
              <option value="">Select a protein</option>
              {Object.keys(proteins).map(key => (
                <option key={key} value={proteins[key]}>
                  {proteins[key]}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="form-row">
          <label className="form-field">
            Quantity *
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              min={1}
              max={10}
              step={1}
              onChange={handleNumberChange}
            />
          </label>

          <label className="form-field">
            Order Priority
            <select name="urgency" value={formData.urgency} onChange={handleChange}>
              <option value="low">🐌 Low Priority</option>
              <option value="normal">⏱️ Normal</option>
              <option value="high">🔥 Urgent</option>
              <option value="express">⚡ Express</option>
            </select>
          </label>
        </div>
      </div>

      {/* 🌶️ PREFERENCES SECTION */}
      <div className="form-section">
        <h3 className="section-title">🌶️ Taste Preferences</h3>

        <fieldset className="spice-fieldset">
          <legend>Spice Level *</legend>
          <div className="radio-group">
            {Object.keys(spices).map(key => (
              <label key={key} className="radio-option">
                <input
                  type="radio"
                  name="spice"
                  value={spices[key]}
                  checked={formData.spice === spices[key]}
                  onChange={handleChange}
                  required
                />
                <span className="radio-label">{spices[key]}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="dressings-fieldset">
          <legend>Dressings & Sauces</legend>
          <div className="checkbox-group">
            {Object.keys(dressings).map(key => (
              <label key={key} className="checkbox-option">
                <input
                  type="checkbox"
                  className={`dressings-${dressings[key]}`}
                  name="dressings"
                  value={dressings[key]}
                  checked={formData.dressings.includes(dressings[key])}
                  onChange={handleCheckbox}
                />
                <span className="checkbox-label">{dressings[key]}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="preference-sliders">
          <label className="slider-field">
            Spice Intensity Level: <strong>{formData.spiceLevel}/10</strong>
            <input
              type="range"
              name="spiceLevel"
              value={formData.spiceLevel}
              min={1}
              max={10}
              step={1}
              onChange={handleNumberChange}
              className="spice-slider"
            />
          </label>
        </div>
      </div>

      {/* 🥗 DIETARY PREFERENCES */}
      <div className="form-section">
        <h3 className="section-title">🥗 Dietary Preferences</h3>

        <div className="dietary-options">
          <label className="toggle-option">
            <input
              type="checkbox"
              name="isVegetarian"
              checked={formData.isVegetarian}
              onChange={handleBooleanChange}
            />
            <span className="toggle-label">🥬 Vegetarian</span>
          </label>

          <label className="toggle-option">
            <input
              type="checkbox"
              name="isGlutenFree"
              checked={formData.isGlutenFree}
              onChange={handleBooleanChange}
            />
            <span className="toggle-label">🌾 Gluten-Free</span>
          </label>
        </div>

        <fieldset className="restrictions-fieldset">
          <legend>Allergies & Restrictions</legend>
          <div className="checkbox-group">
            {['Nuts', 'Dairy', 'Eggs', 'Shellfish', 'Soy'].map(restriction => (
              <label key={restriction} className="checkbox-option">
                <input
                  type="checkbox"
                  name="dietaryRestrictions"
                  value={restriction}
                  checked={formData.dietaryRestrictions.includes(restriction)}
                  onChange={handleMultiCheckbox}
                />
                <span className="checkbox-label">{restriction}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {/* 📅 DELIVERY INFORMATION */}
      <div className="form-section">
        <h3 className="section-title">📅 Delivery Information</h3>

        <div className="form-row">
          <label className="form-field">
            Pickup Date *
            <input
              type="date"
              name="pickupDate"
              value={formData.pickupDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={handleChange}
            />
          </label>

          <label className="form-field">
            Preferred Time
            <input
              type="time"
              name="deliveryTime"
              value={formData.deliveryTime}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form-row">
          <label className="form-field">
            Exact Order Date & Time
            <input
              type="datetime-local"
              name="orderDateTime"
              value={formData.orderDateTime}
              min={new Date().toISOString().slice(0, 16)}
              onChange={handleChange}
              title="Select precise order date and time"
            />
          </label>
        </div>

        <label className="form-field full-width">
          Delivery Address
          <textarea
            name="address"
            value={formData.address}
            placeholder="Enter complete delivery address..."
            rows={3}
            onChange={handleChange}
          />
        </label>
      </div>

      {/* 💬 ADDITIONAL NOTES */}
      <div className="form-section">
        <h3 className="section-title">💬 Additional Notes</h3>

        <label className="form-field full-width">
          Special Instructions or Comments
          <textarea
            name="comments"
            value={formData.comments}
            placeholder="Any special requests, cooking preferences, or delivery instructions..."
            rows={4}
            maxLength={500}
            onChange={handleChange}
          />
          <small className="char-counter">{formData.comments.length}/500 characters</small>
        </label>

        <label className="color-field">
          Preferred Theme Color
          <input
            type="color"
            name="favoriteColor"
            value={formData.favoriteColor}
            onChange={handleChange}
            title="Choose your preferred color theme"
          />
        </label>
      </div>

      {/* ⭐ FEEDBACK SECTION */}
      <div className="form-section">
        <h3 className="section-title">⭐ Experience Rating</h3>

        <label className="slider-field">
          Rate Our Service: <strong>⭐ {formData.rating}/5</strong>
          <input
            type="range"
            name="rating"
            value={formData.rating}
            min={1}
            max={5}
            step={0.5}
            onChange={handleNumberChange}
            className="rating-slider"
          />
        </label>

        <div className="progress-section">
          <label className="progress-field">
            Form Completion Progress
            <progress
              value={
                Object.values(formData).filter(
                  value =>
                    value !== '' &&
                    value !== 0 &&
                    value !== false &&
                    value !== null &&
                    (!Array.isArray(value) || value.length > 0)
                ).length
              }
              max={Object.keys(formData).length}
              className="completion-progress"
            />
            <span className="progress-text">
              {Math.round(
                (Object.values(formData).filter(
                  value =>
                    value !== '' &&
                    value !== 0 &&
                    value !== false &&
                    value !== null &&
                    (!Array.isArray(value) || value.length > 0)
                ).length /
                  Object.keys(formData).length) *
                  100
              )}
              % Complete
            </span>
          </label>
        </div>

        <div className="meter-section">
          <label className="meter-field">
            Order Value Score
            <meter
              value={formData.quantity * formData.rating * formData.spiceLevel}
              min={0}
              max={250}
              low={50}
              high={150}
              optimum={100}
              className="value-meter"
              title={`Order Score: ${formData.quantity * formData.rating * formData.spiceLevel}/250`}
            />
            <output className="meter-output">
              Score: {formData.quantity * formData.rating * formData.spiceLevel}/250
            </output>
          </label>
        </div>

        <div className="output-section">
          <label className="output-field">
            Live Order Total
            <output className="order-total" htmlFor="quantity rating spiceLevel">
              ${(formData.quantity * 12.99 + formData.rating * 2.5).toFixed(2)}
            </output>
            <small className="calculation-note">
              (Base: ${formData.quantity} × $12.99 + Rating Bonus: ${formData.rating} × $2.50)
            </small>
          </label>
        </div>
      </div>

      {/* ✅ TERMS & CONDITIONS */}
      <div className="form-section terms-section">
        <label className="terms-checkbox">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleBooleanChange}
            required
          />
          <span className="terms-text">
            I accept the <strong>terms and conditions</strong> and confirm that all information
            provided is accurate *
          </span>
        </label>

        <label className="newsletter-checkbox">
          <input
            type="checkbox"
            name="newsletter"
            checked={formData.newsletter}
            onChange={handleBooleanChange}
          />
          <span className="newsletter-text">
            📧 Subscribe to our newsletter for special offers and updates
          </span>
        </label>
      </div>

      {/* 🚀 SUBMIT BUTTON */}
      <div className="submit-section">
        <button type="submit" className="submit-btn">
          🚀 Create Order
        </button>
      </div>
    </form>
  );
};

export default FormOrder;
