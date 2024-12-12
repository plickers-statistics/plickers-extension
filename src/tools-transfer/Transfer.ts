
import { TransferClientEvents } from './TransferEvents';
import { TransferPing } from './TransferPing';


export class Transfer extends TransferPing
{
	private readonly queue: any[] = [];

	private sendQueue (): void
	{
		this.is_connected.state && this.queue.forEach(option => this.connection.postMessage(option));
		this.queue.length = 0;
	}

	public send <TKey extends keyof TransferClientEvents>(type: TKey, data: TransferClientEvents[TKey]): void
	{
		const option = { type, data };

		console.debug('[PORT | Client => Background] message', option);

		// [FIXED] Uncaught Error: Extension context invalidated.
		if (typeof this.is_connected.state === 'boolean')
		{
			this.is_connected.state && this.connection.postMessage(option);
		}
		else
		{
			this.queue.push(option);
		}
	}

	public constructor (...options: ConstructorParameters<typeof TransferPing>)
	{
		super(...options);

		this.is_connected.events.once('refresh', this.sendQueue.bind(this));
	}
}
