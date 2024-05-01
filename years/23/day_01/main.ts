#!/usr/bin/env -S deno run --allow-read --allow-hrtime
import { isDefined } from 'tools/is_defined.ts';
import { takeFirstLast } from 'tools/take_first_last.ts';
import { add } from 'tools/add.ts';
import { matchAll } from 'tools/match_all.ts';

// Things for the first part
function getAllDigits(string: string) {
	return [...string.matchAll(/\d/g)]
		.filter(isDefined)
		.map(Number);
}

// Things for the second part
class SpelledDigits {
	static spelledDigitRe = /one|two|three|four|five|six|seven|eight|nine/;
	// Like {one: 1, two: 2, ..., nine: 9}
	static spelledDigitToNumber = Object.fromEntries(
		this.spelledDigitRe.source
			.split('|')
			.map((k, i) => [k, 1 + i]),
	);
}
function getAllDigitsWithSpelled(string: string) {
	const allDigitsRe = new RegExp(
		// Extend to include spelled digits
		String.raw`\d|${SpelledDigits.spelledDigitRe.source}`,
		'g',
	);
	return matchAll(string, allDigitsRe)
		// @ts-expect-error https://github.com/microsoft/TypeScript/issues/54481
		.map(({ 0: d, index: startIndex }: RegExpExecArray) => {
			allDigitsRe.lastIndex = 1 + startIndex;
			return SpelledDigits.spelledDigitToNumber[d] ?? Number(d);
		})
		.toArray() as number[];
}

// Things for both parts
function getCalibrationValue(ds: number[]) {
	return Number(takeFirstLast(ds).join(''));
}
// ---
const input = await Deno.readTextFile('input');
const inputLines = input.split('\n');

const part1 = add(
	...inputLines.map((l) => getCalibrationValue(getAllDigits(l))),
);
console.log('Part 1', part1);

const part2 = add(
	...inputLines.map((l) => getCalibrationValue(getAllDigitsWithSpelled(l))),
);
console.log('Part 2', part2);
