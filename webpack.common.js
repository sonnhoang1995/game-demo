// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.ts",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                include: [path.resolve(__dirname, "src")]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            title: "Production",
            template: "./src/index.html"
        })
    ],
    resolve: {
        extensions: ["tsx", ".ts", ".js", ".css", ".scss", ".sass"]
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "public")
    }
};
