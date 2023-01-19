import React from "react";

export default function Accueil({ toggle }) {
	return (
		<div className="accueil">
			<h1>Quizzical</h1>
			<p>Some description if needed</p>
			<button className="button-main" onClick={toggle}>
				Start quiz
			</button>
		</div>
	);
}
