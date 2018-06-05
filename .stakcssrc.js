// Setup.
const env = process.env.NODE_ENV;
const isProd = ['production', 'test'].includes(env);
const postcssPlugins = require('./.postcssrc.js');

// Config export object.
let config = {
	css: {
		source: 'src/colors.init.css',
		output: './dist/colors.init.css',
		bundlers: [
			{
				run: '@brikcss/stakcss-bundler-postcss',
				options: { skipConfig: true },
				plugins: postcssPlugins(
					'postcss-mixins',
					'./lib/postcss-background-color.js',
					'postcss-reporter'
				)
			}
		],
		watchPaths: ['src/mixins/*.js']
	}
};

if (isProd) {
	config.css_min = Object.assign({}, config.css, {
		bundlers: [
			{
				run: '@brikcss/stakcss-bundler-postcss',
				options: {
					skipConfig: true
				},
				plugins: postcssPlugins('autoprefixer', 'postcss-csso')
			}
		]
	});
}

module.exports = config;
