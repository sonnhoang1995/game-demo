const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
    entry: "./src/index.ts",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                include: [path.resolve(__dirname, "src")]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            title: "Production",
            template: "./src/index.html"
        }),
        new ImageMinimizerPlugin({
            deleteOriginalAssets: true,
            minimizerOptions: {
                plugins: [
                    ["gifsicle", { interlaced: true }],
                    ["jpegtran", { progressive: true }],
                    ["optipng", { optimizationLevel: 5 }]
                ]
            },
            loader: false
        })
    ],
    resolve: {
        extensions: ["tsx", ".ts", ".js", ".css", ".scss", ".sass"]
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "public"),
        assetModuleFilename: "assets/[hash][ext][query]"
    }
};
