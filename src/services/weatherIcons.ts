// ☀️ & 🌙 Grundzustände
import clearDay from "../../assets/icons/clear-day.svg";
import clearNight from "../../assets/icons/clear-night.svg";
import partlyCloudyDay from "../../assets/icons/partly-cloudy-day.svg";
import partlyCloudyNight from "../../assets/icons/partly-cloudy-night.svg";
import cloudy from "../../assets/icons/cloudy.svg";

// 🌫 Nebel / Staub
import fogDay from "../../assets/icons/fog-day.svg";
import fogNight from "../../assets/icons/fog-night.svg";
import dust from "../../assets/icons/dust.svg";
import dustWind from "../../assets/icons/dust-wind.svg";

// 🌦 Niederschlag
import drizzle from "../../assets/icons/drizzle.svg";
import rain from "../../assets/icons/rain.svg";
import sleet from "../../assets/icons/sleet.svg";

// 🌨 Schnee & Eis
import snow from "../../assets/icons/snow.svg";
import hail from "../../assets/icons/hail.svg";

// ⚡ Gewitter / Hagel / Tornado
import thunderstorms from "../../assets/icons/thunderstorms.svg";
import thunderstormsRain from "../../assets/icons/thunderstorms-rain.svg";
import tornado from "../../assets/icons/tornado.svg";


export default function getWeatherIconPath(weather: { isDay: boolean, code: number }) {
    console.log(weather);

    if (weather.isDay == true) {
        const weatherMap = {
            // 🌤 Klar & leicht bewölkt
            "00": clearDay,
            "01": partlyCloudyDay,
            "02": cloudy,
            "03": cloudy,

            // 🌫 Dunst, Rauch, Staub
            "04": dust,
            "05": dust,
            "06": dust,
            "07": dustWind,
            "08": dustWind,
            "09": dustWind,

            // 🌫 Nebel / Eisnebel
            "10": fogDay,
            "11": fogDay,
            "12": fogDay,
            "13": fogDay,
            "14": fogDay,
            "15": fogDay,
            "16": fogDay,

            // ⚡ Gewitter
            "17": thunderstorms,
            "95": thunderstorms,
            "96": thunderstormsRain,
            "97": thunderstormsRain,
            "98": thunderstormsRain,
            "99": thunderstormsRain,

            // 🌦 Nieselregen / leichter Regen
            "20": drizzle,
            "21": drizzle,
            "24": drizzle,
            "25": drizzle,
            "26": drizzle,
            "27": drizzle,

            // 🌧 Regen
            "22": rain,
            "23": sleet,
            "28": rain,
            "60": rain,
            "61": rain,
            "62": rain,
            "63": rain,
            "64": rain,
            "65": rain,

            // 🌨 Schnee
            "70": snow,
            "71": snow,
            "72": snow,
            "73": snow,
            "74": snow,
            "75": snow,
            "76": snow,
            "77": snow,

            // 🌧❄ Gemischt (Regen + Schnee)
            "68": sleet,
            "69": sleet,
            "90": sleet,
            "91": sleet,
            "92": sleet,

            // 💨 Staub- / Sandstürme
            "30": dustWind,
            "31": dustWind,
            "32": dustWind,
            "33": dustWind,
            "34": dustWind,
            "35": dustWind,
            "36": dustWind,
            "37": dustWind,

            // 🌪 Tornado / Trichter
            "38": tornado,
            "39": tornado,

            // 🌦 Schauer allgemein
            "50": rain,
            "51": rain,
            "52": rain,
            "53": rain,
            "54": rain,
            "55": rain,
            "56": rain,
            "57": rain,
            "58": rain,
            "80": rain,
            "81": rain,
            "82": rain,
            "83": rain,
            "84": rain,

            // 🌩 Hagel
            "93": hail,
            "94": hail,
        };

        return weatherMap[String(weather.code)] || cloudy;

    } else if (weather.isDay == false) {
        const weatherMap = {
            // 🌙 Nachtvarianten
            "00": clearNight,
            "01": partlyCloudyNight,
            "02": cloudy,
            "03": cloudy,

            // 🌫 Dunst, Rauch, Staub
            "04": dust,
            "05": dust,
            "06": dust,
            "07": dustWind,
            "08": dustWind,
            "09": dustWind,

            // 🌫 Nebel
            "10": fogNight,
            "11": fogNight,
            "12": fogNight,
            "13": fogNight,
            "14": fogNight,
            "15": fogNight,
            "16": fogNight,

            // ⚡ Gewitter
            "17": thunderstorms,
            "95": thunderstorms,
            "96": thunderstormsRain,
            "97": thunderstormsRain,
            "98": thunderstormsRain,
            "99": thunderstormsRain,

            // 🌦 Nieselregen / leichter Regen
            "20": drizzle,
            "21": drizzle,
            "24": drizzle,
            "25": drizzle,
            "26": drizzle,
            "27": drizzle,

            // 🌧 Regen
            "22": rain,
            "23": sleet,
            "28": rain,
            "60": rain,
            "61": rain,
            "62": rain,
            "63": rain,
            "64": rain,
            "65": rain,

            // 🌨 Schnee
            "70": snow,
            "71": snow,
            "72": snow,
            "73": snow,
            "74": snow,
            "75": snow,
            "76": snow,
            "77": snow,

            // 🌧❄ Gemischt
            "68": sleet,
            "69": sleet,
            "90": sleet,
            "91": sleet,
            "92": sleet,

            // 💨 Staub- / Sandstürme
            "30": dustWind,
            "31": dustWind,
            "32": dustWind,
            "33": dustWind,
            "34": dustWind,
            "35": dustWind,
            "36": dustWind,
            "37": dustWind,

            // 🌪 Tornado
            "38": tornado,
            "39": tornado,

            // 🌦 Schauer
            "50": rain,
            "51": rain,
            "52": rain,
            "53": rain,
            "54": rain,
            "55": rain,
            "56": rain,
            "57": rain,
            "58": rain,
            "80": rain,
            "81": rain,
            "82": rain,
            "83": rain,
            "84": rain,

            // 🌩 Hagel
            "93": hail,
            "94": hail,
        };

        return weatherMap[String(weather.code)] || cloudy;
    }

}