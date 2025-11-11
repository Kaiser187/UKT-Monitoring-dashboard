import {WeatherType} from "./components/weather.js";

export const weather: WeatherType = {
    isDay: false,
    city: "Tübingen",
    temperature: 15.5,
    humidity: 30,
    code: "55",
    windspeed: 25,
    day: 0,
}
export const forecast: WeatherType[] = [{
    isDay: true,
    city: 'Tübingen',
    windspeed: 0,
    humidity: 0,
    day: 1,
    code: '00',
    temperature: 10
}, {
    isDay: true,
    city: 'Tübingen',
    windspeed: 0,
    humidity: 0,
    day: 2,
    code: '74',
    temperature: 8
}, {
    isDay: true,
    city: 'Tübingen',
    windspeed: 0,
    humidity: 0,
    day: 3,
    code: '23',
    temperature: 4
}, {
    isDay: true,
    city: 'Tübingen',
    windspeed: 0,
    humidity: 0,
    day: 4,
    code: '12',
    temperature: 6
}, {
    isDay: true,
    city: 'Tübingen',
    windspeed: 0,
    humidity: 0,
    day: 5,
    code: '03',
    temperature: 12
}];