import React from "react";

export default function useRepeated<T>(callback: () => T | Promise<T>, interval: number): Awaited<T> | null {
	const [state, setState] = React.useState<Awaited<T> | null>(null);

	React.useEffect(() => {
		Promise.resolve(callback())
			.then(res => setState(res));

		const int = setInterval(async () => setState(await callback() as Awaited<T>), interval);

		return () => clearInterval(int);
	}, []);

	return state;
}