
import { Runtime } from 'webextension-polyfill';

import { ServerEnvironment } from 'src/tools-environment/ServerEnvironment';
import { WebSocketTasks } from 'src/tools-websocket-tasks/WebSocketTasks';


export class Listener
{
	private readonly websocket  = new WebSocketTasks(ServerEnvironment.WEBSOCKET_ADDRESS);
	private readonly identifier = performance.now();

	private declare closed_resolve : () => void;
	public readonly closed_promise = new Promise<void>(resolve => this.closed_resolve = resolve);

	private readonly close = () => {
		this.connection.onDisconnect.removeListener(this.close);

		this.websocket.removeEventListener('close', this.close);
		this.websocket.removeEventListener('open', this.open);

		this.connection.disconnect();
		this.websocket.close();

		console.debug('CLOSED', this.identifier);
		this.closed_resolve();
	};

	private readonly open = () => {
		console.debug('OPENED', this.identifier);

		this.connection.postMessage({
			type: 'opened'
		});
	};

	public constructor
	(
		private readonly connection: Runtime.Port
	)
	{
		this.connection.onDisconnect.addListener(this.close);
		this.websocket.addEventListener('close', this.close);

		// ===== ===== ===== ===== =====

		// port => websocket
		this.connection.onMessage.addListener(message => {
			if ((message as any).type === 'ping')
			{
				return;
			}

			this.websocket.send(JSON.stringify(message));
		});

		// websocket => port
		this.websocket.addEventListener('message', ev => {
			const message = ev.data;
			const data    = JSON.parse(message);

			this.connection.postMessage(data);
		});

		// ===== ===== ===== ===== =====

		this.websocket.addEventListener('open', this.open, { once: true });
	}
}
