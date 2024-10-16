
import browser from 'webextension-polyfill';

import { checkForSenderError } from './SenderError';


export class Sender
{
	public static async sendToBackground (type: string, data ?: unknown): Promise<unknown>
	{
		const send     = { type, data };
		const response = await browser.runtime.sendMessage(send);

		console.debug('received response from background process', { send, response });
		checkForSenderError(response);

		return response;
	}
}
