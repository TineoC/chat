import { ref } from "firebase/database";

import React from "react";
import { useContext } from "react";
import { useListVals } from "react-firebase-hooks/database";

import { ChatContext } from "../context/ChatContext";
import { realtimeDB } from "../firebase/config";

const useOnlineStatus = () => {
  const { data } = useContext(ChatContext);

  const { uid } = data.user;

  const [values, loading, error] = useListVals(
    ref(realtimeDB, "/status/" + uid)
  );

  const [lastTime, status] = values;

  return { lastTime, status };
};

export default useOnlineStatus;
