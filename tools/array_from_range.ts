import { assertGreaterOrEqual } from 'https://deno.land/std@0.222.1/assert/assert_greater_or_equal.ts';

export function arrayFromRange(from: number, to: number) {
	assertGreaterOrEqual(to, from);
	// Range is inclusive, so we need to increase the diff by one
	return new Array(1 + (to - from)).fill(from).map((i, j) => i + j);
}
