// Form Field Configuration Pattern
export interface FormFieldConfig {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  validation?: {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
  options?: Array<{ value: string; label: string }>;
  section: string;
  icon?: string;
}

export const FORM_SECTIONS = {
  CUSTOMER: 'customer',
  ORDER: 'order',
  PREFERENCES: 'preferences',
  DIETARY: 'dietary',
  DELIVERY: 'delivery',
  NOTES: 'notes',
  FEEDBACK: 'feedback',
  TERMS: 'terms',
} as const;

export const FORM_FIELDS: FormFieldConfig[] = [
  // Customer Information
  {
    name: 'customer',
    type: 'text',
    label: 'Customer Name',
    placeholder: 'Enter full name',
    required: true,
    section: FORM_SECTIONS.CUSTOMER,
    icon: '👤',
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email Address',
    placeholder: 'customer@example.com',
    section: FORM_SECTIONS.CUSTOMER,
    icon: '📧',
  },
  {
    name: 'phone',
    type: 'tel',
    label: 'Phone Number',
    placeholder: '+1 (555) 123-4567',
    validation: { pattern: '[+]?[\\d\\s\\-\\(\\)]+' },
    section: FORM_SECTIONS.CUSTOMER,
    icon: '📱',
  },
  {
    name: 'website',
    type: 'url',
    label: 'Website (Optional)',
    placeholder: 'https://example.com',
    section: FORM_SECTIONS.CUSTOMER,
    icon: '🌐',
  },
  {
    name: 'password',
    type: 'password',
    label: 'Account Password',
    placeholder: 'Create a secure password',
    validation: { minLength: 8 },
    section: FORM_SECTIONS.CUSTOMER,
    icon: '🔒',
  },
  {
    name: 'profilePicture',
    type: 'file',
    label: 'Profile Picture',
    section: FORM_SECTIONS.CUSTOMER,
    icon: '📷',
  },

  // Order Details
  {
    name: 'quantity',
    type: 'number',
    label: 'Quantity',
    required: true,
    validation: { min: 1, max: 10 },
    section: FORM_SECTIONS.ORDER,
    icon: '🔢',
  },
  {
    name: 'urgency',
    type: 'select',
    label: 'Order Priority',
    options: [
      { value: 'low', label: '🐌 Low Priority' },
      { value: 'normal', label: '⏱️ Normal' },
      { value: 'high', label: '🔥 Urgent' },
      { value: 'express', label: '⚡ Express' },
    ],
    section: FORM_SECTIONS.ORDER,
    icon: '🚀',
  },

  // Preferences
  {
    name: 'spiceLevel',
    type: 'range',
    label: 'Spice Intensity Level',
    validation: { min: 1, max: 10 },
    section: FORM_SECTIONS.PREFERENCES,
    icon: '🌶️',
  },
  {
    name: 'favoriteColor',
    type: 'color',
    label: 'Preferred Theme Color',
    section: FORM_SECTIONS.PREFERENCES,
    icon: '🎨',
  },

  // Dietary
  {
    name: 'isVegetarian',
    type: 'checkbox',
    label: '🥬 Vegetarian',
    section: FORM_SECTIONS.DIETARY,
  },
  {
    name: 'isGlutenFree',
    type: 'checkbox',
    label: '🌾 Gluten-Free',
    section: FORM_SECTIONS.DIETARY,
  },

  // Delivery
  {
    name: 'pickupDate',
    type: 'date',
    label: 'Pickup Date',
    required: true,
    section: FORM_SECTIONS.DELIVERY,
    icon: '📅',
  },
  {
    name: 'deliveryTime',
    type: 'time',
    label: 'Preferred Time',
    section: FORM_SECTIONS.DELIVERY,
    icon: '⏰',
  },
  {
    name: 'orderDateTime',
    type: 'datetime-local',
    label: 'Exact Order Date & Time',
    section: FORM_SECTIONS.DELIVERY,
    icon: '📅',
  },
  {
    name: 'address',
    type: 'textarea',
    label: 'Delivery Address',
    placeholder: 'Enter complete delivery address...',
    validation: { maxLength: 300 },
    section: FORM_SECTIONS.DELIVERY,
    icon: '🏠',
  },

  // Notes
  {
    name: 'comments',
    type: 'textarea',
    label: 'Special Instructions or Comments',
    placeholder: 'Any special requests, cooking preferences, or delivery instructions...',
    validation: { maxLength: 500 },
    section: FORM_SECTIONS.NOTES,
    icon: '💬',
  },

  // Feedback
  {
    name: 'rating',
    type: 'range',
    label: 'Rate Our Service',
    validation: { min: 1, max: 5 },
    section: FORM_SECTIONS.FEEDBACK,
    icon: '⭐',
  },

  // Terms
  {
    name: 'acceptTerms',
    type: 'checkbox',
    label:
      'I accept the terms and conditions and confirm that all information provided is accurate',
    required: true,
    section: FORM_SECTIONS.TERMS,
  },
  {
    name: 'newsletter',
    type: 'checkbox',
    label: '📧 Subscribe to our newsletter for special offers and updates',
    section: FORM_SECTIONS.TERMS,
  },
];
