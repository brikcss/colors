# Colors

[![Greenkeeper badge](https://badges.greenkeeper.io/brikcss/colors.svg)](https://greenkeeper.io/)

<!-- Shields. -->
<p>
	<!-- NPM version. -->
	<a href="https://www.npmjs.com/package/@brikcss/colors">
		<img alt="NPM version" src="https://img.shields.io/npm/v/@brikcss/colors.svg?style=flat-square">
	</a>
	<!-- NPM downloads/month. -->
	<a href="https://www.npmjs.com/package/@brikcss/colors">
		<img alt="NPM downloads per month" src="https://img.shields.io/npm/dm/@brikcss/colors.svg?style=flat-square">
	</a>
	<!-- Travis branch. -->
	<a href="https://github.com/brikcss/colors/tree/master">
		<img alt="Travis branch" src="https://img.shields.io/travis/rust-lang/rust/master.svg?style=flat-square&label=master">
	</a>
	<!-- Codacy. -->
	<a href="https://www.codacy.com/app/thezimmee/colors">
		<img alt="NPM version" src="https://img.shields.io/codacy/grade/06fcf37293d24f0ab692ed946d6072ee/master.svg?style=flat-square">
	</a>
	<!-- Coveralls -->
	<a href='https://coveralls.io/github/brikcss/colors?branch=master'>
		<img src='https://img.shields.io/coveralls/github/brikcss/colors/master.svg?style=flat-square' alt='Coverage Status' />
	</a>
	<!-- Commitizen friendly. -->
	<a href="http://commitizen.github.io/cz-cli/">
		<img alt="Commitizen friendly" src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square">
	</a>
	<!-- Semantic release. -->
	<a href="https://github.com/semantic-release/semantic-release">
		<img alt="semantic release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square">
	</a>
	<!-- Prettier code style. -->
	<a href="https://prettier.io/">
		<img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
	</a>
	<!-- MIT License. -->
	<!-- <a href="https://choosealicense.com/licenses/mit/">
		<img alt="License" src="https://img.shields.io/npm/l/express.svg?style=flat-square">
	</a> -->
</p>

Colors component to make creating and managing color class and variables in CSS easier.

---

## Environment and browser support

| Node   | CLI   | UMD   | ES Module | Browser   |
|:------:|:-----:|:-----:|:---------:|:---------:|
| x      | x     | x     | x         | ✓         |

| Chrome | Firefox | Safari | Edge | IE  | iOS | Android |
|:------:|:-------:|:------:|:----:|:---:|:---:|:-------:|
| ✓      | ✓       | ✓      | ✓    | 11  | ✓   | ✓       |

\* _Note: Since uses [CSS Variables](https://caniuse.com/#search=css%20variables) are used, IE11 is supported with the use of a custom variables polyfill, such as [postcss-var-shim](https://github.com/luwes/postcss-var-shim)._

## Install

1. Install:

	```sh
	npm i -D @brikcss/colors
	```

2. Include file(s) in your app:

	- _PostCSS:_ `@import '@brikcss/colors';` with [postcss-import](https://github.com/postcss/postcss-import).
	- _Precompiled:_ Include `./dist/colors.min.css` for the precompiled version (i.e., no PostCSS required).
	- _Custom:_ To generate your own color variables and classes, use the [colors @mixin](./src/mixins/colors.js) and follow the [source CSS](./src/colors.css).

## Colors mixin usage

The [colors mixin](./src/mixins/colors.js) allows you to generate your own custom color variables and classes in one easy step. _See [postcss-mixins](https://github.com/postcss/postcss-mixins) for documentation on how to configure and use PostCSS mixins._

Sample input:

```css
@mixin colors {
	/* CSS variables are created for each color value. */
	brand1: red;
	brand2: blue;
	text: white;

	/* Rules are created for each value in its `colors` property. */
	.color- {
		colors: text;
		color: color();
	}
	.bg- {
		colors: brand1 brand2;
		background-color: color();
		fill: color();
		color: var(--color__text);
	}
}
```

Output:

```css
:root {
	--color__brand1: red;
	--color__brand2: blue;
	--color__text: white;
}

.color-text {
	color: var(--color__text);
}

.bg-brand1 {
	background-color: var(--color__brand1);
	fill: var(--color__brand1);
	color: var(--color__text);
}

.bg-brand2 {
	background-color: var(--color__brand2);
	fill: var(--color__brand2);
	color: var(--color__text);
}
```

### Options

- *addVariables*  _{Boolean|String}_  `true`  Set to `false` to disable adding CSS variables and only add rules. You may also pass a String to change the default `color__` CSS variable prefix. For example:

	```
	@mixin colors my-color- {...}
	```

	will generate CSS variables like this:

	```
	--my-color-<color-name>: <color-value>;
	```
