export function sum(...ns: number[]) {
	return ns.reduce((a, b) => a + b, 0);
}
