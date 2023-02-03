import moment from "moment";

import React, { useContext } from "react";

import { ChatContext } from "../../../../context/ChatContext";
import useFetchChats from "../../../../hooks/useFetchChats";
import Chat from "../../Chat";
import Avatar from "../../components/Avatar";

const Chats = () => {
  const { data, dispatch } = useContext(ChatContext);

  const chats = useFetchChats();

  if (typeof chats === "undefined")
    return (
      <span className="flex flex-row text-sm text-slate-400">
        Add some contacts so you can chat with people...
      </span>
    );

  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };

  return (
    <div className="mt-[10rem] w-full mx-auto">
      {Object.values(chats).map(({ userInfo, lastMessage }) => {
        function formatLastMessageTime(lastMessageDate) {
          // last message was today
          // format hh:mm

          const isToday = moment(lastMessageDate).isSame(new Date(), "day");

          if (isToday) {
            //	return time
            return moment(lastMessageDate).format("hh:mm A");
          }

          // last message was this year
          // format dd/mm

          const isThisYear = moment(lastMessageDate).isSame(new Date(), "year");
          if (isThisYear) {
            return moment(lastMessageDate).format("DD/MM");
          }

          // last message was not this year
          // format dd/mm/yyyy
          return lastMessageDate.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
        }

        return (
          <div
            key={userInfo.uid}
            className="py-2 rounded-md hover:bg-gray-100 cursor-pointer overflow-auto"
            onClick={() => {
              handleSelect(userInfo);
            }}
          >
            <div className="flex flex-row gap-4 w-[90%] mx-auto">
              <Avatar url={userInfo.photoURL} />

              <div className="flex flex-col w-3/4">
                <div className="flex flex-row items-center justify-between">
                  <h3 className="text-xl">{userInfo.displayName}</h3>
                  <span className="font-medium text-sm text-slate-400">
                    {lastMessage.date &&
                      formatLastMessageTime(lastMessage.date.toDate())}
                  </span>
                </div>
                <span className="font-normal text-md text-slate-500 truncate">
                  {lastMessage?.message}
                </span>
              </div>
            </div>
          </div>
        );
      })}

      {!(Object.keys(data.user).length === 0) && <Chat />}
    </div>
  );
};

export default Chats;
