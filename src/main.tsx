import React from 'react';
import dom from 'react-dom/client';
import "../css/main.css";

import {Logo, Time} from "./components/header.js";
import WeatherForecast from './components/weather-forecast.js'
import V1Api, {Unified} from "./services/api.js";
import URI from "urijs";
import BusTimeTable from "./components/bus-time-table.js";
import CurrentWeatherCard from "./components/current-weather-card.js";

const base = window.localStorage.getItem("API_BASE") || window.location.toString();
const api = new Unified(new V1Api(new URI(base)
    .path("/api/v1")));
export const API = React.createContext(api);

await api.kickstart();

dom.createRoot(document.querySelector("#root")!)
    .render(<API.Provider value={api}>
    <App/>
</API.Provider>);

export function App() {
    return <ThemeSwitcher>
        <div id="main-content">
            <div id="header">
                <Logo/>
                <Time/>
            </div>

            <CurrentWeatherCard />
            <WeatherForecast />

            <BusTimeTable />
        </div>
    </ThemeSwitcher>
}

export function ThemeSwitcher(props: React.PropsWithChildren<{}>) {
    const api = React.useContext(API);
    const unified = api.useValue(unified => ({
        isDay: unified.weather.isDay,
        colour: unified.config.app.colourScheme
    }));

    const scheme = React.useMemo(() => unified, [unified]);
    React.useEffect(() => ({
        "Inherit"() {
            let onChange, root = document.querySelector(":root");
            const watcher = window.matchMedia("(prefers-color-scheme: dark)");
            root.classList.toggle("dark", watcher.matches)
            watcher.addEventListener("change", onChange = () => root.classList.toggle("dark", watcher.matches));
            watcher.addEventListener("change", () => console.log(`Dark: ${watcher.matches}`));

            return () => watcher.removeEventListener("change", onChange);
        },
        "Weather"() {
            const root = document.querySelector(":root");
            root.classList.toggle("dark", !scheme.isDay);

            return () => root.classList.remove("dark");
        },
        "Light"() {
            const root = document.querySelector(":root");
            const wasDarkInitially = root.classList.contains("dark");
            root.classList.remove("dark");
            return () => root.classList.toggle("dark", wasDarkInitially);
        },
        "Dark"() {
            const root = document.querySelector(":root");
            const wasDarkInitially = root.classList.contains("dark");
            root.classList.add("dark");
            return () => root.classList.toggle("dark", wasDarkInitially);
        }
    } satisfies Record<typeof unified.colour, () => () => void>)[unified.colour](), [unified]);
    React.useEffect(() => console.log(`Changing to colour mode: ${unified.colour}`), [unified]);

    return <>
        {props.children}
    </>
}