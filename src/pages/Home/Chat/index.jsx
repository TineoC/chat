import React, { useState, useContext, useEffect } from 'react'
import { ChatContext } from '../../../context/ChatContext'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import { TbSend, TbPlus } from 'react-icons/tb'
import UsersSocket from '../../../socket/users'
import { FriendsContext } from '../../../context/FriendsContext'

const Chat = () => {
    const [message, setMessage] = useState('')
    const [friendIsTyping, setFriendIsTyping] = useState(false)
    const { friends } = useContext(FriendsContext)

    useEffect(() => {
        UsersSocket.on('typing', (status) => {
            console.log('User is typing', status)
            setFriendIsTyping(status)
        })

        return () => {
            UsersSocket.off('typing')
        }
    }, [UsersSocket])

    useEffect(() => {
        const timeout = setTimeout(() => {
            UsersSocket.emit('typing', { typing: false, to: document })
        }, 3000)

        return () => clearTimeout(timeout)
    }, [message])

    const { data, dispatch } = useContext(ChatContext)

    if (!data.receiver) return

    const { document, names, surnames } = data.receiver

    const connected = friends.find(
        (user) => user.document === document
    ).connected

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleCloseChat = () => {
        dispatch({ type: 'RESET_USER' })
    }

    const handleChange = (e) => {
        setMessage(e.target.value)

        console.log('you are typing...')
        UsersSocket.emit('typing', { typing: true, to: document })
    }

    return (
        <div className="z-10 h-screen absolute top-0 left-0 w-screen bg-gray-50">
            <div className="flex flex-col justify-between py-5 w-[90%] mx-auto">
                <div>
                    <span className="flex flex-row items-center">
                        <button
                            className="flex align-center hover:bg-slate-100 rounded-full p-2 mr-4"
                            onClick={handleCloseChat}
                        >
                            <MdOutlineArrowBackIosNew className="text-blue-600" />
                        </button>

                        <h2 className="font-medium text-xl">{`${names} ${surnames}`}</h2>
                    </span>

                    <div className="flex flex-col">
                        {friendIsTyping ? (
                            <span className="text-md text-blue-500">
                                Typing...
                            </span>
                        ) : connected ? (
                            <span className="text-md text-green-600">
                                Online
                            </span>
                        ) : (
                            <span className="text-md text-red-500">
                                Offline
                            </span>
                        )}
                    </div>

                    <main className="flex flex-col w-full height-full">
                        Messages
                    </main>
                </div>
            </div>

            <div className="bg-gray-100 absolute bottom-0 w-screen py-2">
                <div className="w-[90%] mx-auto">
                    <form
                        className="w-full flex flex-row justify-between"
                        onSubmit={handleSubmit}
                    >
                        <button
                            type="submit"
                            className="text-xl p-2 hover:bg-gray-200 rounded-full"
                        >
                            <TbPlus className=" text-blue-500 hover:text-blue-400" />
                        </button>

                        <input
                            type="text"
                            className=" bg-white rounded-full w-[70%] text-sm py-1 px-2"
                            placeholder="Write some message..."
                            value={message}
                            onChange={handleChange}
                        />

                        <button
                            type="submit"
                            className="text-xl text-blue-500 hover:text-blue-400 p-2 hover:bg-gray-200 rounded-full"
                        >
                            <TbSend />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Chat
