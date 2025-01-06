import { useSearchParams } from "react-router-dom";

export const useQueryParams = <
  T extends Record<string, string | number | undefined>
>(
  defaultParams: T
) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params: T = Object.keys(defaultParams).reduce((acc, key) => {
    const value = searchParams.get(key);
    acc[key as keyof T] =
      value !== null ? (value as T[keyof T]) : defaultParams[key as keyof T];
    return acc;
  }, {} as T);

  const updateParams = (newParams: Partial<T>) => {
    setSearchParams((prevParams) => {
      const updated = new URLSearchParams(prevParams);

      Object.entries(newParams).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") {
          updated.delete(key);
        } else {
          updated.set(key, String(value));
        }
      });

      return updated;
    });
  };

  return { params, updateParams };
};
