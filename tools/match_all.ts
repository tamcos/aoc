import { isDefined } from 'tools/is_defined.ts';

// It's like the String#matchAll
// but doesn't create a local copy of `re`
export function* matchAll(string: string, re: RegExp) {
	let match: ReturnType<typeof re['exec']>;
	while (isDefined(match = re.exec(string))) yield match;
}
