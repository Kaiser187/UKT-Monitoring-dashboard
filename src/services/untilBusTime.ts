import currentTime from "../services/time.js";

export default function GetTimeUntilBus(arrival: { times: Date[] }) {
    const nextDeparture = Array.isArray(arrival.times) && arrival.times.length > 0
        ? new Date(arrival.times[0])
        : null;

    if (!nextDeparture) return "00:00:00";

    const [cH, cM, cS] = currentTime().split(":").map(Number);

    const aH = nextDeparture.getHours();
    const aM = nextDeparture.getMinutes();

    const arrivalSec = aH * 3600 + aM * 60;
    const currentSec = cH * 3600 + cM * 60 + cS;

    let diff = arrivalSec - currentSec;
    if (diff < 0) diff += 24 * 3600;

    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    const seconds = diff % 60;

    const h = hours.toString().padStart(2, "0");
    const m = minutes.toString().padStart(2, "0");
    const s = seconds.toString().padStart(2, "0");

    return `${h}:${m}`;
}