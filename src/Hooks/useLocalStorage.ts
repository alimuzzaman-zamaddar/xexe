import { useState } from "react";
import { getItem, removeItem, setItem } from "../utils/localStorage";

// T = type of the value you're storing (string, object, number, etc.)
export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const [value, setValue] = useState<T>(() => {
    const stored = getItem(key);
    return stored !== undefined ? (stored as T) : initialValue;
  });

  const handleDispatch = (action: T | ((prev: T) => T)) => {
    if (typeof action === "function") {
      setValue((prev: T) => {
        const newValue = (action as (prev: T) => T)(prev);
        setItem(key, newValue);
        return newValue;
      });
    } else {
      setValue(action);
      setItem(key, action);
    }
  };

  const clearState = () => {
    setValue(initialValue); // You can choose `null` if preferred
    removeItem(key);
  };

  return [value, handleDispatch, clearState];
}
