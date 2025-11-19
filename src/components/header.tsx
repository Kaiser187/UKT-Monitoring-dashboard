import React from "react";
import {prettyprintDate} from "../services/time.js"
import UKTLogoDark from "../../assets/UKT-Logo-horizontal-black.svg"
import UKTLogoLight from "../../assets/UKT-Logo-horizontal-white.svg"
import useRepeated from "../useRepeated.js";

export function Logo() {
    return <div id="logo">
        <picture>
            <source srcSet={UKTLogoDark} media="(prefers-color-scheme: light)"/>
            <source srcSet={UKTLogoLight} media="(prefers-color-scheme: dark)"/>
            <img src={UKTLogoDark} alt="Description of what the image shows"/>
        </picture>
    </div>;
}

export function Time() {
    const time = useRepeated(() => new Date(), 1_000);

    return <h1 id="time">
        {prettyprintDate(time, true)}
    </h1>
}