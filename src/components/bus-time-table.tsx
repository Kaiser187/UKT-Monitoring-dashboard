import React from "react";

import useRepeated from "../useRepeated.js";
import {API} from "../main.js";
import BusLine from "./bus-line.js";

export default function BusTimeTable() {
	const api = React.useContext(API);
	const buses = useRepeated(() => api.buses(20), 60_000);

	if (buses)
		return <section id="main-busstops">
			{Object.entries(buses).map(([line, times]) => <BusLine busplan={times}/>)}
		</section>;
	else return <span className={"loading"}>
		{"loading..."}
	</span>
}