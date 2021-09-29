import React, { useState, createContext, useEffect, useMemo } from "react";
import { tablesRequest } from "./tables.service";

export const TablesContext = createContext();

export const TablesContextProvider = ({ children }) => {
  const [tables, setTables] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const retrieveTables = () => {
    setIsLoading(true);
    setTimeout(() => {
      tablesRequest(6)
        .then((data) => {
          setIsLoading(false);
          setTables(data);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err);
        });
    }, 2000);
  };

  useEffect(() => {
    retrieveTables();
  }, []);

  return (
    <TablesContext.Provider
      value={{
        tables,
        isLoading,
        error,
      }}
    >
      {children}
    </TablesContext.Provider>
  );
};
