import { assertExists } from 'https://deno.land/std@0.222.1/assert/mod.ts';

export const assertExistsExpr = function assertExistsExpr<T>(
	...[actual, ...rest]: Parameters<typeof assertExists<T>>
): NonNullable<typeof actual> {
	assertExists(actual, ...rest);
	// Return `actual` if it exists
	return actual;
};
