import React from "react";
import GetWeatherIcon from "./weatherIcon.js";
import {WeatherType} from "./weather.js";

export default function Forecast({forecast}: { forecast: WeatherType }) {
    return (
        <div className="forecast">
            <div className="forecast-days">
                <div className="forecast-day">
                    <p>{`Tag ${forecast.day}`}</p>
                    <GetWeatherIcon weather={forecast}/>
                    <p>{forecast.temperature}C°</p>
                </div>
            </div>
        </div>
    )
}