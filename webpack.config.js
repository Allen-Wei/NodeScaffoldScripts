const path = require('path'),
    fs = require("fs");

const entryPath = path.join(__dirname, "src");
const tsFiles = {};
fs.readdirSync(entryPath)
    .filter(fileName => fileName.endsWith(".ts"))
    .forEach(tsFile => tsFiles[tsFile.replace(/(.+)\.ts$/, "$1")] = path.join(entryPath, tsFile));

module.exports = {
    entry: tsFiles,
    mode: process.env.BUILD_MODE === "pro" ? "production" : "development",
    target: "node",
    module: {
        rules: [{
            test: /\.ts?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }, {
            test: /\.tmpl$/i,
            use: 'raw-loader',
        }]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, process.env.BUILD_MODE === "pro" ? "dist/release" : "dist/debug")
    }
};