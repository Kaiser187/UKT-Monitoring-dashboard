import React from "react";
import GetWeatherIcon from "./weatherIcon.js";
import {WeatherType} from "../services/api.js";

export default function Weather({weather}: { weather: WeatherType }) {
    return <>
        <h1 className="city">{weather.city}</h1>
        <p className="temperature">
            {weather.temperature}°C
        </p>
        <div className="icon">
            <GetWeatherIcon weather={weather}/>
        </div>
        <div className="humidity">
            <div className="details-humidity-name">
                <p>Luftfeuchtigkeit</p>
            </div>
            <div className="details-humidity-data">
                <p>{weather.humidity}%</p>
            </div>
        </div>
        <div className="windspeed">
            <div className="details-windspeed-name">
                <p>Windgeschwindigkeit</p>
            </div>
            <div className="details-windspeed-data">
                <p>{weather.windspeed} km/h</p>
            </div>
        </div>
    </>;
}