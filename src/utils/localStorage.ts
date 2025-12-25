/** Save a value to localStorage (objects will be stringified) */
export function setItem<T>(key: string, value: T): void {
  try {
    const isObject = typeof value === 'object';
    const data = isObject ? JSON.stringify(value) : (value as string);
    localStorage.setItem(key, data);
  } catch (err) {
    console.error(`setItem error [${key}]:`, err);
  }
}

/** Get a value from localStorage (tries to parse JSON, falls back to string) */
export function getItem<T = unknown>(key: string): T | string | undefined {
  try {
    const data = localStorage.getItem(key);
    if (data === null) return undefined;

    try {
      return JSON.parse(data) as T;
    } catch {
      return data; // Not JSON, return raw string
    }
  } catch (err) {
    console.error(`getItem error [${key}]:`, err);
    return undefined;
  }
}

/** Remove an item from localStorage */
export function removeItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error(`removeItem error [${key}]:`, err);
  }
}
