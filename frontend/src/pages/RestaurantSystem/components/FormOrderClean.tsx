import React from 'react';
import { v4 as generateId } from 'uuid';
import { useForm } from '../hooks/useForm';
import { FormField } from './FormField';
import { FORM_FIELDS, FORM_SECTIONS } from './FormFieldConfig';

interface FormOrderCleanProps {
  onAdd: (order: any) => void;
  optionData: any;
}

// Validation rules
const validationRules = {
  customer: (value: string) => (!value ? 'Customer name is required' : null),
  email: (value: string) => {
    if (!value) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(value) ? 'Invalid email format' : null;
  },
  password: (value: string) => {
    if (!value) return null;
    return value.length < 8 ? 'Password must be at least 8 characters' : null;
  },
  quantity: (value: number) => {
    if (!value || value < 1) return 'Quantity must be at least 1';
    if (value > 10) return 'Maximum quantity is 10';
    return null;
  },
  acceptTerms: (value: boolean) => (!value ? 'You must accept the terms' : null),
};

// Initial form values
const getInitialValues = () => ({
  customer: '',
  email: '',
  phone: '',
  website: '',
  password: '',
  profilePicture: null,
  base: '',
  protein: '',
  quantity: 1,
  urgency: 'normal',
  spice: '',
  dressings: [],
  spiceLevel: 3,
  favoriteColor: '#ff6b6b',
  isVegetarian: false,
  isGlutenFree: false,
  dietaryRestrictions: [],
  pickupDate: new Date().toISOString().split('T')[0],
  deliveryTime: '',
  orderDateTime: '',
  address: '',
  comments: '',
  rating: 5,
  acceptTerms: false,
  newsletter: false,
});

export const FormOrderClean: React.FC<FormOrderCleanProps> = ({ onAdd, optionData }) => {
  const bases = optionData['base'] || optionData['dish'];
  const proteins = optionData['protein'];
  const spices = optionData['spice'];
  const dressings = optionData['dressings'];

  const { values, errors, touched, isSubmitting, handleChange, handleSubmit, reset } = useForm({
    initialValues: getInitialValues(),
    validationRules,
    onSubmit: async data => {
      const newOrder = {
        id: generateId(),
        ...data,
      };
      onAdd(newOrder);
      console.log('Order created successfully:', newOrder);
    },
  });

  // Group fields by section
  const fieldsBySection = FORM_FIELDS.reduce(
    (acc, field) => {
      if (!acc[field.section]) {
        acc[field.section] = [];
      }
      acc[field.section].push(field);
      return acc;
    },
    {} as Record<string, typeof FORM_FIELDS>
  );

  // Section titles and icons
  const sectionConfig = {
    [FORM_SECTIONS.CUSTOMER]: { title: '👤 Customer Information', icon: '👤' },
    [FORM_SECTIONS.ORDER]: { title: '🍽️ Order Details', icon: '🍽️' },
    [FORM_SECTIONS.PREFERENCES]: { title: '🌶️ Taste Preferences', icon: '🌶️' },
    [FORM_SECTIONS.DIETARY]: { title: '🥗 Dietary Preferences', icon: '🥗' },
    [FORM_SECTIONS.DELIVERY]: { title: '📅 Delivery Information', icon: '📅' },
    [FORM_SECTIONS.NOTES]: { title: '💬 Additional Notes', icon: '💬' },
    [FORM_SECTIONS.FEEDBACK]: { title: '⭐ Experience Rating', icon: '⭐' },
    [FORM_SECTIONS.TERMS]: { title: '✅ Terms & Conditions', icon: '✅' },
  };

  // Helper to get options for select/radio fields
  const getFieldOptions = (fieldName: string) => {
    switch (fieldName) {
      case 'base':
        return Object.keys(bases).map(key => ({ value: bases[key], label: bases[key] }));
      case 'protein':
        return Object.keys(proteins).map(key => ({ value: proteins[key], label: proteins[key] }));
      case 'spice':
        return Object.keys(spices).map(key => ({ value: spices[key], label: spices[key] }));
      default:
        return [];
    }
  };

  return (
    <form className="form-order-clean" onSubmit={handleSubmit}>
      {Object.entries(fieldsBySection).map(([sectionKey, fields]) => (
        <div key={sectionKey} className="form-section">
          <h3 className="section-title">{sectionConfig[sectionKey]?.title || sectionKey}</h3>

          <div className="section-fields">
            {fields.map(field => (
              <FormField
                key={field.name}
                config={field}
                value={values[field.name]}
                error={errors[field.name]}
                touched={touched[field.name]}
                onChange={handleChange}
                options={getFieldOptions(field.name)}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Special sections that need custom logic */}
      <div className="form-section">
        <h3 className="section-title">🌶️ Spice Level Selection</h3>
        <fieldset className="spice-fieldset">
          <legend>Spice Level *</legend>
          <div className="radio-group">
            {Object.keys(spices).map(key => (
              <label key={key} className="radio-option">
                <input
                  type="radio"
                  name="spice"
                  value={spices[key]}
                  checked={values.spice === spices[key]}
                  onChange={handleChange}
                  required
                />
                <span className="radio-label">{spices[key]}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="form-section">
        <h3 className="section-title">🥗 Dressings & Sauces</h3>
        <fieldset className="dressings-fieldset">
          <legend>Select Multiple Dressings</legend>
          <div className="checkbox-group">
            {Object.keys(dressings).map(key => (
              <label key={key} className="checkbox-option">
                <input
                  type="checkbox"
                  name="dressings"
                  value={dressings[key]}
                  checked={values.dressings.includes(dressings[key])}
                  onChange={handleChange}
                />
                <span className="checkbox-label">{dressings[key]}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Progress and calculations */}
      <div className="form-section">
        <h3 className="section-title">📊 Order Summary</h3>

        <div className="progress-section">
          <label className="progress-field">
            Form Completion Progress
            <progress
              value={
                Object.values(values).filter(
                  value =>
                    value !== '' &&
                    value !== 0 &&
                    value !== false &&
                    value !== null &&
                    (!Array.isArray(value) || value.length > 0)
                ).length
              }
              max={Object.keys(values).length}
              className="completion-progress"
            />
            <span className="progress-text">
              {Math.round(
                (Object.values(values).filter(
                  value =>
                    value !== '' &&
                    value !== 0 &&
                    value !== false &&
                    value !== null &&
                    (!Array.isArray(value) || value.length > 0)
                ).length /
                  Object.keys(values).length) *
                  100
              )}
              % Complete
            </span>
          </label>
        </div>

        <div className="output-section">
          <label className="output-field">
            Live Order Total
            <output className="order-total">
              ${(values.quantity * 12.99 + values.rating * 2.5).toFixed(2)}
            </output>
            <small className="calculation-note">
              (Base: ${values.quantity} × $12.99 + Rating Bonus: ${values.rating} × $2.50)
            </small>
          </label>
        </div>
      </div>

      <div className="submit-section">
        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? '⏳ Creating Order...' : '🚀 Create Order'}
        </button>
      </div>
    </form>
  );
};
