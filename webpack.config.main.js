"use strict"

const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin")
const nodeExternals = require("webpack-node-externals")
const path = require("path")

const config = {
    target: ["node"],
    entry: "./src/exports.ts",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "helpers.js",
        libraryTarget: "commonjs",
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".js"],
        plugins: [
            // @ts-ignore
            new TsconfigPathsPlugin.default({}),
        ],
        fallback: {
            fs: false,
        },
    },
    externals: [nodeExternals()],
    module: {
        rules: [{
            test: /\.ts$/,
            exclude: /node_modules/,
            use: [{
                loader: "ts-loader",
                options: {
                    compilerOptions: {
                        module: "commonjs", // override `tsconfig.json` so that TypeScript emits native JavaScript modules.
                    },
                },
            }, ],
        }, ],
    },
}

module.exports = config