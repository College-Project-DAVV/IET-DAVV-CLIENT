import { createContext, useContext, useState } from "react";

const TokenContext = createContext();

export const useTokenContext= () => {
  return useContext(TokenContext);
};

export const TokenProvider = ({ children }) => {
  const [authorize, setAuth] = useState(true);

  const updateAuth = (newToken) => {
    setAuth(newToken);
  };
  return (
    <TokenContext.Provider value={{ authorize, updateAuth }}>
      {children}
    </TokenContext.Provider>
  );
};
