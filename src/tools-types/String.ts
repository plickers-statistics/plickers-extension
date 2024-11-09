
/** @see https://github.com/syncshare-project/browser-extension/blob/master/src/common-utils/String.ts#L15 */
export function getIdentifier (buffer: string): number
{
	const cleanString = buffer
		.trim()
		.toLowerCase()
		.replace(/[\s:.,!?*+/-]/g, "");

	let response = 7;

	for (let i = 0; i < cleanString.length; i++)
	{
		const code = cleanString.charCodeAt(i);

		// Нам не важен порядок символов
		// i * 31
		response += (code << 5) - code;
	}

	return response;
}
