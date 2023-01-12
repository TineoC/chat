import { collection } from "firebase/firestore";

import { useContext } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase/config";

const useFetchUsers = () => {
  const { currentUser } = useContext(AuthContext);

  const { email } = currentUser;

  const users = [];

  const [value, loading, error, snapshot] = useCollection(
    collection(db, "users"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  value?.docs.map((doc) => {
    users.push({
      uid: doc.id,
      ...doc.data(),
    });
  });

  // Remove self
  const usersWithoutSelf = users?.filter((user) => {
    return user.email !== email;
  });

  return usersWithoutSelf;
};

export default useFetchUsers;
