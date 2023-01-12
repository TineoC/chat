import React, { useContext } from "react";

import { AuthContext } from "../../../context/AuthContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);

  const sentByFriend = message.senderId === currentUser.uid;

  if (sentByFriend) return <SelfMessage content={message.message} />;

  return <ReceivedMessage content={message.message} />;
};

const commonStyles =
  "w-max max-w-[60%] text-white text-xs rounded-md px-4 py-1 break-words";

const SelfMessage = ({ content }) => {
  return (
    <div className={`${commonStyles} bg-green-500  self-end`}>{content}</div>
  );
};

const ReceivedMessage = ({ content }) => {
  return (
    <div className={`${commonStyles} bg-blue-500  self-start`}>{content}</div>
  );
};

export default Message;
