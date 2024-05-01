import { pred } from 'tools/pred.ts';
import { succ } from 'tools/succ.ts';

export interface Point {
	x: number;
	y: number;
}
export interface PointWithBounds extends Point {
	xBound: number;
	yBound: number;
}
export function getAdjPoints(
	{ xBound, yBound, ...point }: PointWithBounds,
): Point[] {
	// Adjacent points (with diagonal points) to the start point
	const adjPoints: Point[] = [];
	const yEnd = succ(point.y, yBound);
	const xEnd = succ(point.x, xBound);
	for (let y = pred(point.y, 0); y < yBound && y <= yEnd; ++y) {
		for (let x = pred(point.x, 0); x < xBound && x <= xEnd; ++x) {
			// Omit the starting point
			if (x === point.x && y === point.y) continue;
			adjPoints.push({ x, y });
		}
	}
	return adjPoints;
}
