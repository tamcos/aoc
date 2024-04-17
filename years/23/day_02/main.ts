#!/usr/bin/env -S deno run --allow-read
import { assert } from 'https://deno.land/std@0.222.1/assert/assert.ts';
import { sum } from 'tools/sum.ts';

// Things for the second part
function getFewestOfEachColor(gameValue: typeof parsedInputLines[number][1]) {
	return gameValue.reduce(
		(acc, [k, v]) => ({ ...acc, [k]: acc[k] < v ? v : acc[k] }),
		{ red: 0, green: 0, blue: 0 },
	);
}

// Things for the both parts
const REQUIREMENTS = { red: 12, green: 13, blue: 14 } as const;

function assertRequirementsKey(
	key: string,
): asserts key is keyof typeof REQUIREMENTS {
	assert(Object.hasOwn(REQUIREMENTS, key));
}
function parseInputLine(inputLine: string) {
	// Parse line like `Game id: 2 red, 10 green; 4 blue, ...`
	const [gameKey, gameValue] = inputLine.split(': ');
	const [, gameId] = gameKey.split(' ');
	// Parse `gameValue` into `[['red, 2], ['green', 10], ...]`
	// We don't need to distinguish between the cube sets
	const cubeSets = gameValue.split('; ').flatMap((cubeSet) =>
		cubeSet.split(', ').map((item) => {
			const [v, k] = item.split(' ');
			assertRequirementsKey(k);
			return [k, Number(v)] as const;
		})
	);
	return [Number(gameId), cubeSets] as const;
}
// ---
const input = await Deno.readTextFile('input');
const parsedInputLines = input.split('\n').map(parseInputLine);

const part1 = sum(
	...parsedInputLines
		.filter(([, cubes]) => cubes.every(([k, v]) => v <= REQUIREMENTS[k]))
		.map(([gameId]) => gameId),
);
console.log('Part 1', part1);

const part2 = sum(
	...parsedInputLines
		.map(([, cubes]) => getFewestOfEachColor(cubes))
		.map(({ red, green, blue }) => red * green * blue),
);
console.log('Part 2', part2);
