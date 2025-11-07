import React from 'react';
import dom from 'react-dom/client';
import "../css/main.css";
import {Logo, Time} from "./components/header.js";
import Weather, {WeatherType} from './components/weather.js'
import Forecast from './components/forecast.js'
import BusPlan from './components/BusPlan.js'
import {busplanHagellocherweg, busplanWeilerhalde, forecast, weather} from "./Data.js";
import BusAbfahrtenTabelle from "./components/BusPlan.js";

dom.createRoot(document.querySelector("#root")!)
    .render(<App/>);

export function App() {
    return (
        <div className="main-content">
            <div className="main-header">
                <div className="main-Logo">
                    <Logo/>
                </div>
                <div className="main-Logo">
                    <Time/>
                </div>
            </div>

            <div className="main-weather card">
                <Weather weather={weather}/>
            </div>
            <div className="main-forecast card">
                <h2 className="forecast-header">5-Day Forecast</h2>
                {forecast.map(forecast => <Forecast forecast={forecast}/>)}
            </div>

            <section id="main-busstops">
                <BusAbfahrtenTabelle line="16" direction="HBF" times={[
                    "2025-11-07T10:30:00+01:00",
                    "2025-11-07T11:30:00+01:00",
                    "2025-11-07T12:30:00+01:00"
                ].map(str => new Date(str))}/>
                <BusAbfahrtenTabelle line="8" direction="Hagelloch" times={[
                    "2025-11-07T10:00:00+01:00",
                    "2025-11-07T11:00:00+01:00",
                    "2025-11-07T12:00:00+01:00"
                ].map(str => new Date(str))}/>
            </section>
        </div>
    )
}