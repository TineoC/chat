import React, { useState } from "react";

import { AddContactsProvider } from "../../context/AddContactsContext";
import { ChatProvider } from "../../context/ChatContext";
import { FriendsProvider } from "../../context/FriendsContext";
import { MessagesProvider } from "../../context/MessagesContext";
import Chats from "./components/Chats";
import Header from "./components/Header";

const Home = () => {
  return (
    <main className="my-6 w-[90%] mx-auto flex flex-col">
      <AddContactsProvider>
        <FriendsProvider>
          <ChatProvider>
            <MessagesProvider>
              <div className="fixed w-[90%] top-0 z-1 pt-4 bg-white">
                <Header />

                <h1 className="text-2xl my-2 font-bold">Chats</h1>
                <input
                  className="bg-gray-100 w-full my-2 p-2 rounded-md"
                  type="text"
                  placeholder="Search your chats..."
                />
              </div>

              <Chats />
            </MessagesProvider>
          </ChatProvider>
        </FriendsProvider>
      </AddContactsProvider>
    </main>
  );
};

export default Home;
