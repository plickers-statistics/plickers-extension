
import { EventEmitter } from 'events';
import { Runtime } from 'webextension-polyfill';

import { isPackageDTO } from 'src/tools-packages/PackageDTO';

import { Transfer } from './Transfer';
import { TransferEvents } from './TransferEvents';
import { TypedChecker, TypedCallback } from './Types';


export class TransferListener
<
	TSenderEvents   extends TransferEvents,
	TListenerEvents extends TransferEvents,
> extends Transfer<TSenderEvents>
{
	private readonly events = new EventEmitter();

	public constructor (connection ?: Runtime.Port)
	{
		super(connection);

		this.events.addListener('message', message => isPackageDTO(message) && this.events.emit(message.type, message.data));

		this.connection.onDisconnect.addListener(()      => this.events.emit('disconnect'));
		this.connection.onMessage   .addListener(message => this.events.emit('message', message));
	}

	// ===== ===== ===== ===== =====

	public bind <THandler>(type: keyof TListenerEvents & string, checker: TypedChecker<THandler>, handler: TypedCallback<THandler>): void
	{
		const safeCallback = function (message: unknown): void
		{
			checker(message)
				? handler(message)
				: console.error('invalid format', { type, message });
		};

		this.events.addListener(type, safeCallback);
	}
}
