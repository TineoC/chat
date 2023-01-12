import React from "react";
import { useContext } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { ChatContext } from "../context/ChatContext";
import { doc } from "firebase/firestore";
import { db } from "../firebase/config";

const useFetchMessages = () => {
	const { data } = useContext(ChatContext);

	const [value, loading, error, snapshot] = useDocument(
		doc(db, "chats", data.chatId),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);

	const result = value?.data().messages || [];

	return result;
};

export default useFetchMessages;
