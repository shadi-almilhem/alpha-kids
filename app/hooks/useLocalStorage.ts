import { useState, useEffect } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [isClient, setIsClient] = useState(false);
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    // Only run on client
    setIsClient(true);

    // Retrieve from localStorage
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const parsed = JSON.parse(item);
        // If initialValue is a Set, convert back to Set
        const value = initialValue instanceof Set ? new Set(parsed) : parsed;
        setStoredValue(value);
      }
    } catch (error) {
      console.log(error);
    }
  }, [key]);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Compute the new value
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      // Update local state
      setStoredValue(valueToStore);

      // Only save to localStorage on client
      if (typeof window !== "undefined") {
        // If it's a Set, convert to array for storage
        const storageValue =
          valueToStore instanceof Set ? Array.from(valueToStore) : valueToStore;

        window.localStorage.setItem(key, JSON.stringify(storageValue));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // If we're on the server or before first client-side render, return initial value
  return [isClient ? storedValue : initialValue, setValue];
}
