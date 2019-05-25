import { readdirSync, statSync } from "fs";
import { join } from "path";


function* recursiveDirFiles(dir: string): IterableIterator<string> {
    const items = readdirSync(dir).map(f => join(dir, f));
    yield* items.filter(item => statSync(item).isFile());

    for (let subDir of items.filter(item => statSync(item).isDirectory())) {
        yield* recursiveDirFiles(subDir);
    }
}

Array.from(recursiveDirFiles(__dirname)).forEach(i => console.log(i));