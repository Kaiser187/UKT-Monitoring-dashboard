import React from "react";
import {useState, useEffect} from "react";
import GetFormatedTime from "../services/time.js"
import UKTLogo from "../Assets/UKT-Logo-horizontal.svg"

export function Logo() {

    return (
        <div className="header-logo">
            <img src={UKTLogo} alt="UKT-Logo"/>
        </div>
    )
}

export function Time() {
    const [time, setTime] = useState(GetFormatedTime());
    useEffect(() => {
        setInterval(() => setTime(GetFormatedTime()), 1000);
    }, []);

    return (
        <div className="header-time">
            {time}
        </div>
    )
}