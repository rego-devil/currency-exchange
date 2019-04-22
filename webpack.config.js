const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	context: path.resolve(__dirname, 'src'),

	devtool: 'source-map',
	mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',

	entry: {
		custom: ['./app'],		
	},

	output: {
		path: path.resolve(__dirname, 'public'),
    	filename: './script/[name].bundle.js',
    	// publicPath: '/',
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
		],
	},

	resolve: {
		extensions: ['.js', '.jsx'],
	},

	plugins: [
		process.env.NODE_ENV === 'development' && new webpack.HotModuleReplacementPlugin(),

		new HtmlWebpackPlugin({
			title: 'Currency Exchange',
			template: './index.html',
    	}),


	].filter(Boolean),

	devServer: {  
    port: 9000,
    hot: true,
		compress: true,
		// contentBase: './',
		historyApiFallback: true
  }
  
};