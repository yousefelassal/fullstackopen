module.exports = {
	'env': {
		'node': true,
		'commonjs': true,
		'es2021': true,
		'jest': true
	},
	'extends': [
		'eslint:recommended',
		'prettier'
	],
	'overrides': [
	],
	'parserOptions': {
		'ecmaVersion': 'latest'
	},
	'rules': {
		'eqeqeq': 'error',
		'no-trailing-spaces': 'error',
		'object-curly-spacing': [
			'error',
			'always'
		],
		'arrow-spacing': [
			'error',
			{ 'before': true, 'after': true }
		],
		'no-console': 0,
		'indent': [
			'error',
			2
		],
		'linebreak-style': [
			'error',
			'windows'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		]
	}
}
