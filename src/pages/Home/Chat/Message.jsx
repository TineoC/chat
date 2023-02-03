import React, { useContext } from "react";

import { AuthContext } from "../../../context/AuthContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);

  const sentByFriend = message.senderId === currentUser.uid;

  if (sentByFriend) return <SelfMessage message={message} />;

  return <ReceivedMessage message={message} />;
};

const commonStyles =
  "w-max max-w-[70%] min-w-[40%] text-white text-sm rounded-md px-4 py-1 break-words";

const SelfMessage = ({ message }) => {
  return (
    <div className={`${commonStyles} bg-green-500 self-end flex flex-col`}>
      {message.message}

      <Time seconds={message.date.seconds} />
    </div>
  );
};

const ReceivedMessage = ({ message }) => {
  return (
    <div className={`${commonStyles} bg-blue-500 self-start flex flex-col`}>
      {message.message}

      <Time seconds={message.date.seconds} />
    </div>
  );
};

const Time = ({ seconds }) => {
  const date = new Date(seconds * 1000);

  const time = date.toLocaleTimeString() || "";
  return <small className="text-right text-xs">{time}</small>;
};

export default Message;
