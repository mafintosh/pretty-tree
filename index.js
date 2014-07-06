var archy = require('archy');
var chalk = require('chalk');

var echo = function(val) {
	return val
}

var tree = function(color) {
	var cyan = color ? chalk.cyan : echo
	var grey = color ? chalk.grey : echo
	var yellow = color ? chalk.yellow : echo

	var isAtomic = function(v) {
		return v === null || v === undefined || typeof v !== 'object';
	};

	var leaf = function(obj) {
		if (isAtomic(obj)) return [''+obj];

		var keys = Object.keys(obj);
		var isArray = Array.isArray(obj);
		var nodes = [];

		var atomic = keys.filter(function(key) {
			return isAtomic(obj[key]);
		});

		var nonAtomic = keys.filter(function(key) {
			return !isAtomic(obj[key]);
		});

		var pad = atomic.reduce(function(max, val) {
			return max.length >= val.length ? max : val.replace(/./g, ' ');
		}, ' ');

		if (!atomic.length && !nonAtomic.length) return [grey('(empty)')];

		atomic.forEach(function(key) {
			var val = (obj[key]+'').replace(/\n/g, '\n  '+pad);
			key = key+':'+pad.slice(key.length-pad.length-1);
			nodes.push(isArray ? val : (cyan(key)+val));
		});

		nonAtomic.forEach(function(key) {
			nodes.push({label:isArray ? undefined : cyan(key), nodes:leaf(obj[key])});
		});

		return nodes;
	};

	var visit = function(node) {
		if (node.label) node.label = yellow(node.label);
		if (node.nodes) node.nodes = [].concat(node.nodes).map(visit);
		if (node.leaf)  node.nodes = [].concat(node.nodes || [], leaf(node.leaf));
		if (node.label && (!node.nodes || !node.nodes.length)) node.nodes = [grey('(empty)')];
		return node;
	};

	return function(node) {
		return archy(visit(node))
			.replace(/([├└])─┬ \n[│ ]+├/gm, '$1─┬')
			.replace(/([├└])─┬ \n[│ ]+└/gm, '$1──')
			.replace(/[┬├─└│┐]/g, function(_) {
				return grey(_);
			});
	};
}

module.exports = tree(true);
module.exports.plain = tree(false);