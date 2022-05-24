import React, { createContext, useState } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState();

  const value = { loggedIn, setLoggedIn };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
