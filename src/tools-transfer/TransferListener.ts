
import { EventEmitter } from 'events';
import { runtime } from 'webextension-polyfill';

import { isPackageDTO } from 'src/tools-DTOs/PackageDTO';
import { State } from 'src/tools-types/State';

import { TransferServerEvents } from './TransferEvents';
import { TypedChecker, TypedCallback } from './Types';


export abstract class TransferListener implements Disposable
{
	private readonly events = new EventEmitter();

	public readonly is_connected = new State();

	public constructor
	(
		protected readonly connection = runtime.connect()
	)
	{
		this.events.addListener('notification', message => alert(message));

		connection.onDisconnect.addListener(() => {
			console.debug('[PORT | Background => Client] CLOSE');

			this.is_connected.state = false;
			this[Symbol.dispose]();
		});

		connection.onMessage.addListener(message => {
			console.debug('[PORT | Background => Client] message', message);
			isPackageDTO(message) && this.events.emit(message.type, message.data);
		});

		this.is_connected.state = true;
	}

	public [Symbol.dispose] (): void
	{
		this.events.removeAllListeners();

		// [FIXED] Uncaught Error: Extension context invalidated.
		this.is_connected.state && this.connection.disconnect();
		this.is_connected.state = false;
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
