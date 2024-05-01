import { assertInt } from 'tools/assert_int.ts';

export function succ(x: number, xBound = Number.MAX_SAFE_INTEGER) {
	assertInt(x);
	return Math.min(1 + x, xBound);
}
