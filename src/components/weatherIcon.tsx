import React, {useEffect, useState} from "react";
import getWeatherIconPath from "../services/weatherIcons.js";

export default function GetWeatherIcon({weather}: {weather: { isDay: boolean, code: string }}) {
    const [iconPath, setIconPath] = useState(getWeatherIconPath(weather));
    useEffect(() => {
        setInterval(() => setIconPath(getWeatherIconPath(weather)), 1000);
        console.log(iconPath);
    }, []);

    return(
        <img className="weather-type"
             src={iconPath} alt={weather.code}/>
    )
}