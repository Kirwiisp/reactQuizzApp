import React, { useState } from "react";
import Accueil from "./Accueil";
import Quizz from "./Quizz";
import blobBlue from "../assets/blob-blue.svg";
import blobLemon from "../assets/blob-lemon.svg";

export default function App() {
	const [quizz, setQuizz] = useState(false);

	function toggle() {
		console.log("toggle");
		setQuizz((prevQuizz) => !prevQuizz);
	}
	return (
		<div className="app">
			<img id="blob-blue" src={blobBlue} alt="" />
			{!quizz ? <Accueil toggle={toggle} /> : <Quizz />}
			<img id="blob-lemon" src={blobLemon} />
		</div>
	);
}
