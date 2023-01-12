import React, { createContext, useState, useEffect, useContext } from "react";
import {
	GoogleAuthProvider,
	signInWithPopup,
	onAuthStateChanged,
	signOut as logOut,
} from "firebase/auth";
import { auth, db, realtimeDB } from "../firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
	ref,
	onValue,
	onDisconnect,
	set,
	serverTimestamp,
} from "firebase/database";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState({});
	const [loading, setLoading] = useState(true);

	async function signInWithGoogle() {
		const provider = new GoogleAuthProvider();

		const result = await signInWithPopup(auth, provider);

		const user = result.user;

		await saveUserInFirestore(user);
		OnlineStatus();
	}

	async function saveUserInFirestore(user) {
		const { displayName, photoURL, email, uid } = user;

		const docRef = doc(db, "users", uid);

		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) return;

		await setDoc(doc(db, "users", uid), {
			displayName,
			photoURL,
			email,
		});

		await setDoc(doc(db, "userChats", uid), {});
	}

	function signOut() {
		const { uid } = currentUser;
		const userStatusDatabaseRef = ref(realtimeDB, "/status/" + uid);

		set(userStatusDatabaseRef, {
			state: "offline",
			last_changed: serverTimestamp(),
		});

		return logOut(auth);
	}

	function OnlineStatus() {
		const isOfflineForDatabase = {
			state: "offline",
			last_changed: serverTimestamp(),
		};

		const isOnlineForDatabase = {
			state: "online",
			last_changed: serverTimestamp(),
		};

		const userStatusDatabaseRef = ref(
			realtimeDB,
			"/status/" + currentUser.uid
		);
		const connectedRef = ref(realtimeDB, ".info/connected");

		onValue(connectedRef, (snap) => {
			if (snap.val() === true) {
				set(userStatusDatabaseRef, isOnlineForDatabase);
			}
		});

		onDisconnect(userStatusDatabaseRef).set(isOfflineForDatabase);
	}

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return () => {
			unsub();
		};
	}, []);

	const value = {
		currentUser,
		signInWithGoogle,
		signOut,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};
