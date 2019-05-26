import { print, debug, autoGetArgs, renderDir } from "./modules";
import { join, resolve as absPath } from "path";

const templateDir = "./templates/shelljs/";
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

if (Object.keys(args).length === 0 || args["--help"]) {
    showHelp();
} else {
    renderDir({ projectName: "test" }, templFiles.map(item => {
        item.path = join(getTargetDirectory(), item.path);
        return item;
    }));
}


function showHelp(): void {
    const commandPrefix = "node shelljs.js";
    print(`
Usage: ${commandPrefix} [opitons]
选项: 
    --help          显示帮助信息
    --project-name  项目名称
    --directory     代码生成目录, 默认当前目录

例子:
    ${commandPrefix} --project-name my-project --directory ./my-dir
`);
}

function getTargetDirectory() {
    return absPath((args["--directory"] || "").toString());
}