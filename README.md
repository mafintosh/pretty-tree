# pretty-tree

Make colorful trees out of JSON objects using [archy](https://github.com/substack/node-archy)

	npm install pretty-tree

## Usage

``` js
var tree = require('pretty-tree');

var str = tree({
	label: '(root)', // the label of this node
	nodes: [{
		label: '(child)',
		leaf: {
			hello: 'world',
			hej: 'verden'
		}
	}]
});

console.log(str);
```

The above example results in the following output:

![example](https://raw.github.com/mafintosh/pretty-tree/master/example.png)

The node passed to tree can contain the following options

``` js
tree({
	label: '(child)', // an optional lable of this node
	leaf: {           // set this if you want to print an object
		key: value,
		...
	},
	nodes: [          // or put in some child nodes
		child_nodes_with_same_structure
	]
})
```

If you want to disable coloring (even when the terminal is a tty) use `tree.plain(options)`

## License

MIT