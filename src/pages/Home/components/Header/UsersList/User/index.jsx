import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import React, { useContext } from "react";

import { AuthContext } from "../../../../../../context/AuthContext";
import { ChatContext } from "../../../../../../context/ChatContext";
import { db } from "../../../../../../firebase/config";
import Avatar from "../../../Avatar";

const User = ({ user }) => {
  const { displayName, photoURL } = user;

  const { dispatch } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  const handleOnClick = async () => {
    dispatch({ type: "CHANGE_USER", payload: user });

    // Create chat in firestore

    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (res.exists()) return;

      await setDoc(doc(db, "chats", combinedId), { messages: [] });

      //create user chats

      // Update current user with receiver data
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [combinedId + ".userInfo"]: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });

      // Update receiver chat with current user data
      await updateDoc(doc(db, "userChats", user.uid), {
        [combinedId + ".userInfo"]: {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="p-4 rounded-md hover:bg-gray-200 mx-auto w-[90%] cursor-pointer"
      onClick={handleOnClick}
    >
      <div className="flex flex-row items-center gap-4">
        <Avatar url={photoURL} />

        <h3 className="font-medium text-xl">{displayName}</h3>
      </div>
    </div>
  );
};

export default User;
