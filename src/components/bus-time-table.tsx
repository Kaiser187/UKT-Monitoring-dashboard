import React from "react";

import useRepeated from "../useRepeated.js";
import {API} from "../main.js";
import {LineTimes} from "../services/api.js";
import {prettyprintDate} from "../services/time.js";

export default function BusTimeTable() {
	const api = React.useContext(API);
	const buses = api.useValue(unified => unified.buses);

	if (buses)
		return <section id="main-busstops">
			{Object.entries(buses).map(([stop, times]) => <div className="card busabfahrtentabelle">
				<div className="header">
					<h1 className="direction">{stop}</h1>
				</div>

				<p className="abfahrten">Abfahrten:</p>

				<BusLine busplan={times}/>
			</div>)}
		</section>;
	else return <span className={"loading"}>
		{"loading..."}
	</span>
}

function BusLine({busplan}: { busplan: LineTimes[] }) {
    return <>
        <div className="from-to-times">
            {busplan.map((arrival, index) => <div key={`${arrival.expectedArrival.getTime()}-${index}`} className="row">
                <span className={"line"}>{arrival.line}</span>

                <div className={"from-to"}>{arrival.direction}</div>

                <div className={"times"}>
                    {prettyprintDate(arrival.expectedArrival)}
                </div>
            </div>)}
        </div>
	</>
}