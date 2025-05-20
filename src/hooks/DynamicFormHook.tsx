import { useState, useCallback } from 'react';
import type { FormState, ErrorState, HelperTextState } from '../types/globalTypes';

export const useDynamicFormState = (initialFields: string[] = []) => {
  const [formValues, setFormValues] = useState<FormState>(() =>
    initialFields.reduce((acc, field) => ({ ...acc, [field]: '' }), {})
  );
  
  const [formErrors, setFormErrors] = useState<ErrorState>(() =>
    initialFields.reduce((acc, field) => ({ ...acc, [field]: false }), {})
  );
  
  const [formHelperText, setFormHelperText] = useState<HelperTextState>(() =>
    initialFields.reduce((acc, field) => ({ ...acc, [field]: '' }), {})
  );

  const handleChange = useCallback((field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: false }));
    setFormHelperText((prev) => ({ ...prev, [field]: '' }));
  }, []);

  const setError = useCallback((field: string, error: boolean, helperText: string = '') => {
    setFormErrors((prev) => ({ ...prev, [field]: error }));
    setFormHelperText((prev) => ({ ...prev, [field]: helperText }));
  }, []);

  return {
    formValues,
    formErrors,
    formHelperText,
    handleChange,
    setError,
  };
};
