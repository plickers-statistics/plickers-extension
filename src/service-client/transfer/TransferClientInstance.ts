
import { TransferBackgroundEvents, TransferClientEvents } from 'src/tools-transfer/TransferEvents';
import { TransferListener } from 'src/tools-transfer/TransferListener';


export class TransferClientInstance
{
	public static transfer ?: TransferListener<TransferClientEvents, TransferBackgroundEvents>;
}
