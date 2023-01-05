import React, { useContext } from "react";
import { ChatContext } from "../../../context/ChatContext";

const Message = ({ message }) => {
  const { content } = message;
  const { data } = useContext(ChatContext);

  const { receiver } = data;

  const sentByFriend = message.to === receiver.socketId;

  if (sentByFriend) return <SelfMessage content={content} />;

  return <ReceivedMessage content={content} />;
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
