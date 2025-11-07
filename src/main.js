import React from 'react';
import dom from 'react-dom/client';
import "../css/main.css";
import { Logo, Time } from "./components/header.js";
import Weather from './components/weather.js';
import Forecast from './components/forecast.js';
import { forecast, weather } from "./Data.js";
import BusAbfahrtenTabelle from "./components/BusPlan.js";
dom.createRoot(document.querySelector("#root"))
    .render(React.createElement(App, null));
export function App() {
    return (React.createElement("div", { className: "main-content" },
        React.createElement("div", { className: "main-header" },
            React.createElement("div", { className: "main-Logo" },
                React.createElement(Logo, null)),
            React.createElement("div", { className: "main-Logo" },
                React.createElement(Time, null))),
        React.createElement("div", { className: "main-weather card" },
            React.createElement(Weather, { weather: weather })),
        React.createElement("div", { className: "main-forecast card" },
            React.createElement("h2", { className: "forecast-header" }, "5-Day Forecast"),
            forecast.map(forecast => React.createElement(Forecast, { forecast: forecast }))),
        React.createElement("section", { id: "main-busstops" },
            React.createElement(BusAbfahrtenTabelle, { line: "16", direction: "HBF", times: [
                    "2025-11-07T10:30:00+01:00",
                    "2025-11-07T11:30:00+01:00",
                    "2025-11-07T12:30:00+01:00"
                ].map(str => new Date(str)) }),
            React.createElement(BusAbfahrtenTabelle, { line: "8", direction: "Hagelloch", times: [
                    "2025-11-07T10:00:00+01:00",
                    "2025-11-07T11:00:00+01:00",
                    "2025-11-07T12:00:00+01:00"
                ].map(str => new Date(str)) }))));
}
