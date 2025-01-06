import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T) => {
  const [returnValue, setReturnValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setReturnValue(value);
    }, 1000);

    return () => clearTimeout(timer);
  }, [value]);

  return returnValue;
};
