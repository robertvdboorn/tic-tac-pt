import React from "react";
import classnames from "classnames";
import styles from "../styles/smallBoard.module.css";

const SmallBoard = ({ squares, xIsNext }) => {
  const renderSquare = (i) => {
    const classes = classnames(styles["small-square"], {
      [styles["x-move"]]: squares[i] === "X",
      [styles["o-move"]]: squares[i] === "O",
    });
    return (
      <div key={i} className={classes}>
        {squares[i]}
      </div>
    );
  };

  return (
    <div className={styles["small-board"]}>
      {squares.map((_, i) => renderSquare(i))}
    </div>
  );
};

export default SmallBoard;
