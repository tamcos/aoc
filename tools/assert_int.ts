import { assert } from 'https://deno.land/std@0.222.1/assert/assert.ts';

export function assertInt(x: number) {
	assert(Number.isInteger(x), `Expected \`x\` to be an int, received: ${x}`);
}
