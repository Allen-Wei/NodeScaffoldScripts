
export function getArgs(inArgs: Array<string>): Map<string, Boolean | string> {
    const args = Array.from(inArgs);
    const maps = new Map<string, Boolean | string>();
    while (args.length) {
        const key = args[0];
        if (!key || key[0] !== "-") {
            args.splice(0, 1);
            continue;
        }
        const value = args[1] || "";

        maps.set(key, value.length === 0 || value[0] === "-" ? true : value);
        args.splice(0, 2);
    }
    return maps;
}

export function autoGetArgs(): Map<string, Boolean | string> {
    return getArgs(process.argv);
}