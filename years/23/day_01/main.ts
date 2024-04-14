#!/usr/bin/env -S deno run --allow-read
import { takeFirstLast } from 'tools/take_first_last.ts';
import { assertExistsExpr } from 'tools/assert_exists_expr.ts';
import { isDefined } from 'tools/is_defined.ts';

const input = await Deno.readTextFile('input');

const part1 = getCalibrationValuesSum(input, parseInputPart1);
console.info('Part 1', part1);

const part2 = getCalibrationValuesSum(input, parseInputPart2);
console.info('Part 2', part2);

function parseInputPart1(input: string) {
	const allDigitsRe = /\d/g;

	return input.split('\n').map((l) => assertExistsExpr(l.match(allDigitsRe)));
}

function parseInputPart2(input: string) {
	const allDigitsRe = /\d|one|two|three|four|five|six|seven|eight|nine/g;

	const spelledToValue = Object.fromEntries(
		allDigitsRe.source.split('|').slice(1).map((d, i) => [d, 1 + i]),
	);
	const allDigits: (string | number)[][] = [];

	for (const line of input.split('\n')) {
		const digits: typeof allDigits[number] = [];

		while (true) {
			const match = allDigitsRe.exec(line);
			if (!isDefined(match)) break;

			const { 0: d, index } = match;
			digits.push(spelledToValue[d] ?? d);
			// Handle overlapping spelled numbers like 'oneight'
			allDigitsRe.lastIndex = index + 1;
		}
		allDigits.push(digits);
	}
	return allDigits;
}

function getCalibrationValuesSum(
	input: string,
	parseInput: (input: string) => (string | number)[][],
) {
	return parseInput(input)
		.map((ns) => Number(takeFirstLast(ns).join('')))
		.reduce((a, b) => a + b, 0);
}
