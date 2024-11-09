
import browser from 'webextension-polyfill';

import { TransferEvents } from './TransferEvents';


export class Transfer<TEvents extends TransferEvents>
{
	public constructor
	(
		protected readonly connection = browser.runtime.connect()
	)
	{
	}

	public close (): void
	{
		return this.connection.disconnect();
	}

	public send <TKey extends keyof TEvents>(type: TKey, data: TEvents[TKey]): void
	{
		const message = { type, data };

		this.connection.postMessage(message);
		console.debug('message sent', message);
	}
}