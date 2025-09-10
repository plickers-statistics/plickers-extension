import js from "@eslint/js";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import stylistic from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";


export default defineConfig([
	// основной форматировщик кода.
	{
		files   : [ "**/*.{js,mjs,cjs,ts,mts,cts}" ],
		plugins : { '@stylistic': stylistic },

		rules: {
			'@stylistic/array-bracket-newline': [ "error", "consistent" ],

			'@stylistic/array-bracket-spacing': [ 'error', 'always', {
				objectsInArrays : false,
				arraysInArrays  : false,
			}],

			'@stylistic/array-element-newline': [ 'error', 'consistent', {
				ArrayExpression : 'consistent',
				ArrayPattern    : 'consistent',
			}],

			'@stylistic/arrow-parens'                   : [ 'error', 'as-needed' ],
			'@stylistic/arrow-spacing'                  : [ 'error', { before: true, after: true }],
			'@stylistic/block-spacing'                  : [ 'error', 'always' ],
			'@stylistic/brace-style'                    : [ 'error', 'allman' ],
			'@stylistic/comma-dangle'                   : [ 'error', 'always-multiline' ],
			'@stylistic/comma-spacing'                  : [ 'error', { before: false, after: true }],
			'@stylistic/comma-style'                    : [ 'error', 'last' ],
			'@stylistic/computed-property-spacing'      : [ 'error', 'never' ],
			'@stylistic/curly-newline'                  : [ 'error', 'always' ],
			'@stylistic/dot-location'                   : [ 'error', 'property' ],
			'@stylistic/eol-last'                       : [ 'error', 'always' ],
			'@stylistic/function-call-argument-newline' : [ 'error', 'consistent' ],
			'@stylistic/function-call-spacing'          : [ 'error', 'never' ],
			'@stylistic/function-paren-newline'         : [ 'error', 'consistent' ],
			'@stylistic/generator-star-spacing'         : [ 'error', { before: true, after: true }],
			'@stylistic/implicit-arrow-linebreak'       : [ 'error', 'beside' ],
			'@stylistic/indent'                         : [ 'error', 'tab' ],
			'@stylistic/indent-binary-ops'              : [ 'error', 'tab' ],

			'@stylistic/key-spacing': [ 'error', {
				multiLine: {
					beforeColon : false,
					afterColon  : true,
				},
				align: {
					beforeColon : true,
					afterColon  : true,
					on          : 'colon',
				},
			}],

			'@stylistic/keyword-spacing'       : [ 'error', { before: true, after: true }],
			'@stylistic/line-comment-position' : [ 'error', { position: 'above' }],
			'@stylistic/linebreak-style'       : [ 'error', 'unix' ],

			'@stylistic/lines-around-comment': [ 'error', {
				beforeBlockComment : true,
				afterBlockComment  : false,

				beforeLineComment : true,
				afterLineComment  : false,

				allowBlockStart : true,
				allowBlockEnd   : true,

				allowClassStart : true,
				allowClassEnd   : true,

				allowObjectStart : true,
				allowObjectEnd   : true,

				allowArrayStart : true,
				allowArrayEnd   : true,

				afterHashbangComment: false,
			}],

			/*
			 * TODO: добавить правила
			 * '@stylistic/lines-between-class-members': [ 'error', { ... }],
			 */

			'@stylistic/max-len'                 : [ 'error', { code: 120, tabWidth: 4, ignoreUrls: true }],
			'@stylistic/max-statements-per-line' : [ 'error', { max: 1, ignoredNodes: [ 'BreakStatement' ] }],

			'@stylistic/member-delimiter-style': [ 'error', {
				multiline: {
					delimiter   : 'semi',
					requireLast : true,
				},

				singleline: {
					delimiter   : 'semi',
					requireLast : false,
				},

				multilineDetection: 'brackets',
			}],

			'@stylistic/multiline-comment-style'  : [ 'error', 'starred-block' ],
			'@stylistic/multiline-ternary'        : [ 'error', 'always' ],
			'@stylistic/new-parens'               : [ 'error', 'always' ],
			'@stylistic/newline-per-chained-call' : [ 'error', { ignoreChainWithDepth: 2 }],
			'@stylistic/no-confusing-arrow'       : [ 'error', { allowParens: true, onlyOneSimpleParam: false }],

			// TODO: добавить правила
		},
	},

	// практика "чистого кода".
	{
		files   : [ "**/*.{js,mjs,cjs,ts,mts,cts}" ],
		plugins : { sonarjs },
	},

	// запрет сокращения названий переменных итд.
	{
		files   : [ "**/*.{js,mjs,cjs,ts,mts,cts}" ],
		plugins : { unicorn },
	},

	// удалить / сортировать импорт.
	{
		files   : [ "**/*.{js,mjs,cjs,ts,mts,cts}" ],
		plugins : { 'import': importPlugin },
	},
	{
		files           : [ "**/*.{js,mjs,cjs,ts,mts,cts}" ],
		plugins         : { js },
		extends         : [ "js/recommended" ],
		languageOptions : { globals: globals.browser },
	},
	tseslint.configs.recommended,
	{
		files    : [ "**/*.json" ],
		plugins  : { json },
		language : "json/json",
		extends  : [ "json/recommended" ],
	},
	{
		files    : [ "**/*.md" ],
		plugins  : { markdown },
		language : "markdown/gfm",
		extends  : [ "markdown/recommended" ],
	},
]);
