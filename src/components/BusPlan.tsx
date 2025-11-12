import React, {useState, useEffect} from "react";
import GetTimeUntilBus from "../services/untilBusTime.js";
import {API} from "../main.js";
import useRepeated from "../useRepeated.js";

export interface BusAbfahrtenTabelleProps {
    line: string,
    from: string,
    direction: string,
    times: Date[],
}

export default function BusAbfahrtenTabelle(props: BusAbfahrtenTabelleProps) {
    // const [untilTime, setTime] = useState(() => GetTimeUntilBus({ times: props.times }));
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setTime(GetTimeUntilBus({ times: props.times }));
    //     }, 1);
    //     return () => clearInterval(interval);
    // }, [props.times]);

    const busApi = React.useContext(API);
    const buses = useRepeated(async () => {
        return await busApi.buses();
    }, 30_000);

    React.useEffect(() => console.log(buses), [buses]);

    return (
        <div className="card busabfahrtentabelle">
            <div className="header">
                <h1 className="direction">{props.direction}</h1>
            </div>

            <p className="abfahrten">Abfahrten:</p>

            <div className="from-to-times">
                {/*{props.times.map((date, index) => (*/}
                {/*    <div key={`${date.getTime()}-${index}`} className="row">*/}
                {/*        <p className="line">*/}
                {/*            {props.line}*/}
                {/*        </p>*/}
                {/*        <p className="from-to">*/}
                {/*            {props.from} - {props.direction}*/}
                {/*        </p>*/}
                {/*        <p className="avrival">*/}
                {/*            {untilTime}*/}
                {/*        </p>*/}
                {/*        <p className="times">*/}
                {/*            {`${date.getHours()}:${date*/}
                {/*                .getMinutes()*/}
                {/*                .toString()*/}
                {/*                .padStart(2, "0")}`}*/}
                {/*        </p>*/}
                {/*    </div>*/}
                {/*))}*/}
            </div>
        </div>
    )
}