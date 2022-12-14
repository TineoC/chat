import React from 'react'
import { useMemo } from 'react'
import { useContext } from 'react'
import { MessagesContext } from '../../../context/MessagesContext'
import { ChatContext } from '../../../context/ChatContext'

import Message from './Message'
import { useRef } from 'react'
import { useEffect } from 'react'

const Messages = () => {
    const { messages } = useContext(MessagesContext)
    const { data } = useContext(ChatContext)
    const { document, socketId } = data.receiver

    const messagesList = useMemo(() => {
        return messages.filter((msg) => {
            return msg.to === socketId || msg.from === socketId
        })
    }, [messages])

    const bottomDiv = useRef(null)

    useEffect(() => {
        bottomDiv.current?.scrollIntoView()
    })

    if (messages.length === 0) return

    return (
        <div className="flex flex-col gap-2 h-[80%] px-2 box-content overflow-y-auto scroll-smooth">
            {messagesList.map((message, index) => {
                return (
                    <Message key={`${document}.${index}`} message={message} />
                )
            })}

            <div ref={bottomDiv} />
        </div>
    )
}

export default Messages
