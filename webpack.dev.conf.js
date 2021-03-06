// --mode development
let webpack = require ('webpack')
let merge = require ('webpack-merge')
let baseWebpackConfig = require ('./webpack.base.conf')
let devWebpackConfig = merge (baseWebpackConfig, {
	devtool: 'cheap-module-eval-source-map',
	mode: 'development',
	devServer: {
		historyApiFallback: true,
    open: true,
    port: 1234,
    inline: true,
    hot: true,
    liveReload: true,
    contentBase: [ './src/' ],
    watchContentBase: true,
		watchOptions: {
				poll: true
		},
		overlay: {
      warnings: true,
			errors: true
		}
	},
	module: {
		rules: [
			{
				test: /\.(png|jpe?g|gif|ico)(\?.*)?$/,
				exclude: `${baseWebpackConfig.externals.paths.fonts}`,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: `[name].[ext]`,
							outputPath: `${baseWebpackConfig.externals.paths.assets}img`,
							useRelativePath: true,
						},
					},
					{
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: {
								progressive: false,
							},
							optipng: {
								enabled: false,
							},
						},
					},
				]
			},
		]
	},
	plugins: [
		new webpack.SourceMapDevToolPlugin ({
			filename: '[file].map'
		}),
	]
});
module.exports = new Promise ((resolve, reject) => {
	resolve (devWebpackConfig)
});