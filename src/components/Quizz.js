import React, { useEffect, useState } from "react";
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

	useEffect(() => {
		const isClicked = "";
		try {
			console.log("Init fetch");
			fetch("https://opentdb.com/api.php?amount=5")
				.then((res) => {
					console.log(res);
					return res.json();
				})
				.then((dataInput) => {
					console.log(dataInput.results);
					setData(
						dataInput.results.map((e) => ({
							question: e.question
								.replace(/&quot;/g, '"')
								.replace(/&#039;/g, "'")
								.replace(/&minus;/g, "-")
								.replace(/&amp;/g, ":"),
							correctAnswer: e.correct_answer
								.replace(/&quot;/g, '"')
								.replace(/&amp;/g, ":")
								.replace(/&minus;/g, "-")
								.replace(/&#039;/g, "'"),
							array: shuffleArray([
								{
									answer: e.correct_answer
										.replace(/&quot;/g, '"')
										.replace(/&amp;/g, ":")
										.replace(/&minus;/g, "-")
										.replace(/&#039;/g, "'"),
									isClicked: isClicked,
								},
								...e.incorrect_answers.map((e) => ({
									answer: e
										.replace(/&quot;/g, '"')
										.replace(/&amp;/g, ":")
										.replace(/&minus;/g, "-")
										.replace(/&#039;/g, "'"),
									isClicked: isClicked,
								})),
							]),
						}))
					);
				});
		} catch (error) {
			console.log(error);
		}
	}, []);

	// useEffect(() => {
	// 	setData(
	// 		data.results.map((e) => ({
	// 			question: e.question,
	// 			correctAnswer: e.correct_answer,
	// 			array: shuffleArray([
	// 				{ answer: e.correct_answer, isClicked: isClicked },
	// 				...e.incorrect_answers.map((e) => ({
	// 					answer: e,
	// 					isClicked: isClicked,
	// 				})),
	// 			]),
	// 		}))
	// 	);
	// }, []);

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
	const loading = data.length === 0;
	return (
		<div className="quizz">
			{loading ? (
				<h1>loading</h1>
			) : (
				<>
					{questionsToRender}
					<button className="button-check button-main" onClick={checkAnswers}>
						Check Answers
					</button>
				</>
			)}
		</div>
	);
}
