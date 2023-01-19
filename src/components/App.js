import React, { useState } from "react";
import Accueil from "./Accueil";
import Quizz from "./Quizz";
import blobBlue from "../assets/blob-Blue";
import blobLemon from "../assets/blob-Lemon";

function App() {
	const [quizz, setQuizz] = useState(false);
	return (
		<>
			<img src={blobBlue} alt="" />
			{!quizz ? <Accueil /> : <Quizz />}
			<img src={blobLemon} />
		</>
	);
}
