import {
  GoogleAuthProvider,
  signOut as logOut,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import {
  onDisconnect,
  onValue,
  ref,
  serverTimestamp,
  set,
} from "firebase/database";
import { doc, getDoc, setDoc } from "firebase/firestore";

import React, { createContext, useEffect, useState } from "react";

import { auth, db, realtimeDB } from "../firebase/config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);

      if (user === undefined) return;

      OnlineStatus(user);
    });

    return () => {
      unsub();
    };
  }, []);

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    await saveUserInFirestore(user);

    OnlineStatus(user);
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

  async function signOut() {
    const { uid } = currentUser;
    const userStatusDatabaseRef = ref(realtimeDB, "/status/" + uid);

    await set(userStatusDatabaseRef, {
      state: "offline",
      last_changed: serverTimestamp(),
    });

    return logOut(auth);
  }

  function OnlineStatus(user) {
    if (!user) return;

    const isOfflineForDatabase = {
      state: "offline",
      last_changed: serverTimestamp(),
    };

    const isOnlineForDatabase = {
      state: "online",
      last_changed: serverTimestamp(),
    };

    const userStatusDatabaseRef = ref(realtimeDB, "/status/" + user.uid);
    const connectedRef = ref(realtimeDB, ".info/connected");

    onValue(connectedRef, (snap) => {
      if (snap.val() === true) {
        set(userStatusDatabaseRef, isOnlineForDatabase);
      }
    });

    onDisconnect(userStatusDatabaseRef).set(isOfflineForDatabase);
  }

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
