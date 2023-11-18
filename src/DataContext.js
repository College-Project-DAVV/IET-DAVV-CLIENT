// DataContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { fetchDataFromAPI } from "./FetchAllData";
const DataContext = createContext();
export const useAllUsers = () => {
  return useContext(DataContext);
};
export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const token = localStorage.getItem("FetchUserToken");
  useEffect(() => {
    if (token) {
      fetchDataFromAPI().then((fetchedData) => {
        setData(fetchedData);
      });
    }
  }, [token]);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};
