import uri from 'urijs';
import React from "react";

export const MAX_BUS_ENTRIES = 5;

export abstract class Api {
	readonly #baseUri: uri;

	protected constructor(baseUri: uri) {
		this.#baseUri = baseUri;
	}

	get baseUri(): uri {
		return uri(this.#baseUri.toString());
	}

	private async fetch(endpoint: string | uri | URL, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', headers: Record<string, string> = {}, body?: any): Promise<Response> {
		const endpoint_parsed = uri(endpoint)
		const url = endpoint instanceof URL ? endpoint : (typeof endpoint == 'string' ? new URL(this
			.baseUri
			.path(`${this.baseUri.pathname()}/./${endpoint_parsed.path()}`)
			.query(endpoint_parsed.query(true))
			.normalizePathname()
			.toString()) : new URL(endpoint.toString()));

		return await fetch(url, {
			method,
			headers: {...headers},
			body
		});
	}

	async fetchVoid(endpoint: string | uri | URL, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', headers: Record<string, string> = {}, body?: any): Promise<void> {
		return await this.fetch(endpoint, method, headers, body)
			.then(async res => {
				if (!res.ok)
					throw new Error(`Failed to fetch: ${res.statusText}`);

				const reader = res.body!.getReader();
				while (true) if (await reader.read().then(res => res.done)) break;
			});
	}

	async fetchBlob(endpoint: string | uri | URL, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', headers: Record<string, string> = {}, body?: any): Promise<Blob> {
		return await this.fetch(endpoint, method, headers, body)
			.then(res => res.blob());
	}

	async fetchText(endpoint: string | uri | URL, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', headers: Record<string, string> = {}, body?: any): Promise<string> {
		return await this.fetch(endpoint, method, headers, body)
			.then(res => res.text());
	}

	async fetchJson<T>(endpoint: string | uri | URL, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', headers: Record<string, string> = {}, body?: any): Promise<T> {
		return await this.fetch(endpoint, method, Object.assign({}, headers, {
			'content-type': 'application/json',
			'accept': 'application/json'
		}), JSON.stringify(body))
			.then(res => res.json());
	}
}

export default class V1Api extends Api {
	constructor(baseUri: uri) {
		super(baseUri);
	}

	async version(): Promise<ApiVersion> {
		return this.fetchJson("/version")
	}

	async config(): Promise<Config> {
		return this.fetchJson("/config");
	}

	async buses(limit: number = 50): Promise<Record<StopName, LineTimes[]>> {
		return await this.fetchJson<BusResponse>(`/buses?${new URLSearchParams({limit: limit.toString()})}`)
			.then(res => res.stops)
			.then(stops => Object.fromEntries(Object.entries(stops)
				.map(([key, value]) => [value[0].stop, value
					.slice(0, MAX_BUS_ENTRIES)
					.map(arrival => ({
						direction: arrival.direction,
						stop: arrival.stop,
						line: arrival.line,
						expectedArrival: new Date(arrival.expectedArrival)
					} satisfies LineTimes))])));
	}

	async weatherNow(): Promise<WeatherType> {
		return await this.fetchJson<CurrentResponse>("/current")
			.then(res => ({
				day: new Date(res.time.secs_since_epoch * 1000),
				isDay: res.is_day,
				code: res.current.code,
				temperature: res.current.temperature,
				humidity: res.current.humidity,
				windspeed: res.current.wind_speed,
				weather: res.current.weather,
				city: res.city
			}) satisfies WeatherType)
	}

	async weatherForecast(): Promise<Forecast[]> {
		return await this.fetchJson<ForecastResponse>("/forecast")
			.then(res => res.forecast.map((day, a) => ({
				day: new Date(res.time.secs_since_epoch * 1000 + (3_600_000 * 24) * (a + 1)),
				isDay: true,
				code: day.code,
				weather: day.weather,
				temperature: day.temperature,
			}) satisfies Forecast));
	}

	cached(): Unified {
		return new Unified(this);
	}
}

export interface ApiVersion {
	service: "Azubitafel API",
	version: `${number}.${number}.${number}`
}

type Milliseconds = number;

export interface Config {
	bind: {
		socket: string
	},

	weather: {
		latitude: number,
		longitude: number,

		forecast_days?: number,

		config: any,

		timezone?: string,
	},

	departure: {
		point: string
	}[],

	app: {
		refreshInterval: Milliseconds
	}
}

export interface BusResponse {
	stops: Record<string, {
		direction: string,
		line: string,
		stop: string,
		expectedArrival: string
	}[]>
}

export type StopName = string;
export type StopId = string;

export interface LineTimes {
	direction: string,
	stop: StopName,
	line: string
	expectedArrival: Date,
}

interface ForecastResponse {
	time: { secs_since_epoch: number, nanos_since_epoch: number },
	city: string,
	is_day: boolean,
	forecast: {
		wind_speed: number,
		precipitation: number,
		temperature: number,
		weather: string
		code: number,
	}[]
}

interface CurrentResponse {
	time: { secs_since_epoch: number, nanos_since_epoch: number },
	city: string,
	is_day: boolean,
	current: {
		wind_speed: number,
		precipitation: number,
		temperature: number,
		humidity: number,
		weather: string,
		code: number
	}
}

export interface WeatherType {
	isDay: boolean,
	city: string;
	windspeed: number;
	humidity: number;
	day: Date;
	code: number;
	weather: string;
	temperature: number;
}

export interface Forecast {
	day: Date,
	isDay: boolean,
	code: number,
	weather: string,
	temperature: number
}

export class Unified {
	#api: V1Api;
	#cache: UnifiedResponse;
	#onChange: Array<(unified: UnifiedResponse) => any> = [];

	constructor(api: V1Api) {
		this.#api = api;
	}

	private async unified(): Promise<UnifiedResponse> {
		return Object.fromEntries(await Promise.all([
			this.#api.config().then(config => ['config', config]),
			this.#api.version().then(version => ['version', version]),
			this.#api.weatherNow().then(weather => ['weather', weather]),
			this.#api.weatherForecast().then(forecast => ['forecast', forecast]),
			this.#api.buses().then(buses => ['buses', buses]),
		]))
	}

	useValue<T>(onChange: (unified: UnifiedResponse) => T): T {
		const [state, setState] = React.useState(onChange(this.#cache));

		this.#onChange.push(unified => setState(onChange(unified)));

		return state;
	}

	async kickstart() {
		await this.unified()
			.then(unified => {
				this.#cache = unified;
				setInterval(async () => {
					this.#cache = await this.unified();
					for (const fn of this.#onChange.splice(0, this.#onChange.length))
						fn(this.#cache);
				}, unified.config.app.refreshInterval);
			});
	}
}

export interface UnifiedResponse {
	config: Config,
	version: ApiVersion,
	weather: WeatherType,
	forecast: Forecast[],
	buses: Record<string, LineTimes[]>
}
