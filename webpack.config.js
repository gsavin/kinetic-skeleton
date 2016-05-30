var path = require('path');

module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.join(__dirname, 'build'),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
              test: /\.jsx?$/,
              exclude: /node_modules/,
              loader: 'babel-loader',
              query: {
                presets: ['react', 'es2015'],
                plugins: [
                    'transform-runtime',
                ]
              }
            },
            {
              test: /\.css$/,
              loader: "style!css"
            },
            {
              test: /\.scss$/,
              loader: 'style!css!sass'
            },
            {
              test: /\.(woff|woff2)$/,
              loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
              test: /\.ttf$/,
              loader: "file-loader"
            },
            {
              test: /\.eot$/,
              loader: "file-loader"
            },
            {
              test: /\.svg$/,
              loader: "file-loader"
            }
        ]
    }
};
