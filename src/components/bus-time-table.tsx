import React from "react";

import {API} from "../main.js";
import {LineTimes} from "../services/api.js";
import {prettyprintDate} from "../services/time.js";

export default function BusTimeTable() {
	const api = React.useContext(API);
	const buses = api.useValue(unified => unified.buses);

	return <section id="buses" className="card">
		{Object.entries(buses).map(([stop, times]) => <div className="stop">
			<h1 className="header">{stop}</h1>

			<div className="column-headers">
				<span className="column line">{"Linie"}</span>
				<span className="column dir">{"Richtung"}</span>
				<span className="column arr">{"Abfahrt"}</span>
			</div>

			<BusLine busplan={times}/>
		</div>)}
	</section>;
}

function BusLine({busplan}: { busplan: LineTimes[] }) {
    return <div className="from-to-times">
		{busplan.map(arrival => <>
			<span className={"line"}>{arrival.line}</span>
			<span className={"from-to"}>{arrival.direction}</span>
			<div className={"times"}>{prettyprintDate(arrival.expectedArrival)}</div>
		</>)}
	</div>
}