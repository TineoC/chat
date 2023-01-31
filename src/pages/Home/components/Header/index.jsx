import React, { useContext } from "react";
import { FaUserPlus } from "react-icons/fa";
import { HiLogout } from "react-icons/hi";

import { AddContactsContext } from "../../../../context/AddContactsContext";
import { AuthContext } from "../../../../context/AuthContext";
import Avatar from "../Avatar";
import AddContactModal from "./AddContactModal";

const User = () => {
  // Add Contacts Context
  const { setShowModal } = useContext(AddContactsContext);

  // Auth Context
  const { currentUser, signOut } = useContext(AuthContext);

  const { displayName, photoURL } = currentUser;

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddContact = () => {
    setShowModal((state) => !state);
  };

  return (
    <div className="flex flex-row w-full items-center justify-between">
      <div className="flex flex-row items-center gap-4">
        <Avatar url={photoURL} />

        <span className="text-xl font-medium">{displayName}</span>
      </div>

      <div className="flex flex-row items-center gap-x-2 text-2xl">
        <button
          className="p-2 hover:bg-gray-100 rounded-full text-blue-800 hover:text-blue-600"
          onClick={handleAddContact}
        >
          <FaUserPlus />
        </button>

        <button
          className="p-2 hover:bg-gray-100 rounded-full text-red-600 hover:text-red-500"
          onClick={handleLogout}
        >
          <HiLogout />
        </button>
      </div>

      <AddContactModal />
    </div>
  );
};

export default User;
