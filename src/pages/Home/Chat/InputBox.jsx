import React, { useContext, useEffect, useState } from "react";
import { TbPlus, TbSend } from "react-icons/tb";

import { ChatContext } from "../../../context/ChatContext";
import { FriendsContext } from "../../../context/FriendsContext";
import { MessagesContext } from "../../../context/MessagesContext";
import UsersSocket from "../../../socket/users";

const InputBox = ({ setTyping }) => {
  const [message, setMessage] = useState("");
  const { data } = useContext(ChatContext);

  const { setMessages } = useContext(MessagesContext);

  const { setFriends } = useContext(FriendsContext);

  const { socketId } = data.receiver;

  useEffect(() => {
    UsersSocket.on("typing", (status) => {
      setTyping(status);
    });

    return () => {
      UsersSocket.off("typing");
    };
  }, [setTyping]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      UsersSocket.emit("typing", { typing: false, to: socketId });
    }, 5000);

    return () => clearTimeout(timeout);
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      to: socketId,
      from: "",
      content: message,
    };
    UsersSocket.emit("dm", payload);

    setMessages((previousMessages) => [...previousMessages, payload]);

    // Set sent message as friend last message
    setFriends((friendsList) => {
      return [...friendsList].map((friend) => {
        if (friend.socketId === payload.to) {
          friend.lastMessage = message;
        }

        return friend;
      });
    });

    setMessage("");
  };
  const handleChange = (e) => {
    setMessage(e.target.value);

    UsersSocket.emit("typing", { typing: true, to: socketId });
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
            onChange={handleChange}
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
