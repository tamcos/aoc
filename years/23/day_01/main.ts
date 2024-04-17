#!/usr/bin/env -S deno run --allow-read
import { takeFirstLast } from 'tools/take_first_last.ts';
import { isDefined } from 'tools/is_defined.ts';

// Things for the first part
function getAllDigits(string: string) {
	return (string.match(/\d/g) ?? []).filter(isDefined).map(Number);
}

// Things for the second part
class SpelledDigits {
	static spelledDigitRe = /one|two|three|four|five|six|seven|eight|nine/;
	// Like {one: 1, two: 2, ..., nine: 9}
	static spelledDigitToNumber = Object.fromEntries(
		this.spelledDigitRe.source.split('|').map((k, i) => [k, 1 + i]),
	);
}

function getAllDigitsWithSpelled(string: string) {
	const allDigitsRe = new RegExp(
		// Extend to include spelled digits
		`\d|${SpelledDigits.spelledDigitRe.source}`,
		'g',
	);
	const allDigits: number[] = [];
	while (true) {
		// Get the first match and update `allDigitsRe` state
		const match = allDigitsRe.exec(string);
		if (!isDefined(match)) break;
		const { 0: d, index } = match;
		allDigits.push(SpelledDigits.spelledDigitToNumber[d] ?? Number(d));
		// Handle overlapping spelled numbers like "oneight"
		// by starting right after the previous match
		allDigitsRe.lastIndex = index + 1;
	}
	return allDigits;
}

// Thigns for both parts
function getCalibrationValue(ds: number[]) {
	return Number(takeFirstLast(ds).join(''));
}
// ---

const input = await Deno.readTextFile('input');
const inputLines = input.split('\n');

const part1 = inputLines
	.map((l) => getCalibrationValue(getAllDigits(l)))
	.reduce((a, b) => a + b, 0);
console.log('Part 1', part1);

const part2 = inputLines
	.map((l) => getCalibrationValue(getAllDigitsWithSpelled(l)))
	.reduce((a, b) => a + b, 0);
console.log('Part 2', part2);
