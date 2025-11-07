import React from "react";
import GetWeatherIcon from "./weatherIcon.js";
export default function Weather({ weather }) {
    return (React.createElement(React.Fragment, null,
        React.createElement("h1", { className: "city" }, weather.city),
        React.createElement("p", { className: "temperature" },
            weather.temperature,
            "\u00B0C"),
        React.createElement("div", { className: "icon" },
            React.createElement(GetWeatherIcon, { weather: weather })),
        React.createElement("div", { className: "humidity" },
            React.createElement("div", { className: "details-humidity-name" },
                React.createElement("p", null, "Humidity:")),
            React.createElement("div", { className: "details-humidity-data" },
                React.createElement("p", null,
                    weather.humidity,
                    "%"))),
        React.createElement("div", { className: "windspeed" },
            React.createElement("div", { className: "details-windspeed-name" },
                React.createElement("p", null, "Wind Speed:")),
            React.createElement("div", { className: "details-windspeed-data" },
                React.createElement("p", null,
                    weather.windspeed,
                    " kmh")))));
}
