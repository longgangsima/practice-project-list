import { useCallback, useState } from 'react';

export interface UseFormProps {
  initialValues: Record<string, any>;
  validationRules?: Record<string, (value: any) => string | null>;
  onSubmit?: (data: Record<string, any>) => void;
}

export interface FormState {
  values: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
}

export const useForm = ({ initialValues, validationRules = {}, onSubmit }: UseFormProps) => {
  const [formState, setFormState] = useState<FormState>({
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
  });

  // Universal change handler that determines the correct behavior based on input type
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, type, value } = e.target;
      const target = e.target as HTMLInputElement;

      let newValue: any;

      // Determine value based on input type
      switch (type) {
        case 'checkbox':
          if (Array.isArray(formState.values[name])) {
            // Multi-checkbox (array)
            const currentArray = [...formState.values[name]];
            if (target.checked) {
              if (!currentArray.includes(value)) {
                currentArray.push(value);
              }
            } else {
              const index = currentArray.indexOf(value);
              if (index > -1) {
                currentArray.splice(index, 1);
              }
            }
            newValue = currentArray;
          } else {
            // Single checkbox (boolean)
            newValue = target.checked;
          }
          break;

        case 'number':
        case 'range':
          newValue = parseFloat(value) || 0;
          break;

        case 'file':
          newValue = target.files?.[0] || null;
          break;

        default:
          newValue = value;
      }

      setFormState(prev => ({
        ...prev,
        values: { ...prev.values, [name]: newValue },
        touched: { ...prev.touched, [name]: true },
        errors: {
          ...prev.errors,
          [name]: validationRules[name] ? validationRules[name](newValue) || '' : '',
        },
      }));
    },
    [formState.values, validationRules]
  );

  // Reset form
  const reset = useCallback(() => {
    setFormState({
      values: initialValues,
      errors: {},
      touched: {},
      isSubmitting: false,
    });
  }, [initialValues]);

  // Submit handler
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      setFormState(prev => ({ ...prev, isSubmitting: true }));

      // Validate all fields
      const errors: Record<string, string> = {};
      Object.keys(validationRules).forEach(fieldName => {
        const error = validationRules[fieldName](formState.values[fieldName]);
        if (error) {
          errors[fieldName] = error;
        }
      });

      if (Object.keys(errors).length > 0) {
        setFormState(prev => ({
          ...prev,
          errors,
          isSubmitting: false,
        }));
        return;
      }

      try {
        await onSubmit?.(formState.values);
        reset();
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setFormState(prev => ({ ...prev, isSubmitting: false }));
      }
    },
    [formState.values, validationRules, onSubmit, reset]
  );

  // Get field props for easy binding
  const getFieldProps = useCallback(
    (fieldName: string, fieldType: string = 'text') => {
      const baseProps = {
        name: fieldName,
        onChange: handleChange,
      };

      // Add type-specific props
      switch (fieldType) {
        case 'checkbox':
          return {
            ...baseProps,
            checked: Array.isArray(formState.values[fieldName])
              ? formState.values[fieldName].length > 0
              : Boolean(formState.values[fieldName]),
          };
        case 'file':
          return baseProps; // Files don't have value prop
        default:
          return {
            ...baseProps,
            value: formState.values[fieldName] || '',
          };
      }
    },
    [formState.values, handleChange]
  );

  return {
    values: formState.values,
    errors: formState.errors,
    touched: formState.touched,
    isSubmitting: formState.isSubmitting,
    handleChange,
    handleSubmit,
    reset,
    getFieldProps,
  };
};
