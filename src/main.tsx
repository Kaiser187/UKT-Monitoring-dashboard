import React from 'react';
import dom from 'react-dom/client';
import "../css/main.css";
import {Logo, Time} from "./components/header.js";
import Weather from './components/weather.js'
import Forecast from './components/forecast.js'
import { forecast, weather} from "./Data.js";
import BusAbfahrtenTabelle from "./components/BusPlan.js";
import V1Api from "./services/api.js";
import URI from "urijs";
import BusTimeTable from "./components/bus-time-table.js";

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
            {/*<div className="main-weather card">*/}
            {/*    <Weather weather={weather}/>*/}
            {/*</div>*/}

            {/*<CurrentWeatherCard />*/}
            <div className="main-forecast card">
                <h1 className="forecast-header">Vorhersage</h1>
                {forecast.map(forecast => <Forecast forecast={forecast}/>)}
            </div>

            <BusTimeTable />
            {/*<section id="main-busstops">*/}
            {/*    <BusAbfahrtenTabelle line="16" from="Weilerhalde" direction="HBF" times={[*/}
            {/*        "2025-11-07T10:30:00+01:00",*/}
            {/*        "2025-11-07T11:30:00+01:00",*/}
            {/*        "2025-11-07T12:30:00+01:00"*/}
            {/*    ].map(str => new Date(str))}/>*/}
            {/*    <BusAbfahrtenTabelle line="8" from="Hagellocherweg" direction="Hagelloch" times={[*/}
            {/*        "2025-11-07T10:00:00+01:00",*/}
            {/*        "2025-11-07T11:00:00+01:00",*/}
            {/*        "2025-11-07T13:10:00+01:00"*/}
            {/*    ].map(str => new Date(str))}/>*/}
            {/*</section>*/}
        </div>
    )
}