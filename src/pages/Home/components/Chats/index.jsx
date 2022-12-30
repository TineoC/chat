import React, { useContext, useMemo, useState } from 'react'

import { FriendsContext } from '../../../../context/FriendsContext'
import { ChatContext } from '../../../../context/ChatContext'

import { filterArray } from '../../../../utils/search'

import { BiSad } from 'react-icons/bi'

import Chat from '../../Chat'
import { useEffect } from 'react'

import { MessagesContext } from '../../../../context/MessagesContext'

import UsersSocket from '../../../../socket/users'

const Chats = ({ search }) => {
    const { friends, setFriends } = useContext(FriendsContext)
    const { setMessages } = useContext(MessagesContext)

    const { dispatch } = useContext(ChatContext)

    const [friendIsTyping, setFriendIsTyping] = useState(false)

    const friendsList = useMemo(() => {
        return filterArray(friends, search)
    }, [friends])

    useEffect(() => {
        UsersSocket.connect()

        UsersSocket.on('friends', (friendList) => {
            setFriends(friendList)
        })

        UsersSocket.on('dm', (payload) => {
            setMessages((prevMsgs) => [...prevMsgs, payload])

            // Remove typing on received message
            setFriendIsTyping(false)

            // Set sent message as friend last message
            setFriends((friendsList) => {
                return [...friendsList].map((friend) => {
                    if (friend.socketId === payload.from) {
                        friend.lastMessage = payload.content
                    }

                    return friend
                })
            })
        })

        UsersSocket.on('messages', (messages) => {
            setMessages(messages)

            // Add last message to each friend
            setFriends((friendsList) => {
                return [...friendsList].map((friend) => {
                    const chatMessages = messages.filter((msg) => {
                        return (
                            msg.to === friend.socketId ||
                            msg.from === friend.socketId
                        )
                    })

                    if (!chatMessages) return friend

                    const [lastMessage] = chatMessages.slice(-1)

                    const { content: lastMessageContent } = lastMessage

                    friend.lastMessage = lastMessageContent

                    return friend
                })
            })
        })

        UsersSocket.on('connected', (status, document) => {
            setFriends((oldList) => {
                return [...oldList].map((friend) => {
                    if (friend.document === document) {
                        friend.connected = status
                    }

                    return friend
                })
            })
        })

        return () => {
            UsersSocket.off('friends')
            UsersSocket.off('dm')
            UsersSocket.off('messages')
            UsersSocket.off('connected')
        }
    }, [setFriends, setMessages])

    return (
        <div>
            {friendsList.length === 0 && search !== '' && (
                <span className="flex flex-row text-sm items-center text-slate-400 text-xs">
                    No friend was found with that name
                    <BiSad className="ml-2 text-xl" />
                </span>
            )}
            {friendsList.length === 0 && search === '' && (
                <span className="flex flex-row text-sm text-slate-400 text-xs">
                    Add some contacts so you can chat with people...
                </span>
            )}
            {friendsList.map((user) => {
                return (
                    <div
                        key={user.document}
                        className="p-4 rounded-md hover:bg-gray-100 mx-auto cursor-pointer"
                        onClick={() => {
                            dispatch({ type: 'CHANGE_USER', payload: user })
                        }}
                    >
                        <div className="flex flex-row justify-between">
                            <h3 className="font-medium">{`${user.names} ${user.surnames}`}</h3>
                            <small className="text-xs font-thin">
                                11:59 PM
                            </small>
                        </div>

                        <div className="font-thin text-xs w-3/4 text-ellipsis overflow-hidden">
                            {user.lastMessage || ''}
                        </div>
                    </div>
                )
            })}

            <Chat typing={friendIsTyping} setTyping={setFriendIsTyping} />
        </div>
    )
}

export default Chats
