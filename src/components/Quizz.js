import React, { useEffect, useState } from "react";

export default function Quizz() {
	const [data, setData] = useState();
	useEffect(() => {
		const tempData = fetch("https://opentdb.com/api.php?amount=5")
			.then((res) => res.json())
			.then((dataInput) => setData(dataInput));
		console.log(data);
	}, []);
	console.log(`Outside effect `);
	console.log(JSON.stringify(data));
	return <div className="quizz"></div>;
}
