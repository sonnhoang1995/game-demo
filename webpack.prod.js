// eslint-disable-next-line @typescript-eslint/no-var-requires
const { merge } = require("webpack-merge");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const common = require("./webpack.common.js");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
    mode: "production",
    module: {
        rules: [
            {
                test: /\.(css)$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.(s(a|c)ss)$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            }
        ]
    },
    plugins: [new MiniCssExtractPlugin()]
});
