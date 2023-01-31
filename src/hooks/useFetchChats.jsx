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

  if (!value) return undefined;

  const chatSortedByDate = [];

  Object.keys(value)
    .sort((a, b) => {
      return value[b].date.seconds - value[a].date.seconds;
    })
    .forEach((key) => (chatSortedByDate[key] = value[key]));

  return chatSortedByDate;
};

export default useFetchChats;
