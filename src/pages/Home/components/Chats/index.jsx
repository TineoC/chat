import React, { useContext } from 'react'
import { FriendsContext } from '../../../../context/FriendsContext'
import UsersSocket from '../../../../socket/users'
import { useEffect } from 'react'
import { ChatContext } from '../../../../context/ChatContext'
import { useMemo } from 'react'
import { filterArray } from '../../../../utils/search'
import { BiSad } from 'react-icons/bi'

const Chats = ({ search }) => {
    const { friends, setFriends } = useContext(FriendsContext)

    const { dispatch } = useContext(ChatContext)

    useEffect(() => {
        UsersSocket.connect()

        UsersSocket.on('friends', (friendsArray) => {
            setFriends(friendsArray)
        })

        UsersSocket.on('connected', (status, document) => {
            console.log(status, document)
            setFriends((oldList) => {
                return [...oldList].map((friend) => {
                    if (friend.document === document) {
                        friend.connected = status
                    }
                    return friend
                })
            })
            console.log(friends)
        })

        return () => {
            UsersSocket.off('friends')
            UsersSocket.off('connected')
        }
    }, [UsersSocket])

    const friendsList = useMemo(() => {
        return filterArray(friends, search)
    }, [friends, search])

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
            })}{' '}
        </div>
    )
}

export default Chats
