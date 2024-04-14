import { assert } from 'https://deno.land/std@0.222.1/assert/mod.ts';

export function takeFirstLast<T>(arr: T[]) {
	assert(Object.hasOwn(Array.from(arr), 0));
	return [arr.at(0) as T, arr.at(-1) as T] as const;
}
