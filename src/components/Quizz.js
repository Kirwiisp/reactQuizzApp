import React, { useEffect, useState } from "react";
import dataJson from "../dataExemple.json";
import Question from "./Question";

export default function Quizz() {
	const [data, setData] = useState([]);
	/**
	 * Fetch questions data
	 * TODO : uncomment, temporary use of dataExemple
	 *
	 * API url : https://opentdb.com/api_config.php
	 *
	 */

	// useEffect(() => {
	// 	const tempData = fetch("https://opentdb.com/api.php?amount=5")
	// 		.then((res) => res.json())
	// 		.then((dataInput) => setData(dataInput));
	// 	console.log(data);
	// }, []);

	console.log("render Quizz");

	useEffect(() => {
		const isClicked = "";
		setData(
			dataJson.results.map((e) => ({
				question: e.question,
				correctAnswer: e.correct_answer,
				array: shuffleArray([
					{ answer: e.correct_answer, isClicked: isClicked },
					...e.incorrect_answers.map((e) => ({
						answer: e,
						isClicked: isClicked,
					})),
				]),
			}))
		);
	}, []);

	function shuffleArray(arr) {
		const tempArr = arr.map((e) => e);
		for (let i = tempArr.length - 1; i > 0; i--) {
			let randIndex = Math.floor(Math.random() * tempArr.length);
			let temp = tempArr[i];
			tempArr[i] = tempArr[randIndex];
			tempArr[randIndex] = temp;
		}
		return tempArr;
	}
	data.forEach((e) => console.log(shuffleArray(e.array)));

	function handleClick(question, inputIndex) {
		setData((prevData) =>
			prevData.map((e) => ({
				...e,
				array:
					question !== e.question
						? e.array
						: e.array.map((ob, index) => ({
								...ob,
								isClicked: index !== inputIndex ? "" : "clicked",
						  })),
			}))
		);
	}

	function checkAnswers() {
		console.log("check");
		setData((prevData) =>
			prevData.map((e) => ({
				...e,
				array: e.array.map((ans) => ({
					...ans,
					isClicked:
						ans.answer === e.correctAnswer
							? "good"
							: ans.isClicked === "clicked"
							? "wrong"
							: "faded",
				})),
			}))
		);
	}

	const questionsToRender = data.map((e) => (
		<Question
			question={e.question}
			answerArray={e.array}
			key={e.question}
			handleClick={handleClick}
		/>
	));

	return (
		<div className="quizz">
			{questionsToRender}
			<button className="button-check button-main" onClick={checkAnswers}>
				Check Answers
			</button>
		</div>
	);
}
