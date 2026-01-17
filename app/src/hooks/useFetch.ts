import { useState, useEffect, useCallback } from 'react';

interface FetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

export function useFetch<T>(url: string, options?: RequestInit) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    isLoading: true,
    error: null,
  });

  // Usamos useCallback para poder re-ejecutar la petición si es necesario
  const fetchData = useCallback(async (abortController: AbortController) => {
    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      const response = await fetch(url, {
        ...options,
        signal: abortController.signal,
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      
      setState({ data: result, isLoading: false, error: null });
      
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setState({ data: null, isLoading: false, error: err });
      }
    }
  }, [url, options]);

  useEffect(() => {
    const abortController = new AbortController();
    fetchData(abortController);
    // Cleanup para evitar fugas de memoria si el componente se desmonta
    return () => abortController.abort();
  }, [fetchData]);

  return { ...state, refetch: () => fetchData(new AbortController()) };
}