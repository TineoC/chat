import React, { useContext, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { AddContactsContext } from "../../../../context/AddContactsContext";
import UsersList from "./UsersList";

const AddContactModal = () => {
	// Add Contacts Modal State
	const { showModal, setShowModal } = useContext(AddContactsContext);
	const [search, setSearch] = useState("");

	if (!showModal) return null;

	const handleCloseModal = () => {
		setShowModal(false);
	};

	return (
		<div className='z-10 h-screen absolute top-0 left-0 w-screen bg-gray-50'>
			<div className='w-full z-11 bg-gray-50 fixed flex flex-col py-4'>
				<div className='w-[90%] mx-auto'>
					<div className='flex flex-row justify-between items-center mb-2'>
						<h1 className='font-bold text-xl text-center'>
							Add Contact
						</h1>

						<button
							className='text-2xl text-red-500 hover:text-red-400 hover:bg-gray-200 rounded-full p-1'
							onClick={handleCloseModal}
						>
							<MdOutlineClose />
						</button>
					</div>

					<input
						className='w-full rounded-sm p-2 bg-gray-200'
						placeholder='Search someone...'
						type='search'
						value={search}
						onChange={(e) => {
							setSearch(e.target.value);
						}}
					/>
				</div>
			</div>
			<UsersList search={search} />
		</div>
	);
};

export default AddContactModal;
