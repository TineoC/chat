import { doc } from "firebase/firestore";

import React from "react";
import { useContext } from "react";
import { useDocument } from "react-firebase-hooks/firestore";

import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase/config";

const useFetchChats = () => {
  const { currentUser } = useContext(AuthContext);

  const [value, loading, error, snapshot] = useDocument(
    doc(db, "userChats", currentUser.uid),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const result = value?.data() || {};

  const chats = Object.entries(result).sort((a, b) => {
    b[1].date - a[1].date;
  });

  return chats;
};

export default useFetchChats;
