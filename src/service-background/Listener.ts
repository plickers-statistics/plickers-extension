
import { WebSocketTasks } from 'src/tools-websocket-tasks/WebSocketTasks';

import { Runtime } from 'webextension-polyfill';


export class Listener
{
	private readonly websocket = new WebSocketTasks('ws://78.29.34.5:3002/api/ws');

	public constructor
	(
		private readonly connection: Runtime.Port
	)
	{
		this.connection.onDisconnect.addListener(() => this.websocket.close());
		this.websocket.addEventListener('close', () => this.connection.disconnect());

		// ===== ===== ===== ===== =====

		// port => websocket
		this.connection.onMessage.addListener(message => {
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
