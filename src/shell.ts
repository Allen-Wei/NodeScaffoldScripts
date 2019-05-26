import { print, debug, autoGetArgs, pwd, renderDir, recursiveDirFiles } from "./modules";
import { readdirSync, existsSync, statSync } from "fs";
import { join, resolve as absPath } from "path";
import { pathToFileURL } from "url";

const templateDir = "./templates/shell/";
const templFiles: Array<TemplateFile> = [{
    path: "package.json",
    template: require(`${templateDir}package.json.tmpl`).default
}, {
    path: "tsconfig.json",
    template: require(`${templateDir}tsconfig.json.tmpl`).default
}, {
    path: "src/run.ts",
    template: require(`${templateDir}src/run.ts.tmpl`).default
}];

const args = autoGetArgs();
debug("Input parameters: ", args);

if (args.size === 0 || args.get("--help")) {
    showHelp();
} else {
    renderDir({ projectName: "test" }, templFiles.map(item => {
        debug(item.path);
        item.path = join(getTargetDirectory(), item.path);
        debug(item.path);
        return item;
    }));
}


function showHelp(): void {
    const commandPrefix = "node shell.js";
    print(`
Usage: ${commandPrefix} [opitons]
选项: 
    --help          显示帮助信息
    --project-name  项目名称
    --directory     代码生成目录, 默认当前目录

例子:
    ${commandPrefix} -project-name my-project -directory ./my-dir
`);
}

function getTargetDirectory() {
    return absPath((args.get("--directory") || "").toString());
}