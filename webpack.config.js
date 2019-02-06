{
    "mode": "development",
    "entry": "src/index.js",
    "output": {
        "path": __dirname+'/build',
        "filename": "[name].[chunkhash:8].js"
    },
    "module": {
        "rules": [
            {
                "test": /\.scss$/,
                "use": [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    "plugins": [new MiniCssExtractPlugin({filename: "[name]-[contenthash:8].css"})]
}