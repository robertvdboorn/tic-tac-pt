import Head from "next/head";
import Game from "../components/Game";
import styles from "../styles/Home.module.css";

export default function Home() {
	return (
		<div>
			<Head>
				<title>Tic Tac Toe</title>
				<meta
					name="description"
					content="Tic Tac Toe game built with Next.js"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<h1 className={styles.title}>Tic Tac Toe by ChatGPT</h1>
				<Game />
			</main>
		</div>
	);
}
