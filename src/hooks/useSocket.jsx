import React, { useEffect } from 'react'
import UsersSocket from '../socket/users'

const useSocket = (setFriends) => {
    useEffect(() => {
        UsersSocket.connect()

        UsersSocket.on('friends', (friendList) => {
            setFriends(friendList)
        })

        // UsersSocket.on('messages', (messages) => {
        //     setMessages(messages)
        // })

        // UsersSocket.on('dm', (message) => {
        //     setMessages((prevMsgs) => [message, ...prevMsgs])
        // })

        UsersSocket.on('connected', (status, username) => {
            setFriends((prevFriends) => {
                return [...prevFriends].map((friend) => {
                    if (friend.username === username) {
                        friend.connected = status
                    }
                    return friend
                })
            })
        })

        return () => {
            UsersSocket.off('friends')
            UsersSocket.off('connected')

            // UsersSocket.off('messages')
            // UsersSocket.off('dm')
        }
    }, [UsersSocket, setFriends])
}

export default useSocket
