import React, { useMemo, useContext } from "react";
import { useQuery } from "react-query";
import User from "./User";
import { AuthContext } from "../../../../../context/AuthContext";
import { filterArray } from "../../../../../utils/search";
import SERVER_URL from "../../../../../config/server";

const UsersList = ({ search }) => {
  const filterName = search || "";

  const { currentUser } = useContext(AuthContext);

  const { data: users, isError } = useQuery("users", async () => {
    const options = {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const URL = `${SERVER_URL}/users`;

    const response = await fetch(URL, options);

    return response.json();
  });

  if (isError)
    return <span className="text-sm text-red-500">Something bad happened</span>;

  const usersList = useMemo(() => {
    if (!users) return;

    return filterArray(users, filterName, currentUser);
  }, [users, filterName]);

  return (
    <div className="mt-[120px] flex flex-col divide-y divide-solid">
      {usersList?.map((user) => {
        return <User key={user.document} user={user} />;
      })}
    </div>
  );
};

export default UsersList;
