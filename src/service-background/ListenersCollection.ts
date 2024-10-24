
import browser from 'webextension-polyfill';

import { Listener } from './Listener';


export class ListenersCollection
{
	private readonly collection: Listener[] = [];

	private onDisconnect (listener: Listener): void
	{
		const index = this.collection.findIndex(value => value === listener);
		this.collection.splice(index, 1);
	}

	private onConnect (connection: browser.Runtime.Port): void
	{
		const listener = new Listener(connection);

		connection.onDisconnect.addListener(() => this.onDisconnect(listener));

		this.collection.push(listener);
	}

	public constructor ()
	{
		browser.runtime.onConnect.addListener(connection => this.onConnect(connection));
	}
}
