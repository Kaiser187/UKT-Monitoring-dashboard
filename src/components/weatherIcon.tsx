import React from "react";
import getWeatherIconPath from "../services/weatherIcons.js";

export default function GetWeatherIcon({weather}: { weather: { isDay: boolean, code: string } }) {
	return <img className="weather-icon"
				src={getWeatherIconPath(weather)}
				alt={weather.code}/>;
}