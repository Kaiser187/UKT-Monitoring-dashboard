import React from "react";
import GetWeatherIcon from "./weatherIcon.js";
import {API} from "../main.js";
import useRepeated from "../useRepeated.js";

const degrees = new Intl.NumberFormat('de-DE', {
	style: 'unit',
	unit: 'degree',
	unitDisplay: "short",
	maximumFractionDigits: 1,
});

const percent = new Intl.NumberFormat('de-DE', {
	style: 'unit',
	unit: 'percent',
	unitDisplay: 'short',
	maximumFractionDigits: 0
});

const speed = new Intl.NumberFormat('de-DE', {
	style: 'unit',
	unit: 'kilometer-per-hour',
	unitDisplay: 'short',
	maximumFractionDigits: 0
});

export default function CurrentWeatherCard() {
	const api = React.useContext(API);
	const weather = api.useValue(unified => unified.weather);

	return <div id="weather" className={"card"}>
		<h1 className="city">{weather.city || "Tübingen"}</h1>

		<span className="temperature">{degrees.format(weather.temperature)}C</span>

		<div className="icon">
			<GetWeatherIcon weather={weather}/>
		</div>

		<div className="humidity stat">
			<h2 className="details-humidity-name">{'Luftfeuchtigkeit'}</h2>
			<span>{percent.format(weather.humidity)}</span>
		</div>

		<div className="windspeed stat">
			<h2 className="details-windspeed-name">{'Windgeschwindigkeit'}</h2>
			<span>{speed.format(weather.windspeed)}</span>
		</div>
	</div>;
}