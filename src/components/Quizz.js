import React, { useEffect, useState } from "react";

export default function Quizz() {
	const [data, setData] = useState();
	useEffect(() => {
		const tempData = fetch("https://opentdb.com/api.php?amount=5").then((res) =>
			console.log(res)
		);
	}, []);
	return <div className="quizz"></div>;
}
