import React from "react";
import {LineTimes} from "../services/api.js";

export default function BusLine({busplan}: { busplan: LineTimes}) {
    return <div className="card busabfahrtentabelle">
        <div className="header">
            <h1 className="direction">{busplan.direction}</h1>
        </div>

        <p className="abfahrten">Abfahrten:</p>

        <div className="from-to-times">
            {busplan.arrivals.map((date, index) => <div key={`${date.getTime()}-${index}`} className="row">
                <span className={"line"}>{busplan.line}</span>

                <div className={"from-to"}>{`${busplan.line} - ${busplan.direction}`}</div>

                <div className={"times"}>
                    {prettyprintDate(date)}
                </div>
            </div>)}
        </div>
    </div>
}

export function prettyprintDate(date: Date): string {
    return new Intl.DateTimeFormat("de-DE", {
        hour: 'numeric',
        minute: '2-digit',
    })
        .format(date)
}