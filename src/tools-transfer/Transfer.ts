
import { TransferClientEvents } from './TransferEvents';
import { TransferPing } from './TransferPing';


export class Transfer extends TransferPing
{
	public send <TKey extends keyof TransferClientEvents>(type: TKey, data: TransferClientEvents[TKey]): void
	{
		const option = { type, data };

		// [FIXED] Uncaught Error: Extension context invalidated.
		console.debug('[PORT | Client => Background] message', option);
		this.is_connected.state && this.connection.postMessage(option);
	}
}
