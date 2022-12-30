import React, { useContext } from 'react'
import { HiLogout } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../../context/AuthContext'
import { FaUserPlus } from 'react-icons/fa'
import AddContactModal from './AddContactModal'
import { AddContactsContext } from '../../../../context/AddContactsContext'
import UsersSocket from '../../../../socket/users'
import SERVER_URL from '../../../../config/server'

const User = () => {
    const navigate = useNavigate()

    // Add Contacts Context
    const { setShowModal } = useContext(AddContactsContext)

    // Auth Context
    const { currentUser, setCurrentUser } = useContext(AuthContext)

    const { names, surnames } = currentUser

    const handleLogout = async () => {
        const URL = `${SERVER_URL}/auth/logout`

        const options = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        }

        try {
            navigate('/')

            const response = await fetch(URL, options)

            if (response.ok) {
                setCurrentUser(null)

                UsersSocket.disconnect()
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleAddContact = () => {
        setShowModal((state) => !state)
    }

    return (
        <div className="flex flex-row w-full items-center justify-between">
            <span className="text-md font-medium">{`${names} ${surnames}`}</span>

            <div className="flex flex-row items-center gap-x-2 text-xl">
                <button
                    className="p-2 hover:bg-gray-100 rounded-full text-blue-800 hover:text-blue-600"
                    onClick={handleAddContact}
                >
                    <FaUserPlus />
                </button>

                <button
                    className="p-2 hover:bg-gray-100 rounded-full text-red-600 hover:text-red-500"
                    onClick={handleLogout}
                >
                    <HiLogout />
                </button>
            </div>

            <AddContactModal />
        </div>
    )
}

export default User
