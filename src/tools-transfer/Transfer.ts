
import { TransferClientEvents } from './TransferEvents';
import { TransferListener } from './TransferListener';


export class Transfer extends TransferListener
{
	public dispose (): void
	{
		this.connection.disconnect();
		clearInterval(this.ping);
	}

	public send <TKey extends keyof TransferClientEvents>(type: TKey, data: TransferClientEvents[TKey]): void
	{
		const option = { type, data };

		console.debug('[PORT | Client => Background] message', option);
		this.connection.postMessage(option);
	}
}
