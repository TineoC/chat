import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";

import React, { useContext, useState } from "react";
import { TbPlus, TbSend } from "react-icons/tb";

import { AuthContext } from "../../../context/AuthContext";
import { ChatContext } from "../../../context/ChatContext";
import { db } from "../../../firebase/config";

const InputBox = () => {
  const [message, setMessage] = useState("");

  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        message,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        message,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        message,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
  };

  return (
    <div className="bg-gray-100 absolute bottom-0 w-screen py-2">
      <div className="w-[90%] mx-auto">
        <form
          className="w-full flex flex-row justify-between"
          onSubmit={handleSubmit}
        >
          <button
            type="submit"
            className="text-xl p-2 hover:bg-gray-200 rounded-full"
          >
            <TbPlus className=" text-blue-500 hover:text-blue-400" />
          </button>

          <input
            type="text"
            className=" bg-white rounded-full w-[70%] text-sm py-1 px-4"
            placeholder="Write some message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />

          <button
            type="submit"
            className="text-xl text-blue-500 hover:text-blue-400 p-2 hover:bg-gray-200 rounded-full"
          >
            <TbSend />
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputBox;
