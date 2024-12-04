
import { Runtime, runtime } from 'webextension-polyfill';

import { Listener } from './Listener';


export class Listeners
{
	private readonly collection: Listener[] = [];

	private onDisconnect (listener: Listener): void
	{
		const index = this.collection.findIndex(value => value === listener);
		index >= 0 && this.collection.splice(index, 1);
	}

	private onConnect (connection: Runtime.Port): void
	{
		const listener = new Listener(connection);

		listener.addListener('closed', () => this.onDisconnect(listener));

		this.collection.push(listener);
	}

	public constructor ()
	{
		runtime.onConnect.addListener(this.onConnect.bind(this));
	}
}
