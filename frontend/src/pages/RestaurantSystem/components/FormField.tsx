import React from 'react';
import type { FormFieldConfig } from './FormFieldConfig';

interface FormFieldProps {
  config: FormFieldConfig;
  value: any;
  error?: string;
  touched?: boolean;
  onChange: (e: React.ChangeEvent<any>) => void;
  options?: Array<{ value: string; label: string }>;
}

export const FormField: React.FC<FormFieldProps> = ({
  config,
  value,
  error,
  touched,
  onChange,
  options = [],
}) => {
  const { name, type, label, placeholder, required, validation, icon } = config;

  const renderInput = () => {
    const baseProps = {
      name,
      onChange,
      className: `form-input ${error && touched ? 'error' : ''}`,
      required,
      ...(validation && {
        min: validation.min,
        max: validation.max,
        minLength: validation.minLength,
        maxLength: validation.maxLength,
        pattern: validation.pattern,
      }),
    };

    switch (type) {
      case 'select':
        return (
          <select {...baseProps} value={value || ''}>
            <option value="">Select an option</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'textarea':
        return (
          <textarea
            {...baseProps}
            value={value || ''}
            placeholder={placeholder}
            rows={type === 'textarea' ? 4 : undefined}
          />
        );

      case 'checkbox':
        return (
          <label className="checkbox-wrapper">
            <input
              {...baseProps}
              type="checkbox"
              checked={Array.isArray(value) ? value.length > 0 : Boolean(value)}
            />
            <span className="checkbox-label">{label}</span>
          </label>
        );

      case 'radio':
        return (
          <div className="radio-group">
            {options.map(option => (
              <label key={option.value} className="radio-wrapper">
                <input
                  {...baseProps}
                  type="radio"
                  value={option.value}
                  checked={value === option.value}
                />
                <span className="radio-label">{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 'range':
        return (
          <div className="range-wrapper">
            <input {...baseProps} type="range" value={value || validation?.min || 0} step={0.5} />
            <output className="range-output">
              {icon} {value || validation?.min || 0}/{validation?.max || 100}
            </output>
          </div>
        );

      case 'file':
        return (
          <input
            {...baseProps}
            type="file"
            accept={name === 'profilePicture' ? 'image/*' : undefined}
          />
        );

      default:
        return (
          <input
            {...baseProps}
            type={type}
            value={type === 'file' ? undefined : value || ''}
            placeholder={placeholder}
          />
        );
    }
  };

  if (type === 'checkbox') {
    return (
      <div className="form-field">
        {renderInput()}
        {error && touched && <span className="error-message">{error}</span>}
      </div>
    );
  }

  return (
    <div className="form-field">
      <label className="form-label">
        {icon && <span className="field-icon">{icon}</span>}
        {label}
        {required && <span className="required">*</span>}
      </label>
      {renderInput()}
      {error && touched && <span className="error-message">{error}</span>}
    </div>
  );
};
