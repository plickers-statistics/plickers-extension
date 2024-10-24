
import { TransferBackgroundEvents, TransferClientEvents } from 'src/tools-transfer/TransferEvents';
import { TransferListener } from 'src/tools-transfer/TransferListener';

import { Runtime } from 'webextension-polyfill';


export class Listener
{
	public declare readonly transfer;

	public constructor (connection: Runtime.Port)
	{
		this.transfer = new TransferListener<TransferBackgroundEvents, TransferClientEvents>(connection);
	}
}
