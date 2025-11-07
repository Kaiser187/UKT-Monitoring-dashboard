import React from 'react'

export interface BusAbfahrtenTabelleProps {
    line: string,
    direction: string,
    times: Date[]
}

export default function BusAbfahrtenTabelle(props: BusAbfahrtenTabelleProps) {
    return (
        <div className="card busabfahrtentabelle">
            <h1>{props.line}</h1>
            <p>{props.direction}</p>
            <span>
                {props.times.map(date =>
                    <p>{`${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`}</p>)}
            </span>
        </div>
    )
}