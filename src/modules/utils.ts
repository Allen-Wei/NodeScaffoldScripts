import { dirname } from "path";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { render as mustacheRender } from "mustache";

export function print(line: string, color: string = undefined): void {
    log(line);
}
export function getPrinter(prefix: string): Function {
    return function (line: string): void {
        log(`[${prefix}] ${line}`);
    };
}
export function log(...args: any[]): void {
    console.log.apply(this, args);
}
export function debug(...args: any[]): void {
    console.debug.apply(this, args);
}
export function render(template: string, vm: any): string {
    return mustacheRender(template, vm);
}
export function renderDir(vm: any, files: Array<TemplateFile>): { success: boolean, message?: string } {
    for (let file of files) {
        const print = getPrinter(file.path);
        const dirPath = dirname(file.path);
        if (!existsSync(dirPath)) {
            print(`create directory ${dirPath}`);
            mkdirSync(dirPath, { recursive: true });
        }
        const content = render(file.template, { ...file.vm, ...vm })
        print(`write content(${content.length} bytes) to file`);
        writeFileSync(file.path, content, { encoding: "utf8" });
    }
    return { success: true };
}