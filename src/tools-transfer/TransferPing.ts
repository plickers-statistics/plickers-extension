
import { TransferListener } from './TransferListener';


export abstract class TransferPing extends TransferListener
{
	private readonly ping_identifier = setInterval(() => this.connection.postMessage({ type: 'ping' }), 10_000);

	public constructor (...options: ConstructorParameters<typeof TransferListener>)
	{
		super(...options);

		this.connection.onDisconnect.addListener(() => clearInterval(this.ping_identifier));
	}

	public override dispose (): void
	{
		super.dispose();

		clearInterval(this.ping_identifier);
	}
}
