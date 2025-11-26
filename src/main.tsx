import React from 'react';
import dom from 'react-dom/client';
import "../css/main.css";

import {Logo, Time} from "./components/header.js";
import WeatherForecast from './components/weather-forecast.js'
import V1Api, {Unified} from "./services/api.js";
import URI from "urijs";
import BusTimeTable from "./components/bus-time-table.js";
import CurrentWeatherCard from "./components/current-weather-card.js";

const base = window.localStorage.getItem("API_BASE") ||window.location.toString();
const api = new Unified(new V1Api(new URI(base)
    .path("/api/v1")));
export const API = React.createContext(api);

await api.kickstart();

dom.createRoot(document.querySelector("#root")!)
    .render(<API.Provider value={api}>
    <App/>

</API.Provider>);

export function App() {
    return <div id="main-content">
        <div id="header">
            <Logo/>
            <Time/>
        </div>

        <CurrentWeatherCard />
        <WeatherForecast />

        <BusTimeTable />
    </div>
}