var webpack = require("webpack");

var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
	entry: "./main.js",
	output: {
		filename: "merge.min1.js"
	},
	plugins: [
		new uglifyJsPlugin({
			conpress: {
				warning: false
			}
		})
	]

};