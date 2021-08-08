import { useEffect, useState } from 'react';

export const useLocalStorageValue = (key: string, defaultValue = 'null') => {
  const [storedValue, setValue] = useState<string>(defaultValue);

  const setLocalItem = () => {
    /** local storage update is not that fast */
    /** it makes sure that we are getting the new value  */
    setTimeout(() => {
      const value = localStorage.getItem(key);
      if (value && value !== 'undefined') {
        setValue(value);
      }
    }, 50);
  };

  const setStoredValue = (value) => {
    console.info('useLocalStorageValue setItem', key, value);
    localStorage.setItem(key, value);
  };

  useEffect(() => {
    const storageItem = localStorage.getItem(key);
    console.info(
      'useLocalStorageValue getItem',
      key,
      storageItem,
      defaultValue
    );
    if (
      storageItem === null ||
      storageItem === 'null' ||
      storageItem === undefined ||
      storageItem === 'undefined'
    ) {
      setValue(defaultValue);
    } else {
      setValue(storageItem);
    }

    // overrite document event
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function () {
      const event = new Event('storageChange');
      document.dispatchEvent(event);
      // eslint-disable-next-line prefer-rest-params
      originalSetItem.apply(this, arguments);
    };
    const originalRemoveItem = localStorage.removeItem;
    localStorage.removeItem = function () {
      const event = new Event('storageChange');
      document.dispatchEvent(event);
      // eslint-disable-next-line prefer-rest-params
      originalRemoveItem.apply(this, arguments);
    };

    document.addEventListener('storageChange', setLocalItem, false);

    return () => document.removeEventListener('storageChange', setLocalItem);
  }, []);

  return [storedValue, setStoredValue];
};

export default useLocalStorageValue;
