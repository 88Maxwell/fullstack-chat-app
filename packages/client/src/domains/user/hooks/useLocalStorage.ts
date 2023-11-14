// Grab from
// https://gist.github.com/Mon4ik/2636100f5b74ee14e35cf283700616fe
import { useEffect, useState } from "react";

export default function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T) => void] {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const item = localStorage.getItem(key);

    if (!item) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
    }

    setValue(item ? JSON.parse(item) : defaultValue);

    function handler(e: StorageEvent) {
      if (e.key !== key) return;

      const lsi = localStorage.getItem(key);
      setValue(JSON.parse(lsi ?? ""));
    }

    window.addEventListener("storage", handler);

    return () => {
      window.removeEventListener("storage", handler);
    };
  }, []);

  const setValueWrap = (v: T) => {
    try {
      setValue(v);

      localStorage.setItem(key, JSON.stringify(v));
      if (typeof window !== "undefined") {
        window.dispatchEvent(new StorageEvent("storage", { key }));
      }
    // eslint-disable-next-line no-console
    } catch (e) { console.error(e); }
  };

  return [value, setValueWrap];
}
