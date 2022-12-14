import React, { useState } from 'react'
import Chats from './components/Chats'
import Header from './components/Header'
import { AddContactsProvider } from '../../context/AddContactsContext'

import { ChatProvider } from '../../context/ChatContext'
import { FriendsProvider } from '../../context/FriendsContext'
import { MessagesProvider } from '../../context/MessagesContext'

const Home = () => {
    const [searchFriend, setSearchFriend] = useState('')

    return (
        <main className="my-4 w-[90%] mx-auto flex flex-col gap-y-4">
            <AddContactsProvider>
                <FriendsProvider>
                    <ChatProvider>
                        <MessagesProvider>
                            <Header />
                            <h1 className="text-2xl font-bold">Chats</h1>
                            <input
                                className="bg-gray-100 p-2 rounded-md"
                                onChange={(e) =>
                                    setSearchFriend(e.target.value)
                                }
                                value={searchFriend}
                                type="text"
                                placeholder="Search your chats..."
                            />
                            <Chats search={searchFriend} />
                        </MessagesProvider>
                    </ChatProvider>
                </FriendsProvider>
            </AddContactsProvider>
        </main>
    )
}

export default Home
