import { useState, useEffect } from "react";

const useLocalStorage = <T>(storageKey: string, fallbackState: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    const item = localStorage.getItem(storageKey);

    return item ? JSON.parse(item) : fallbackState;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);

  return [value, setValue];
};

export default useLocalStorage;
