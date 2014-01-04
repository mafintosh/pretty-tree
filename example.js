var tree = require('./index');

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

var str = tree({
	label: '(root)',
	nodes: [
		{
			label: '(child-1)',
			leaf: {
				foo: 'bar',
				bar: true,
				foobar:'baz',
				multiline:'foo\nbar\nbaz',
				nested: {
					value: 'her',
					count: 42
				},
				nested2: {
					value: 'her',
					count: 42
				},
				empty: [],
				empty2: {},
				list: [
					11,
					22,
					32,
					{
						foo: 'bar',
						bar: 'baz'
					},
					{
						foo: 'meh'
					},
					{
						foo1: 'bar',
						bar2: 'baz'
					}
				]
			}
		},
		{
			leaf: 'hello'
		},
		{
			label: '(child-2)',
			leaf: true
		}
	]
});

console.log(str);