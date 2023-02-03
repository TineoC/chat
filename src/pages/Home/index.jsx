import React from "react";

import { ChatProvider } from "../../context/ChatContext";
import { MessagesProvider } from "../../context/MessagesContext";
import Chats from "./components/Chats";
import Header from "./components/Header";

const Home = () => {
  return (
    <main className="my-4 w-full mx-auto flex flex-col">
      <ChatProvider>
        <MessagesProvider>
          <Header />

          <Chats />
        </MessagesProvider>
      </ChatProvider>
    </main>
  );
};

export default Home;
