import React from "react";
import {useState, useEffect} from "react";
import GetFormatedTime from "../services/time.js"
import UKTLogoDark from "../../assets/UKT-Logo-horizontal-black.svg"
import UKTLogoLight from "../../assets/UKT-Logo-horizontal-white.svg"

export function Logo() {

    return (
        <div className="header-logo">
            <picture>
                <source srcSet={UKTLogoDark} media="(prefers-color-scheme: light)"/>
                <source srcSet={UKTLogoLight} media="(prefers-color-scheme: dark)"/>
                <img src={UKTLogoDark} alt="Description of what the image shows"/>
            </picture>
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