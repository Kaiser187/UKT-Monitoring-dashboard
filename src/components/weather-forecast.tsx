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
    return <div className="forecast">
        <div className="forecast-days">
            <div className="forecast-day">
                <p>{date.format(forecast.day)}</p>
                <GetWeatherIcon weather={forecast}/>
                <p>{degrees.format(forecast.temperature)}C</p>
            </div>
        </div>
    </div>;
}

export default function ForecastCard() {
	const api = React.useContext(API);
	const forecast = api.useValue(unified => unified.forecast);

	return <div className="main-forecast card">
		<h1 className="forecast-header">Vorhersage</h1>
		{forecast.map(forecast => <WeatherForecast forecast={forecast}/>)}
	</div>
}