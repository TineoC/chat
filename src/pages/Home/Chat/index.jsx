import React, { useContext } from "react";
import { ChatContext } from "../../../context/ChatContext";

import { MdOutlineArrowBackIosNew } from "react-icons/md";
import InputBox from "./InputBox";
import Messages from "./Messages";

const Chat = ({ typing, setTyping }) => {
  const { data, dispatch } = useContext(ChatContext);

  if (!data.receiver) return;

  const { names, surnames, connected } = data.receiver;

  const handleCloseChat = () => {
    dispatch({ type: "RESET_USER" });
  };

  return (
    <div className="z-10 h-screen max-h-screen absolute top-0 left-0 w-screen bg-gray-50">
      <div className="flex flex-col py-5 w-[90%] mx-auto h-full">
        <header className="mb-2">
          <span className="flex flex-row items-center">
            <button
              className="flex align-center hover:bg-slate-100 rounded-full p-2 mr-4"
              onClick={handleCloseChat}
            >
              <MdOutlineArrowBackIosNew className="text-blue-600" />
            </button>

            <h2 className="font-medium text-xl">{`${names} ${surnames}`}</h2>
          </span>

          <div className="flex flex-col text-xs">
            {typing ? (
              <span className="text-blue-500">Typing...</span>
            ) : connected ? (
              <span className="text-green-600">Online</span>
            ) : (
              <span className="text-red-500">Offline</span>
            )}
          </div>
        </header>

        <Messages />
      </div>

      <InputBox setTyping={setTyping} />
    </div>
  );
};

export default Chat;
