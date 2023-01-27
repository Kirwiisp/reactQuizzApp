import React from "react";

export default function Question({
	question,
	answerArray,
	handleClick,
	checking,
}) {
	const resp = answerArray.map((e, index) => (
		<button
			className={`button-answer ${e.isClicked && !checking && "clicked"} ${
				e.isCorrect
			}`}
			key={e.answer + index}
			onClick={() =>
				!checking
					? handleClick(question, index)
					: console.log("You can't change your answer")
			}
		>
			{e.answer}
		</button>
	));
	return (
		<div className="question">
			<h1>{question}</h1>
			<div className="answers">{resp}</div>
			<hr />
		</div>
	);
}
