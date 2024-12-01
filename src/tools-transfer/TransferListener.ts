
import { EventEmitter } from 'events';
import { runtime } from 'webextension-polyfill';

import { Disposable } from 'src/tools-disposable/Disposable';
import { isPackageDTO } from 'src/tools-DTOs/PackageDTO';

import { TransferServerEvents } from './TransferEvents';
import { TypedChecker, TypedCallback } from './Types';


export abstract class TransferListener implements Disposable
{
	private readonly events = new EventEmitter();

	public constructor
	(
		protected readonly connection = runtime.connect()
	)
	{
		this.events.addListener('notification', message => alert(message));

		connection.onMessage.addListener(message => {
			console.debug('[PORT | Background => Client] message', message);
			isPackageDTO(message) && this.events.emit(message.type, message.data);
		});
	}

	public dispose (): void
	{
		this.events.removeAllListeners();
		this.connection.disconnect();
	}

	// ===== ===== ===== ===== =====

	public bind <TKey extends keyof TransferServerEvents>
	(
		type    : TKey,
		checker : TypedChecker  <TransferServerEvents[TKey]>,
		handler : TypedCallback <TransferServerEvents[TKey]>
	): (...args: any[]) => void
	{
		const safeCallback = function (message: unknown): void
		{
			checker(message)
				? handler(message)
				: console.error('invalid format', { type, message });
		};

		this.events.addListener(type, safeCallback);
		return safeCallback;
	}

	public readonly unbind = this.events.removeListener.bind(this.events);
}
