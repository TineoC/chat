import React, { createContext, useState } from "react";

export const AddContactsContext = createContext();

export const AddContactsProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <AddContactsContext.Provider value={{ showModal, setShowModal }}>
      {children}
    </AddContactsContext.Provider>
  );
};
