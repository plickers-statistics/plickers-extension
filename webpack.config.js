
const GenerateJsonFromJsPlugin = require('generate-json-from-js-webpack-plugin');
const webpack                  = require('webpack');
const path                     = require('path');


const folders = {
	declarations : path.resolve(__dirname, 'declarations'),
	additions    : path.resolve(__dirname, 'additions'),

	build  : path.resolve(__dirname, 'build'),
	source : path.resolve(__dirname, 'src'),
};

const files = {
	manifest: path.resolve(folders.source, 'manifest.cjs'),

	additions: path.resolve(folders.additions, 'includes.ts'),

	client: path.resolve(folders.source, 'service-client', 'main.ts'),
};

/** @type { webpack.Configuration } */
module.exports = {
	plugins: [
		new GenerateJsonFromJsPlugin({
			filename : 'manifest.json',
			path     : files.manifest
		}),
	],

	resolve: {
		extensions: [ '.js', '.ts' ],

		alias: {
			declarations : folders.declarations,
			src          : folders.source,
		},
	},

	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader'
			}
		]
	},

	optimization: {
		minimize: false
	},

	output: {
		filename : '[name].js',
		path     : folders.build
	},

	entry: {
		additions : files.additions,
		client    : files.client,
	},

	devtool : 'inline-source-map',
	mode    : 'development'
};
