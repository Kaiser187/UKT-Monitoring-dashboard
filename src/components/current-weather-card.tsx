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
	const weather = useRepeated(() => api.weatherNow(), 60_000);

	if (!weather)
		return <span>{"Loading ..."}</span>;

	return <div className={"main-weather card"}>
		<h1 className="city">{weather.city}</h1>
		<p className="temperature">
			{degrees.format(weather.temperature)}C
		</p>
		<div className="icon">
			<GetWeatherIcon weather={weather}/>
		</div>
		<div className="humidity">
			<div className="details-humidity-name">
				<p>Luftfeuchtigkeit</p>
			</div>
			<div className="details-humidity-data">
				<p>{percent.format(weather.temperature)}</p>
			</div>
		</div>
		<div className="windspeed">
			<div className="details-windspeed-name">
				<p>Windgeschwindigkeit</p>
			</div>
			<div className="details-windspeed-data">
				<p>{speed.format(weather.windspeed)}</p>
			</div>
		</div>
	</div>;
}