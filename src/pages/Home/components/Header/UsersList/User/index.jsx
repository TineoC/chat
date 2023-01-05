import React, { useContext } from "react";
import { ChatContext } from "../../../../../../context/ChatContext";
import { AddContactsContext } from "../../../../../../context/AddContactsContext";
import UsersSocket from "../../../../../../socket/users";
import { useState } from "react";
import Error from "../../../../../components/Error";

import { FriendsContext } from "../../../../../../context/FriendsContext";

const User = ({ user }) => {
  const { document, names, surnames } = user;

  const { dispatch } = useContext(ChatContext);

  const { setShowModal } = useContext(AddContactsContext);

  const [error, setError] = useState("");

  const { setFriends } = useContext(FriendsContext);

  const handleOnClick = () => {
    UsersSocket.emit("add_friend", document, ({ errorMsg, done }) => {
      if (!done) {
        console.error(errorMsg);
        return setError(errorMsg);
      }

      setFriends((currentFriends) => [...currentFriends, user]);

      setError("");
      setShowModal(false);
    });

    dispatch({ type: "CHANGE_USER", payload: user });
  };

  return (
    <div
      key={user.document}
      className="p-4 rounded-md hover:bg-gray-200 mx-auto w-[90%] cursor-pointer"
      onClick={handleOnClick}
    >
      <div className="flex flex-col">
        <h3 className="font-medium">
          {names} {surnames}
        </h3>
        <h6 className="font-light text-sm">{document}</h6>

        {error && <Error text={error} />}
      </div>
    </div>
  );
};

export default User;
