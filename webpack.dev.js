// eslint-disable-next-line @typescript-eslint/no-var-requires
const { merge } = require("webpack-merge");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(css)$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(s(a|c)ss)$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    }
});
