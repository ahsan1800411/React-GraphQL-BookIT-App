import { useState, useEffect, useCallback } from "react";
import { server } from "./server";

interface State<TData> {
  data: TData | null;
  loading: boolean;
  error: boolean;
}

export const useQuery = <TData = any>(query: string) => {
  const [state, setState] = useState<State<TData>>({
    data: null,
    loading: false,
    error: false,
  });

  const fetch = useCallback(() => {
    const fetchApi = async () => {
      try {
        setState({ loading: true, data: null, error: false });
        const { data, errors } = await server.fetch<TData>({ query });
        if (errors && errors.length) {
          throw new Error(errors[0].message);
        }
        setState({ data, loading: false, error: false });
      } catch (error) {
        setState({ error: true, loading: false, data: null });
        throw console.error(error);
      }
    };
    fetchApi();
  }, [query]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { ...state, refetch: fetch };
};
