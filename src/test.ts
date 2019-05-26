import { recursiveDirFiles } from "./modules";
import { readFileSync } from "fs";

const items = Array.from(recursiveDirFiles("/Users/alan/workspace/projects/JavaScriptBoilerplates/src"))
    .map(f => ({ content: readFileSync(f, { encoding: "utf8" }), path: f }));
console.log(JSON.stringify(items));
