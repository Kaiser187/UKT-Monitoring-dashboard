import React from "react";

export default function BusLine({busplan}) {
    return (
        <>
            <div className="Line">

                <p>{busplan.line}</p>
            </div>
            <div className="Abfahrt">
                <p>{busplan.abfahrt}</p>
            </div>
        </>

    )
}
