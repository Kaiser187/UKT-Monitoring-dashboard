import React from 'react';
import dom from 'react-dom/client';
import "../css/main.css";

import {Logo, Time} from "./components/header.js";
import WeatherForecast from './components/weather-forecast.js'
import V1Api from "./services/api.js";
import URI from "urijs";
import BusTimeTable from "./components/bus-time-table.js";
import CurrentWeatherCard from "./components/current-weather-card.js";

const api = new V1Api(new URI(window.location.toString())
    .path("/api/v1"));
export const API = React.createContext(api);

dom.createRoot(document.querySelector("#root")!)
    .render(<API.Provider value={api}>
    <App/>
</API.Provider>);

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

            <CurrentWeatherCard />
            <WeatherForecast />

            <BusTimeTable />
        </div>
    )
}