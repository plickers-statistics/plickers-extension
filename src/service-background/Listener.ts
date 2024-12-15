
import { Runtime } from 'webextension-polyfill';

import { ServerEnvironment } from 'src/tools-environment/ServerEnvironment';
import { WebSocketTasks } from 'src/tools-websocket-tasks/WebSocketTasks';
import { isPackageDTO } from 'src/tools-DTOs/PackageDTO';


export class Listener
{
	private readonly websocket  = new WebSocketTasks(ServerEnvironment.WEBSOCKET_ADDRESS);
	private readonly identifier = performance.now();

	private declare closed_resolve : () => void;
	public readonly closed_promise = new Promise<void>(resolve => this.closed_resolve = resolve);

	private readonly resend_port_to_websocket = (message: unknown) => {
		const json = JSON.stringify(message);

		if (isPackageDTO(message) === false)
		{
			throw new TypeError(json);
		}

		if (message.type === 'ping')
		{
			return;
		}

		console.debug('MESSAGE | PORT => WEBSOCKET', message);
		this.websocket.send(json);
	};

	private readonly resend_websocket_to_port = (event: MessageEvent) => {
		const message = event.data;
		const data    = JSON.parse(message);

		if (isPackageDTO(data) === false)
		{
			throw new TypeError(message);
		}

		console.debug('MESSAGE | WEBSOCKET => PORT', data);
		this.port.postMessage(data);
	};

	private readonly close = () => {
		this.port.onDisconnect.removeListener(this.close);
		this.port.onMessage.removeListener(this.resend_port_to_websocket);

		this.websocket.removeEventListener('close', this.close);
		this.websocket.removeEventListener('open', this.open);
		this.websocket.removeEventListener('message', this.resend_websocket_to_port);

		this.port.disconnect();
		this.websocket.close();

		console.debug('CLOSED', this.identifier);
		this.closed_resolve();
	};

	private readonly open = () => {
		console.debug('OPENED', this.identifier);

		this.port.postMessage({
			type: 'opened'
		});
	};

	public constructor
	(
		private readonly port: Runtime.Port
	)
	{
		this.port.onDisconnect.addListener(this.close);
		this.port.onMessage.addListener(this.resend_port_to_websocket);

		this.websocket.addEventListener('close', this.close, { once: true });
		this.websocket.addEventListener('open', this.open, { once: true });
		this.websocket.addEventListener('message', this.resend_websocket_to_port);
	}
}
