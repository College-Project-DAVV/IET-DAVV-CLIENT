// DataContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { fetchGroupWiseDataFromAPI } from "./fetchGroupwiseData";
const DataContext = createContext();
export const useGroups = () => {
  return useContext(DataContext);
};
export const GroupDataProvider = ({ children }) => {
  const [groupdata, setData] = useState(null);
  const token = localStorage.getItem("FetchUserToken");
  useEffect(() => {
    if (token) {
      fetchGroupWiseDataFromAPI().then((groupedData)=>{
        setData(groupedData);
      })
    }
  }, [token]);

  return <DataContext.Provider value={groupdata}>{children}</DataContext.Provider>;
};
