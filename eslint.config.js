import js from "@eslint/js";

export default [
	{
		ignores: ["node_modules/"]
	},
	js.configs.recommended,
	{
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: "module",
			globals: {
				console: "readonly",
				document: "readonly",
				window: "readonly",
				// Browser globals
				navigator: "readonly",
				location: "readonly",
				history: "readonly",
				localStorage: "readonly",
				sessionStorage: "readonly",
				// Node.js globals (if needed)
				process: "readonly",
				Buffer: "readonly",
				__dirname: "readonly",
				__filename: "readonly",
				module: "readonly",
				require: "readonly",
				exports: "readonly",
				global: "readonly"
			}
		},
		rules: {
			"indent": ["warn", "tab", { "SwitchCase": 1 }],
			"linebreak-style": ["error", "unix"],
			"quotes": ["warn", "double", { "allowTemplateLiterals": true }],
			"semi": ["error", "always"],
			"no-unused-vars": ["warn", { "args": "none", "varsIgnorePattern": "^rotate$" }],
			"no-console": "off",
			"no-undef": "error",
			"no-redeclare": "warn",
			"eqeqeq": ["warn", "smart"],
			"curly": ["warn", "multi-line"],
			"brace-style": ["warn", "1tbs", { "allowSingleLine": true }],
			
			// ES6+ modernization rules
			"prefer-const": "error",
			"no-var": "error",
			"prefer-arrow-callback": ["error", { "allowNamedFunctions": false }],
			"arrow-spacing": "error",
			"prefer-template": "error",
			"template-curly-spacing": "error",
			"object-shorthand": ["error", "always"],
			"prefer-destructuring": ["error", {
				"array": false,
				"object": true
			}, {
				"enforceForRenamedProperties": false
			}],
			"prefer-spread": "error",
			"prefer-rest-params": "error",
			"no-useless-concat": "error",
			"prefer-numeric-literals": "error",
			"symbol-description": "error",
			"prefer-object-spread": "error"
		}
	}
];