import React from "react";
import getWeatherIconPath from "../services/weatherIcons.js";
import {WeatherType} from "../services/api.js";

export interface IconProps {
	weather: {
		weather: string,
		code: number,
		isDay: boolean
	}
}

export default function GetWeatherIcon(props: IconProps) {
	return <img className="weather-icon"
		src={getWeatherIconPath(props.weather)}
		alt={props.weather.weather}/>;
}