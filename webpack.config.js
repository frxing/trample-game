
module.exports = {
    devtool: 'eval-source-map',
    entry: __dirname + '/src/js/app.js',
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: "./build",
        historyApiFallback: true,
        inline: true,
        port: 3333
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: /node_modules/
            },
            {
                test: /\.css/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            }
        ]
    }
}