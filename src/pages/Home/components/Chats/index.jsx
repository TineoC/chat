import React, { useContext, useMemo } from 'react'

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
    const { messages, setMessages } = useContext(MessagesContext)

    const { dispatch } = useContext(ChatContext)

    const friendsList = useMemo(() => {
        return filterArray(friends, search)
    }, [friends])

    useEffect(() => {
        UsersSocket.connect()

        UsersSocket.on('friends', (friendList) => {
            setFriends(friendList)
        })

        UsersSocket.on('messages', (messages) => {
            setMessages(messages)
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

        UsersSocket.on('dm', (message) => {
            console.log(message)
            setMessages((prevMsgs) => [message, ...prevMsgs])
        })

        return () => {
            UsersSocket.off('friends')
            UsersSocket.off('messages')
            UsersSocket.off('connected')
            UsersSocket.off('dm')
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
                        <small className="font-thin">Last message...</small>
                    </div>
                )
            })}

            <Chat />
        </div>
    )
}

export default Chats
