import React from "react";
import getWeatherIconPath from "../services/weatherIcons.js";
import {WeatherType} from "../services/api.js";

export default function GetWeatherIcon({weather}: { weather: { weather: string, code: number, isDay: boolean } }) {
	console.log(weather.code);

	return <img className="weather-icon"
				src={getWeatherIconPath(weather)}
				alt={weather.weather}/>;
}