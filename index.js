var archy = require('archy');
var colors = require('colors');

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

	atomic.forEach(function(key) {
		var val = obj[key]+'';
		key = key+':'+pad.slice(key.length-pad.length-1);
		nodes.push(isArray ? val : (key.cyan+val));
	});

	nonAtomic.forEach(function(key) {
		nodes.push({label:isArray ? undefined : key.cyan, nodes:leaf(obj[key])});
	});

	return nodes;
};

var visit = function(node) {
	if (node.label) node.label = node.label.yellow;
	if (node.nodes) node.nodes = [].concat(node.nodes).map(visit);
	if (node.leaf)  node.nodes = leaf(node.leaf);
	return node;
};

var tree = function(node) {
	return archy(visit(node))
		.replace(/([├└])─┬ \n[│ ]+[├]/gm, '$1─┬')
		.replace(/([├└])─┬ \n[│ ]+[└]/gm, '$1──')
		.replace(/[┬├─└│┐]/g, function(_) {
			return _.grey;
		});
};

module.exports = tree;