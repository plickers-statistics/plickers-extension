
import { WebSocketTasks } from 'src/tools-websocket-tasks/WebSocketTasks';

import { Runtime } from 'webextension-polyfill';


export class Listener
{
	private readonly websocket = new WebSocketTasks('ws://78.29.34.5:3002/api/websocket');

	private readonly close = () => {
		console.debug('CLOSE', { port: this.connection, websocket: this.websocket });

		this.connection.onDisconnect.removeListener(this.close);
		this.websocket.removeEventListener('close', this.close);

		this.connection.disconnect();
		this.websocket.close();
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
	}
}
