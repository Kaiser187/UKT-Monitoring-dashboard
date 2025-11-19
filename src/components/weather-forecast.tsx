import React from "react";

import GetWeatherIcon from "./weatherIcon.js";
import {Forecast, WeatherType} from "../services/api.js";
import {API} from "../main.js";
import useRepeated from "../useRepeated.js";

const degrees = new Intl.NumberFormat('de-DE', {
	style: 'unit',
	unit: 'degree',
	unitDisplay: "short",
	maximumFractionDigits: 1,
});

const date = new Intl.DateTimeFormat('de-DE', {
    weekday: 'short'
});

export function WeatherForecast({forecast}: { forecast: Forecast }) {
    return <div className="forecast-day">
		<span className="forecast-day-label">{date.format(forecast.day)}</span>
		<GetWeatherIcon weather={forecast}/>
		<span className="temperature">{degrees.format(forecast.temperature)}C</span>
	</div>;
}

export default function ForecastCard() {
	const api = React.useContext(API);
	const forecast = api.useValue(unified => unified.forecast);

	return <div id="forecast" className="card">
		<h1 className="forecast-header">{"Vorhersage"}</h1>
		<div id="forecast-days">
			{forecast.map(forecast => <WeatherForecast forecast={forecast}/>)}
		</div>
	</div>
}