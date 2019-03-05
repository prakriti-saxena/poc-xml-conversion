const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
	mode: 'none',
	entry: {
		handler: './index.js',
	},
	target: 'node',
	performance: {
		hints: false,
	},
	devtool: 'nosources-source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
					},
				],
			},
			{
				test: /\.txt$/,
				loader: 'raw-loader'
			}
		],
	},
	externals: [nodeExternals()],
	output: {
		libraryTarget: 'commonjs2',
		path: path.join(__dirname, 'build'),
		filename: '[name].js',
		sourceMapFilename: '[file].map',
	},
};
