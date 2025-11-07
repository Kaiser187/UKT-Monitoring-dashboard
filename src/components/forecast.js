import React from "react";
import GetWeatherIcon from "./weatherIcon.js";
export default function Forecast({ forecast }) {
    return (React.createElement("div", { className: "forecast" },
        React.createElement("div", { className: "forecast-days" },
            React.createElement("div", { className: "forecast-day" },
                React.createElement("p", null, `Tag: ${forecast.day}`),
                React.createElement(GetWeatherIcon, { weather: forecast }),
                React.createElement("p", null,
                    forecast.temperature,
                    "C\u00B0")))));
}
