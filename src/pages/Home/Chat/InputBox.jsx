import React, { useState, useEffect, useContext } from 'react'
import { TbSend, TbPlus } from 'react-icons/tb'
import UsersSocket from '../../../socket/users'
import { ChatContext } from '../../../context/ChatContext'

import { MessagesContext } from '../../../context/MessagesContext'

const InputBox = ({ setTyping }) => {
    const [message, setMessage] = useState('')
    const { data } = useContext(ChatContext)

    const { setMessages } = useContext(MessagesContext)

    const { socketId } = data.receiver

    useEffect(() => {
        UsersSocket.on('typing', (status) => {
            setTyping(status)
        })

        return () => {
            UsersSocket.off('typing')
        }
    }, [setTyping])

    useEffect(() => {
        const timeout = setTimeout(() => {
            UsersSocket.emit('typing', { typing: false, to: socketId })
        }, 5000)

        return () => clearTimeout(timeout)
    }, [message])

    useEffect(() => {
        UsersSocket.on('dm', (message) => {
            setTyping(false)
            setMessages((prevMsgs) => [...prevMsgs, message])
        })

        return () => {
            UsersSocket.off('dm')
        }
    }, [setMessages])

    const handleSubmit = (e) => {
        e.preventDefault()

        const payload = {
            to: socketId,
            from: '',
            content: message,
        }

        UsersSocket.emit('dm', payload)

        setMessages((previousMessages) => [...previousMessages, payload])

        setMessage('')
    }
    const handleChange = (e) => {
        setMessage(e.target.value)

        UsersSocket.emit('typing', { typing: true, to: socketId })
    }

    return (
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
                        className=" bg-white rounded-full w-[70%] text-sm py-1 px-4"
                        placeholder="Write some message..."
                        value={message}
                        onChange={handleChange}
                        required
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
    )
}

export default InputBox
