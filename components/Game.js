import React, { useState } from "react";
import Board from "./Board";
import SmallBoard from "./SmallBoard";
import styles from "../styles/game.module.css";

const Game = () => {
	const [state, setState] = useState({
		history: [
			{
				squares: Array(9).fill(null),
			},
		],
		stepNumber: 0,
		xIsNext: true,
		xScore: 0,
		oScore: 0,
	});

	const handleClick = (i) => {
		const history = state.history.slice(0, state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();

		if (calculateWinner(squares) || squares[i]) {
			return;
		}

		squares[i] = state.xIsNext ? "X" : "O";
		const winner = calculateWinner(squares);

		setState((prevState) => {
			const newState = {
				...prevState,
				history: history.concat([
					{
						squares: squares,
					},
				]),
				stepNumber: history.length,
				xIsNext: !prevState.xIsNext,
			};

			if (winner) {
				newState.xScore = prevState.xScore + (winner === "X" ? 1 : 0);
				newState.oScore = prevState.oScore + (winner === "O" ? 1 : 0);
			}

			return newState;
		});
	};

	const jumpTo = (step) => {
		setState((prevState) => ({
			...prevState,
			stepNumber: step,
			xIsNext: step % 2 === 0,
		}));
	};

	const history = state.history;
	const current = history[state.stepNumber];
	const winner = calculateWinner(current.squares);

	// Update the status message based on the game state
	let status;
	if (winner) {
		status = "Winner: " + winner;
	} else if (state.stepNumber === 9) {
		status = "Draw";
	} else {
		status = "Next player: " + (state.xIsNext ? "X" : "O");
	}

	const moves = history.map((step, move) => {
		const desc = move ? "Go to move #" + move : "Go to game start";
		return (
			<li className={styles.step} key={move}>
				<button className={styles.move} onClick={() => jumpTo(move)}>
					{desc}
				</button>
				{move > 0 && (
					<div className={styles["small-board-container"]}>
						<SmallBoard squares={step.squares} xIsNext={step.xIsNext} />
					</div>
				)}
			</li>
		);
	});

	return (
		<div className={styles.game}>
			<div className={styles["game-content"]}>
				<Board squares={current.squares} onClick={(i) => handleClick(i)} />
				<div className={styles["game-info"]}>
					<div className={styles["score-container"]}>
						<div>
							X Score: <span className={styles["x-move"]}>{state.xScore}</span>
						</div>
						<div>
							O Score: <span className={styles["o-move"]}>{state.oScore}</span>
						</div>
					</div>
					<div className={`${styles.status} ${styles["status-text"]}`}>
						{status}
					</div>
					<ol className={styles.moves}>{moves}</ol>
				</div>
			</div>
		</div>
	);
};

const calculateWinner = (squares) => {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
};

export default Game;
