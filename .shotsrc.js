module.exports = {
	url: `file://${__dirname}/test/fixtures`,
	viewports: [
		{
			width: 1280,
			height: 768
		},
		{
			width: 320,
			height: 640
		}
	],
	cases: [
		{
			name: 'colors',
			path: 'index.html'
		}
	],
	server: {
		rootPath: 'test/fixtures'
	}
};
