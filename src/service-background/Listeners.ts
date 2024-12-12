
import { Runtime, runtime } from 'webextension-polyfill';

import { Listener } from './Listener';


export class Listeners
{
	private readonly collection = new Set<Listener>();

	private connected (connection: Runtime.Port): void
	{
		const listener = new Listener(connection);

		listener.closed_promise.then(() => {
			this.collection.delete(listener);
		});

		this.collection.add(listener);
	}

	private interceptor (connection: Runtime.Port): void
	{
		try
		{
			this.connected(connection);
		}
		catch (error)
		{
			connection.disconnect();
			throw error;
		}
	}

	public constructor ()
	{
		runtime.onConnect.addListener(this.interceptor.bind(this));
	}
}
