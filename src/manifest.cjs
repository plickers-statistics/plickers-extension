
/** @type { chrome.runtime.ManifestV3 } */
module.exports = {
	name        : 'plickers_statistics',
	description : 'Собирает и выводит статистику всем желающим',

	version : '1.5.0',
	icons   : {
		128 : 'icons/128x128@favicon.png',
	},

	manifest_version: 3,
	action: {
		default_title: 'plickers_statistics'
	},

	host_permissions: [
		'https://my.plickers.com/*'
	],

	background: {
		service_worker: 'background.js'
	},

	content_scripts: [
		{
			matches: [
				'https://my.plickers.com/*'
			],

			js: [
				'additions.js',
				'client.js'
			]
		}
	],
};
