import React, { useContext } from "react";
import { ChatContext } from "../../../../../../context/ChatContext";
import Avatar from "../../../Avatar";
import { doc, getDocs, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../../../../firebase/config";
import { data } from "autoprefixer";

const User = ({ user }) => {
	const { displayName, photoURL, uid } = user;

	const { data, dispatch } = useContext(ChatContext);

	const handleOnClick = async () => {
		dispatch({ type: "CHANGE_USER", payload: user });

		// Create chat in firestore

		const combinedId =
			currentUser.uid > data.receiver.uid
				? currentUser.uid + data.receiver.uid
				: data.receiver.uid + currentUser.uid;

		try {
			const res = await getDocs(db, "chats", combinedId);

			if (!res.exists()) {
				await setDoc(doc(db, "chats", combinedId), { messages: [] });

				await updateDoc(doc(db, "userChats", currentUser.uid), {
					[combinedId + ".userInfo"]: {
						uid: data.receiver.uid,
						displayName: data.receiver.displayName,
						photoURL: data.receiver.photoURL,
					},
					[combinedId + ".date"]: serverTimestamp(),
				});

				await updateDoc(doc(db, "userChats", data.receiver.uid), {
					[combinedId + ".userInfo"]: {
						uid: currentUser.uid,
						displayName: currentUser.displayName,
						photoURL: currentUser.photoURL,
					},
					[combinedId + ".date"]: serverTimestamp(),
				});
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div
			className='p-4 rounded-md hover:bg-gray-200 mx-auto w-[90%] cursor-pointer'
			onClick={handleOnClick}
		>
			<div className='flex flex-row items-center gap-4'>
				<Avatar url={photoURL} />

				<h3 className='font-medium text-xl'>{displayName}</h3>
			</div>
		</div>
	);
};

export default User;
