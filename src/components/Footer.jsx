import React from "react";

const Footer = ({ year, name }) => {
	return (
		<footer>
			<small>
				&copy; Copyright {year}
				{new Date().getFullYear() > year &&
					`-${new Date().getFullYear()}`}{" "}
				{name}
			</small>
		</footer>
	);
};

export default Footer;
