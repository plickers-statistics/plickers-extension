
export class WebSocketTasks extends WebSocket
{
	private readonly queue: any[] = [];

	private sendQueue (): void
	{
		for (const data of this.queue)
		{
			this.send(data);
		}

		this.queue.length = 0;
	}

	public constructor (url: string | URL, protocols ?: string | string[])
	{
		super(url, protocols);

		const on_opened = () => {
			this.removeEventListener('open', on_opened);
			this.sendQueue();
		};

		this.addEventListener('open', on_opened);
	}

	public override send (data: string | ArrayBufferLike | Blob | ArrayBufferView): void
	{
		this.readyState === this.OPEN
			? super.send(data)
			: this.queue.push(data);
	}
}
