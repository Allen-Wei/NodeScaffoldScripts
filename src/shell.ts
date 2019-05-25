import { print, debug, autoGetArgs, pwd, renderDir, recursiveDirFiles } from "./modules";
import { readdirSync } from "fs";
import { join } from "path";

const templateDir = "./templates/shell/";
const targetDir = join(pwd(), "../dist", "shell");
const templFiles: Array<TemplateFile> = [{
    path: join(targetDir, "package.json"),
    template: require(`${templateDir}package.json.tmpl`).default
}];

const args = autoGetArgs();
debug("Input parameters: ", args);

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

if (args.size === 0 || args.get("--help")) {
    showHelp();
} else {
    renderDir({ projectName: "test" }, templFiles);
    // renderDir({
    //     projectName: ""
    // }, [{
    //     path: 
    // }])
}