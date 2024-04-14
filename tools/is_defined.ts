export function isDefined<T>(param: T): param is NonNullable<T> {
	return param !== null && param !== undefined;
}
