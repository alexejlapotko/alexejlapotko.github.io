module.exports = {
	plugins: [
		require("autoprefixer")({
			// Include older browsers to ensure webkit prefixes are added
			overrideBrowserslist: [
				"last 4 versions",
				"> 0.5%",
				"not dead",
				"Chrome >= 30",
				"Safari >= 6",
				"iOS >= 7"
			]
		}),
		require("cssnano")({
			preset: "default"
		})
	]
};