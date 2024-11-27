
import { EventEmitter } from 'events';

import { isPackageDTO } from 'src/tools-DTOs/PackageDTO';

import { TransferServerEvents } from './TransferEvents';
import { TypedChecker, TypedCallback } from './Types';


export abstract class TransferListener
{
	private readonly events = new EventEmitter();

	public constructor
	(
		protected readonly connection: WebSocket
	)
	{
		connection.addEventListener('message', event => {
			const buffer = event.data;
			const option = JSON.parse(buffer);

			isPackageDTO(option) && this.events.emit(option.type, option.data);
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

	public readonly unbind = this.events.removeListener;
}
