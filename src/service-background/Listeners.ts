
import { Runtime, runtime } from 'webextension-polyfill';

import { Listener } from './Listener';


export class Listeners
{
	private readonly collection: Listener[] = [];

	private onDisconnect (listener: Listener): void
	{
		const index = this.collection.findIndex(value => value === listener);
		this.collection.splice(index, 1);
	}

	private onConnect (connection: Runtime.Port): void
	{
		const listener = new Listener(connection);

		connection.onDisconnect.addListener(() => this.onDisconnect(listener));

		this.collection.push(listener);
	}

	public constructor ()
	{
		runtime.onConnect.addListener(connection => this.onConnect(connection));
	}
}
