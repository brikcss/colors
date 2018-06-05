/** ------------------------------------------------------------------------------------------------
 *  @filename  colors.js
 *  @author  brikcss  <https://github.com/brikcss>
 *  @description  PostCSS mixin to create color variables and class names from a list of colors.
 ** --------------------------------------------------------------------------------------------- */

const postcss = require('postcss');

module.exports = (mixin, addVariables = 'true') => {
	// Setup.
	const prefix =
		typeof addVariables === 'string' && !['', 'false', 'true'].includes(addVariables)
			? addVariables
			: 'color__';
	addVariables = !['', 'false'].includes(addVariables);
	let variablesContainer;
	const container = postcss.root();
	const colorsMap = {};
	if (addVariables) {
		variablesContainer = postcss.rule({ selector: ':root', raws: { semicolon: true } });
	}

	// First create css variables and map color values to colorsMap.
	mixin.walk((node) => {
		// Skip it if it's not a child declaration of the colors mixin.
		if (node.type === 'rule' || node.parent.selector) return;

		// Add variable to the :root container and cache the color value.
		if (node.type === 'decl') {
			const clone = node.clone();

			// Cache the color.
			colorsMap[node.prop] = addVariables ? `var(--${prefix}${node.prop})` : node.value;

			// Add custom variables to :root.
			node.prop = `--${prefix}${clone.prop}`;
			if (addVariables) variablesContainer.append(node);
		} else if (addVariables) {
			variablesContainer.append(node);
		}
	});

	// Iterate `colors` property and build classes.
	mixin.walkRules((rule) => {
		// Get the `colors` property and convert color values to an Array.
		const colorsDecl = rule.nodes.find((node) => node.prop === 'colors');
		const colors = postcss.list.space(colorsDecl.value);

		// Create a rule for each color value.
		colors.forEach((color) => {
			colorsDecl.remove();
			const clone = rule.clone();
			clone.selector = rule.selector + color;
			clone.walkDecls((decl) => {
				decl.value = decl.value.replace('color()', colorsMap[color]);
			});
			container.append(clone);
		});
		// Remove the rule from the mixin.
		rule.remove();
	});

	// Add variables to the container and replace the mixin.
	if (addVariables) container.prepend(variablesContainer);
	mixin.replaceWith(container);
};
