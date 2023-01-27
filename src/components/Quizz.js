import React, { useEffect, useState } from "react";
import Question from "./Question";

export default function Quizz() {
	const [data, setData] = useState([]);
	const [checking, setChecking] = useState(false);
	const [game, setGame] = useState([]);
	const loading = data.length === 0;

	function scoring() {
		let score = 0;
		data.map((question) =>
			question.array.map((e) => {
				if (e.isClicked && e.answer == question.correctAnswer) score++;
			})
		);
		return score;
	}
	/**
	 * API url : https://opentdb.com/api_config.php
	 *
	 */

	function toUTF8(txt) {
		return txt
			.replace(/&quot;/g, '"')
			.replace(/&#039;/g, "'")
			.replace(/&minus;/g, "-")
			.replace(/&amp;/g, ":")
			.replace(/&oacute/g, "ó");
	}

	function newQuizz() {
		setGame((prev) => [...prev, data]);
		setData([]);
		setChecking(false);
	}
	useEffect(() => {
		try {
			console.log("Init fetch");
			fetch("https://opentdb.com/api.php?amount=5")
				.then((res) => {
					return res.json();
				})
				.then((dataInput) => {
					setData(
						dataInput.results.map((e) => ({
							question: toUTF8(e.question),
							correctAnswer: toUTF8(e.correct_answer),
							array: shuffleArray([
								{
									answer: toUTF8(e.correct_answer),
									isClicked: false,
									isCorrect: false,
								},
								...e.incorrect_answers.map((e) => ({
									answer: toUTF8(e),
									isClicked: false,
									isCorrect: false,
								})),
							]),
						}))
					);
				});
		} catch (error) {
			console.log(error);
		}
	}, [game]);

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
								isClicked: index === inputIndex ? true : false,
						  })),
			}))
		);
	}

	function checkAnswers() {
		setChecking(true);
		setData((prevData) =>
			prevData.map((e) => ({
				...e,
				array: e.array.map((ans) => ({
					...ans,
					isCorrect:
						ans.answer === e.correctAnswer
							? "good"
							: ans.isClicked
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
			checking={checking}
		/>
	));
	return (
		<div className="quizz">
			{loading ? (
				<h1>loading</h1>
			) : (
				<>
					{questionsToRender}
					{!checking && (
						<button className="button-check button-main" onClick={checkAnswers}>
							Check Answers
						</button>
					)}
					{checking && (
						<div className="scoreCredit">
							<h1>
								Score : {scoring()} / {data.length}
							</h1>
							<button
								className="button-check button-main newQuizz"
								onClick={newQuizz}
							>
								New Quizz
							</button>
						</div>
					)}
				</>
			)}
		</div>
	);
}
