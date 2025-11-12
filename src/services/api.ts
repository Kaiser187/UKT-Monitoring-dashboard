import uri from 'urijs';

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

	async fetchJson(endpoint: string | uri | URL, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', headers: Record<string, string> = {}, body?: any): Promise<any> {
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

	async buses(limit: number = 50): Promise<Record<string, LineTimes>> {
		const buses: {
			line: string,
			direction: string,
			expectedArrival: string
		}[] = await this.fetchJson(`/buses?${new URLSearchParams({ limit: limit.toString() })}`)
			.then(res => res.lines);

		const line: Record<string, LineTimes> = {};
		for (const arrival of buses)
			if (arrival.line in line) {
				if (line[arrival.line].arrivals.length < 6)
					line[arrival.line].arrivals.push(new Date(arrival.expectedArrival));
			} else
				line[arrival.line] = {
					line: arrival.line,
					direction: arrival.direction,
					arrivals: [new Date(arrival.expectedArrival)]
				}

		return line;
	}
}

export interface ApiVersion {
	service: "Azubitafel API",
	version: `${number}.${number}.${number}`
}

export interface LineTimes {
	line: string,
	direction: string,
	arrivals: Date[]
}