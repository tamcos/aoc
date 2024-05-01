#!/usr/bin/env -S deno run --allow-read
import { getAdjPoints, type Point } from 'tools/get_adj_points.ts';
import { assertExistsExpr } from 'tools/assert_exists_expr.ts';
import { isDefined } from 'tools/is_defined.ts';
import { add } from 'tools/add.ts';
import { arrayFromRange } from 'tools/array_from_range.ts';
import { matchAll } from 'tools/match_all.ts';

// Things for the first part
function getNumbersAdjToSymbol(lines: string[]) {
	const allNumbersRe = /\d+/g;
	const adjNumbers: number[] = [];
	for (const [y, line] of lines.entries()) {
		for (const match of matchAll(line, allNumbersRe)) {
			// Take the range of indexes that the match spans
			const xs = arrayFromRange(match.index, allNumbersRe.lastIndex - 1);
			const [n] = match;
			// Check if some part of the matched number
			// is adjacent to the symbol
			if (xs.some((x) => isAdjToSymbol({ x, y }, lines))) {
				adjNumbers.push(Number(n));
			}
		}
	}
	return adjNumbers;
}

// Things for the second part
function isGearSymbol(c: string) {
	return c === '*';
}
function getGearNumbers(lines: string[]) {
	const allNumbersRe = /\d+/g;
	const gearSymbolNumbers = new Map<string, number[]>();
	for (const [y, line] of lines.entries()) {
		for (const match of matchAll(line, allNumbersRe)) {
			// Take the range of indexes that the match spans
			const xs = arrayFromRange(match.index, allNumbersRe.lastIndex - 1);
			const [n] = match;
			for (const x of xs) {
				const adjSymbols = Object.entries(
					getAdjSymbols({ x, y }, lines),
				)
					.filter(([, s]) => isGearSymbol(s));
				for (const [point] of adjSymbols) {
					console.log(point, n);
					gearSymbolNumbers.set(
						point,
						(gearSymbolNumbers.get(point) ?? []).concat(Number(n)),
					);
				}
			}
		}
	}
	return gearSymbolNumbers
		.values()
		// @ts-expect-error TODO
		.filter((ns: number[]) => ns.length === 2)
		.toArray() as number[];
}

// Things for the both parts
function isSymbol(c: string) {
	return c !== '.' && !/\d/.test(c);
}
function getAdjSymbols(point: Point, lines: string[]) {
	const yBound = lines.length;
	// We assume that all lines are of the same length
	// and there is at least one line
	const xBound = assertExistsExpr(lines.at(0)?.length);
	// Like {'2,4': '*', '4,2': '@', ...}
	return Object.fromEntries(
		getAdjPoints({ ...point, xBound, yBound })
			.filter(({ x, y }) => isSymbol(lines[y][x]))
			.map(({ x, y }) => [`${x},${y}`, lines[y][x]] as const),
	);
}

function isAdjToSymbol(...params: Parameters<typeof getAdjSymbols>) {
	const adjSymbols = getAdjSymbols(...params);
	return Object.keys(adjSymbols).length > 0;
}
// ---
const input = await Deno.readTextFile('input');
const inputLines = input.split('\n');

// const part1 = add(...getNumbersAdjToSymbol(inputLines));
// console.log('Part 1', part1);

console.log(getGearNumbers(inputLines));

// const part2 = add(...getGearNumbers(inputLines).map(([x, y]) => x * y));
// console.log('Part 2', part2);
