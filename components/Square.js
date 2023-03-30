import React from "react";
import classnames from "classnames";
import styles from "../styles/game.module.css";

const Square = ({ value, onClick }) => {
	const classes = classnames(styles.square, {
		[styles["square-filled"]]: value,
		[styles["x-move"]]: value === "X",
		[styles["o-move"]]: value === "O",
	});

	return (
		<button className={classes} onClick={onClick}>
			{value}
		</button>
	);
};

export default Square;
