
import { EventEmitter } from 'events';
import Browser from 'webextension-polyfill';

import { isPackageDTO } from 'src/tools-DTOs/PackageDTO';

import { TransferServerEvents } from './TransferEvents';
import { TypedChecker, TypedCallback } from './Types';


export abstract class TransferListener
{
	private readonly events = new EventEmitter();
	protected readonly ping;

	public constructor
	(
		protected readonly connection = Browser.runtime.connect()
	)
	{
		this.events.addListener('notification', message => alert(message));

		this.ping = setInterval(() => connection.postMessage({
			type: 'ping'
		}), 10_000);

		connection.onDisconnect.addListener(() => clearInterval(this.ping));
		connection.onMessage.addListener(message => {
			console.debug('[PORT | Background => Client] message', message);
			isPackageDTO(message) && this.events.emit(message.type, message.data);
		});
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
