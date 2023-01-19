import React, { useEffect, useState } from "react";
import dataJson from "../dataExemple.json";
import Question from "./Question";

export default function Quizz() {
	const [data, setData] = useState([]);
	/**
	 * Fetch questions data
	 * TODO : uncomment, temporary use of dataExemple
	 */

	// useEffect(() => {
	// 	const tempData = fetch("https://opentdb.com/api.php?amount=5")
	// 		.then((res) => res.json())
	// 		.then((dataInput) => setData(dataInput));
	// 	console.log(data);
	// }, []);

	useEffect(() => {
		setData(
			dataJson.results.map((e) => ({
				question: e.question,
				array: [e.correct_answer, ...e.incorrect_answers],
			}))
		);
	}, []);

	const questionsToRender = data.map((e) => (
		<Question question={e.question} answerArray={e.array} key={e.question} />
	));

	return (
		<div className="quizz">
			{questionsToRender}
			<button className="button-check button-main">Check Answers</button>
		</div>
	);
}
