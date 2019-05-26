import { readdirSync, statSync, existsSync } from "fs";
import { join, dirname, resolve } from "path";


export function* recursiveDirFiles(dir: string): IterableIterator<string> {
    if (!existsSync(dir)) {
        console.warn(`NO DIRECTORY ${dir}`);
        return;
    }
    const items = readdirSync(dir).map(f => join(dir, f));
    yield* items.filter(item => statSync(item).isFile());

    for (let subDir of items.filter(item => statSync(item).isDirectory())) {
        yield* recursiveDirFiles(subDir);
    }
}

/**
 * get current script executed directory
 */
export function pwdByExecScriptFilePath(): string {
    if (process.argv[1] && existsSync(process.argv[1])) {
        return dirname(process.argv[1]);
    }
    return __dirname;
}

export function absPath(inDir: string): string {
    return resolve(inDir || "");
}