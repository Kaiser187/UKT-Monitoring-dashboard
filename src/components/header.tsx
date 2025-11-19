import React from "react";
import {prettyprintDate} from "../services/time.js"
import UKTLogoDark from "../../assets/UKT-Logo-horizontal-black.svg"
import UKTLogoLight from "../../assets/UKT-Logo-horizontal-white.svg"
import useRepeated from "../useRepeated.js";

export function Logo() {
    return <div className="header-logo">
        <picture>
            <source srcSet={UKTLogoDark} media="(prefers-color-scheme: light)"/>
            <source srcSet={UKTLogoLight} media="(prefers-color-scheme: dark)"/>
            <img src={UKTLogoDark} alt="Description of what the image shows"/>
        </picture>
    </div>;
}

export function Time() {
    const time = useRepeated(() => new Date(), 1_000);

    return <div className="header-time">
        {prettyprintDate(time, true)}
    </div>
}