import { doc } from "firebase/firestore";

import React from "react";
import { useContext } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";

import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase/config";

const useFetchChats = () => {
  const { currentUser } = useContext(AuthContext);

  const [value, loading, error, snapshot] = useDocumentData(
    doc(db, "userChats", currentUser.uid),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  if (loading) return undefined;

  const chats = Object.values(value);

  const sortedByDate = chats.sort((a, b) => {
    return b.date?.toDate() - a.date?.toDate();
  });

  return sortedByDate;
};

export default useFetchChats;
