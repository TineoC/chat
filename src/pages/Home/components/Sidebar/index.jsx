import React from "react";

import User from "./User";
import SearchBar from "./SearchBar";

const Sidebar = () => {
	const styles = "bg-gray-100 h-full flex-none w-1/3 lg:w-1/4";
	return (
		<div className={styles + "flex flex-col"}>
			<User />
			<SearchBar />
		</div>
	);
};

export default Sidebar;
