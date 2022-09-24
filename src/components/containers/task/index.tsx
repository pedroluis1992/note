import React from "react";
import Card from "../../organisms/Card";
import Theme from "../../theme/theme";

const Tasks = (props: any) => {
	return (
		<>
			<h1>Notas</h1>
			<div style={{ height: "100%", margin: "20px", display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
				<Card
					header={"Featured"}
					title={"Special title treatment"}
					text="With supporting text below as a natural lead-in to additional content."
					buttonText={"Ver"}
					footer={"2 days ago"}
				/>
			</div>
		</>
	)
}

export default Tasks;