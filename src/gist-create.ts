import { print, autoGetArgs, recursiveDirFiles, debug } from "./modules";
import { request } from "https"
import { resolve, join, basename } from "path";
import { statSync, existsSync, fstat, readFileSync, readdirSync } from "fs";

const SCRIPT_FILE_NAME = "gist-create.js";
const ARGS = autoGetArgs();

if (Object.keys(ARGS).length === 0 || ARGS["--help"]) {
    showHelp();
} else {
    createGist();
}

function createGist() {
    const files = reduceFiles(getGistFiles());
    const desc = ARGS["--description"],
        isPublic = ARGS["--public"];

    const data = {
        "description": typeof desc === "string" ? desc : "from gist-create.js",
        "public": typeof isPublic === "boolean" ? isPublic : false,
        "files": files
    };

    let req = request({
        hostname: "api.github.com",
        port: 443,
        path: "/gists",
        method: "POST",
        headers: {
            "User-Agent": "nodejs",
            "Content-Type": "application/json",
            Authorization: `token ${getToken()}`
        }
    }, res => {
        let resData = "";
        res.on("data", chunk => resData += chunk);
        res.on("end", () => {
            const response = JSON.parse(resData);
            if (res.statusCode === 201) {
                print(`create success: ${response.html_url}`);
                return;
            }
            print(JSON.stringify(response, null, "  "));
        })
        res.on("error", error => { throw error; });
    });

    req.write(JSON.stringify(data));
    req.end();
    debug("start create gist...");
}

function reduceFiles(files: string[]): { [key: string]: { content: string } } {
    return files.reduce((prev: { [key: string]: { content: string } }, next: string) => {
        let fileName = basename(next);
        if (prev[fileName]) {
            fileName = next.replace(/[\\/:?]/g, "_");
        }
        prev[fileName] = { content: readFileSync(next, { encoding: "utf8" }).toString() };
        debug(`read file ${next}, ${prev[fileName].content.length} bytes.`)
        return prev;
    }, {});
}

function getGistFiles(): string[] {
    //list files from input
    const filesSplitByComma = ARGS["--files"];
    if (typeof filesSplitByComma === "string") {
        return filesSplitByComma.split(",")
            .map(f => resolve(f))
            .filter(f => existsSync(f));
    }

    //list files in directory
    const directory = ARGS["--directory"],
        nameMatchs = ARGS["--name-match"],
        recursive = ARGS["--recursive"];

    if (typeof directory !== "string") {
        throw new Error("directory parameter is empty");
    }
    const absDir = resolve(directory);
    if (!existsSync(absDir)) {
        throw new Error(`directory ${absDir} is not found`);
    }
    const files = recursive === true ? recursiveDirFiles(absDir) : readdirSync(absDir).map(name => join(absDir, name)).filter(f => statSync(f).isFile());

    return Array.from(files).filter(f => typeof nameMatchs === "string" ? new RegExp(nameMatchs).test(f) : true);
}
function getToken(): string {
    const token = (ARGS["--token"] || process.env.GIST_TOKEN || "").toString();

    if (!/[\d\w]+/.test(token)) {
        throw new Error(`error token: ${token}`);
    }

    return token;
}
function showHelp(): void {
    print(`
Usage: node ${SCRIPT_FILE_NAME} [opitons]

Options: 
    --help          show help info
    --token         gist token(if not support, read from environment GIST_TOKEN). create token: https://github.com/settings/tokens 
    --public        create public gist or not, default value is false
    --description   gist description

    --directory     the directory of files that need upload to gist
    --recursive     need recursive read files (default value is false)
    --name-match    the regex value of file name match

    --files         the files path need upload to gist, multi file split by comma

Examples:
    node ${SCRIPT_FILE_NAME} --token your_token_value --directory ./ --name-match "\.(js|ts)$"
    node ${SCRIPT_FILE_NAME} --token your_token_value --files ./file.txt,./dir/file2.md
`);
}