import { assertInt } from 'tools/assert_int.ts';

export function pred(x: number, bound = Number.MIN_SAFE_INTEGER) {
	assertInt(x);
	return Math.max(x - 1, bound);
}
