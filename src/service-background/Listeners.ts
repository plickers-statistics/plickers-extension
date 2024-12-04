
import { Runtime, runtime } from 'webextension-polyfill';

import { Listener } from './Listener';


export class Listeners
{
	private readonly collection: Listener[] = [];

	private closed (listener: Listener): void
	{
		const index = this.collection.findIndex(value => value === listener);

		console.debug('CLOSED => ' + index, listener);
		this.collection.splice(index, 1);
	}

	private connected (connection: Runtime.Port): void
	{
		const listener = new Listener(connection);

		const closed = () => {
			listener.removeListener('closed', closed);
			this.closed(listener);
		};

		listener.addListener('closed', closed);

		this.collection.push(listener);
	}

	public constructor ()
	{
		runtime.onConnect.addListener(this.connected.bind(this));
	}
}
