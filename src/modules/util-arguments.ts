function isParaName(value: string): boolean {
    return typeof value === "string" && value[0] === "-";
}
export function getArgs(inArgs: Array<string>): { [key: string]: boolean | string } {
    const args = Array.from(inArgs);
    const maps: { [key: string]: boolean | string } = {};
    while (args.length) {
        const key: string = args[0];
        if (!key || key[0] !== "-") {
            args.splice(0, 1);
            continue;
        }
        const value = args[1];
        if (isParaName(value) || value === undefined) {
            maps[key] = true;
            args.splice(0, 1);
        } else {
            maps[key] = value;
            args.splice(0, 2);
        }
    }
    return maps;
}

export function autoGetArgs(): { [key: string]: Boolean | string } {
    return getArgs(process.argv);
}