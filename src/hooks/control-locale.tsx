import { useMemo,useState } from "react";

interface IControlLocale {
    name:string,
    savedData:string
}
export function useControlLocale({name='localeData',savedData=''}: IControlLocale) {
  const [data,setData] = useState<string>(savedData);
  function saveLocale() {
    localStorage.setItem(name,savedData);
    setData(savedData);
  }

  const getLocale = useMemo(() => {
    return localStorage.getItem(name);
  }, [data]);

  function removeLocale() {
    localStorage.removeItem(name);
  }

  return {
    data,
    saveLocale,
    removeLocale,
    getLocale   
  }
}