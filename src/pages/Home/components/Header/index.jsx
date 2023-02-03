import React, { useContext } from "react";
import { FaUserPlus } from "react-icons/fa";
import { HiLogout } from "react-icons/hi";

import { AuthContext } from "../../../../context/AuthContext";
import Avatar from "../Avatar";

const Header = () => {
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

  return (
    <div className="fixed w-[90%] my-2 mx-auto left-0 right-0 z-1 bg-white">
      <div className="flex flex-row w-full items-center justify-between">
        <div className="flex flex-row items-center gap-4">
          <Avatar url={photoURL} />

          <span className="text-xl font-medium">{displayName}</span>
        </div>

        <div className="flex flex-row items-center gap-x-2 text-2xl">
          <button className="p-2 hover:bg-gray-100 rounded-full text-blue-800 hover:text-blue-600">
            <FaUserPlus />
          </button>

          <button
            className="p-2 hover:bg-gray-100 rounded-full text-red-600 hover:text-red-500"
            onClick={handleLogout}
          >
            <HiLogout />
          </button>
        </div>
      </div>

      <h1 className="text-2xl my-2 font-bold">Chats</h1>

      <input
        type="text"
        placeholder="Search your chats..."
        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

export default Header;
