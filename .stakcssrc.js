/** Setup.
 ============================================================================================= */

const env = process.env.NODE_ENV;
const isProd = ['production', 'prod', 'test'].includes(env);
const loadPostcssPlugins = require('./.postcssrc.js');
const basePostcssPlugins = ['postcss-mixins', 'autoprefixer'];

// Config export object.
let config = {
	css: {
		source: 'src/colors.css',
		output: './dist/colors.css',
		bundlers: [
			{
				run: '@brikcss/stakcss-bundler-postcss',
				options: { skipConfig: true, map: false },
				plugins: loadPostcssPlugins(...basePostcssPlugins.concat(['postcss-reporter']))
			}
		],
		watchPaths: ['src/mixins/*.js']
	}
};

if (isProd) {
	config.css_min = Object.assign({}, config.css, {
		output: 'dist/colors.min.css',
		bundlers: [
			{
				run: '@brikcss/stakcss-bundler-postcss',
				options: { skipConfig: true, map: false },
				plugins: loadPostcssPlugins(...basePostcssPlugins.concat(['postcss-csso']))
			}
		]
	});
}

module.exports = config;
