import React from "react";

export default function useRepeated<T>(callback: () => Promise<T>, interval: number): Awaited<T> | null {
	const [state, setState] = React.useState<Awaited<T> | null>(null);

	React.useEffect(() => {
		callback().then(res => setState(res as Awaited<T>));

		const int = setInterval(() => callback().then(res => setState(res as Awaited<T>)), interval);

		return () => clearInterval(int);
	}, []);

	return state;
}