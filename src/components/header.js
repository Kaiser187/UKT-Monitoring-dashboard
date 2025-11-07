import React from "react";
import { useState, useEffect } from "react";
import GetFormatedTime from "../services/time.js";
import UKTLogo from "../Assets/UKT-Logo-horizontal.svg";
export function Logo() {
    return (React.createElement("div", { className: "header-logo" },
        React.createElement("img", { src: UKTLogo, alt: "UKT-Logo" })));
}
export function Time() {
    const [time, setTime] = useState(GetFormatedTime());
    useEffect(() => {
        setInterval(() => setTime(GetFormatedTime()), 1000);
    }, []);
    return (React.createElement("div", { className: "header-time" }, time));
}
