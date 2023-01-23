import React from "react";

export default function Question({ question, answerArray, handleClick }) {
	const resp = answerArray.map((e, index) => (
		<button
			className={`button-answer ${e.isClicked}`}
			key={e.answer + index}
			onClick={() => handleClick(question, index)}
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
