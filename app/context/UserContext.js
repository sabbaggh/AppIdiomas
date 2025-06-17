import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDataa, setUserDataa] = useState(null);

  return (
    <UserContext.Provider value={{ userDataa, setUserDataa }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
