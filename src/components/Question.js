import React from "react";

export default function Question({ question, answerArray }) {
	const resp = answerArray.map((e, index) => (
		<button className="button-answer" key={e + index}>
			{e}
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
