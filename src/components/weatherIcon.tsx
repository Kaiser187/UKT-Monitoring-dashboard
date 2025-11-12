import React from "react";
import getWeatherIconPath from "../services/weatherIcons.js";

export default function GetWeatherIcon({weather}: { weather: { isDay: boolean, code: number, weather: string } }) {
	console.log(weather.code);

	return <img className="weather-icon"
				src={getWeatherIconPath(weather)}
				alt={weather.weather}/>;
}