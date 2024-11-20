
import { TransferClientEvents } from './TransferEvents';
import { TransferListener } from './TransferListener';


export class Transfer extends TransferListener
{
	public readonly close = this.connection.close;

	public send <TKey extends keyof TransferClientEvents>(type: TKey, data: TransferClientEvents[TKey]): void
	{
		const option = { type, data };
		const buffer = JSON.stringify(option);

		this.connection.send(buffer);
	}
}
