
export function getArgs(inArgs: Array<string>): { [key: string]: boolean | string } {
    const args = Array.from(inArgs);
    const maps: { [key: string]: boolean | string } = {};
    while (args.length) {
        const key: string = args[0];
        if (!key || key[0] !== "-") {
            args.splice(0, 1);
            continue;
        }
        const value = args[1] || "";

        maps[key] = value.length === 0 || value[0] === "-" ? true : value;
        args.splice(0, 2);
    }
    return maps;
}

export function autoGetArgs(): { [key: string]: Boolean | string } {
    return getArgs(process.argv);
}