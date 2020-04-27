import { useState } from 'react';

/**
 * The Input custom's hook. 
 */
export const useInput = (initialValue = '', type = 'text') => {
  const [value, setValue] = useState(initialValue);
  const handler = event => {
    if (type === 'currency' && event.target.value !== '' && !/^[0-9]+$/.test(event.target.value)) {
      return;
    }

    setValue(event.target.value);
  }; 

  return { handler, type, value, set: setValue };
};

/**
 * The Textarea custom's hook. 
 */
export const useTextarea = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);
  const handler = event => setValue(event.target.value); 

  return { handler, value, set: setValue };
};

/**
 * The Select custom's hook.
 */
export const useSelect = (initialValue = {}, callback = () => undefined) => {
  const [value, setValue] = useState(initialValue);
  const handler = option => {
    setValue(option);
    callback(option);
  };

  return { handler, value, set: setValue };
};

/**
 * The Autocomplete custom's hook.
 */
export const useAutocomplete = (initialValue = {}, callback = () => undefined) => {
  const [value, setValue] = useState(initialValue);
  const handler = option => {
    setValue(option);
    callback(option);
  };

  return { handler, value, set: setValue };
};