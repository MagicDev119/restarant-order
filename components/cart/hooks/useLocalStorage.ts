import { useState, useEffect } from "react";

function getStorageValue(key: string, defaultValue: string) {
  // getting stored value
  if (typeof window == 'undefined') {
    return
  }
  const saved = window.localStorage.getItem(key);
  const initial = JSON.parse(saved || "{}");
  return initial || defaultValue;
}

export const useLocalStorage = (key: string, defaultValue: string) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    if (typeof window == 'undefined') {
      return
    }
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};