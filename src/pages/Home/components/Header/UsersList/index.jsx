import React from "react";

import useFetchUsers from "../../../../../hooks/useFetchUsers";
import User from "./User";

const UsersList = () => {
  const users = useFetchUsers();

  if (users?.length === 0)
    return (
      <div className="mt-[120px] flex flex-col divide-y divide-solid mx-6">
        <span className="text-md text-gray-400">
          There's no users to chat with till... :(
        </span>
      </div>
    );

  return (
    <div className="mt-[120px] flex flex-col divide-y divide-solid">
      {users?.map((user) => {
        return <User key={user.email} user={user} />;
      })}
    </div>
  );
};

export default UsersList;
