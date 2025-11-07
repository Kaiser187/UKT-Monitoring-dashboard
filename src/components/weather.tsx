import React from "react";
import GetWeatherIcon from "./weatherIcon.js";

export default function Weather({weather}: { weather: WeatherType }) {

    return (
        <>
            <h1 className="city">{weather.city}</h1>
            <p className="temperature">
                {weather.temperature}
                °C
            </p>
            <div className="icon">
                <GetWeatherIcon weather={weather}/>
            </div>
            <div className="humidity">
                <div className="details-humidity-name">
                    <p>Humidity:</p>
                </div>
                <div className="details-humidity-data">
                    <p>{weather.humidity}%</p>
                </div>
            </div>
            <div className="windspeed">
                <div className="details-windspeed-name">
                    <p>Wind Speed:</p>
                </div>
                <div className="details-windspeed-data">
                    <p>{weather.windspeed} kmh</p>
                </div>
            </div>
        </>
    );
}

export interface WeatherType {
    isDay: boolean,
    city: string;
    windspeed: number;
    humidity: number;
    day: number;
    code: string;
    temperature: number;


}