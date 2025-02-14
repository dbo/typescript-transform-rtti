import { readFileSync } from "node:fs";
import { isAbsolute, join } from "node:path";

export function readTestFile(path: string, skipFirstLines = 0): string[] {
    if (!isAbsolute(path)) {
        path = join(__dirname, ...path.split("/"));
    }
    const str = String(readFileSync(path));
    const lines = str.split("\n");
    while (skipFirstLines--) {
        lines.shift();
    }
    return lines;
}
