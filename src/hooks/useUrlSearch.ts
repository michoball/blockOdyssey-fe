import { useCallback } from "react";

const { location, history } = window;
const url = new URL(location.href);

interface SearchParams {
  [key: string]: string;
}

const useUrlSearch = () => {
  const setSearchParams = useCallback((setParams: SearchParams) => {
    Object.keys(setParams).forEach((key) => {
      url.searchParams.set(key, setParams[key]);
    });
    history.replaceState(null, "", url);
  }, []);

  const getSearchParams = useCallback((searchParam: string) => {
    return url.searchParams.get(searchParam);
  }, []);

  return { setSearchParams, getSearchParams };
};

export default useUrlSearch;
