const path = require("path")

module.exports = {
    entry: './assets/scripts/panel.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    output: {
        path: path.resolve(__dirname, "panel", "static", "panel"),
        filename: "index.js"
    },
    devtool: "inline-source-map"
}
