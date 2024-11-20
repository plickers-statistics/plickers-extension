
type TypeSendOptions = string | ArrayBufferLike | Blob | ArrayBufferView;

export class WebSocketTasks extends WebSocket
{
	private readonly queue: TypeSendOptions[] = [];

	private sendQueue (): void
	{
		for (const data of this.queue)
		{
			this.send(data);
		}

		this.queue.length = 0;
	}

	public constructor (...options: ConstructorParameters<typeof WebSocket>)
	{
		super(...options);

		const on_opened = () => {
			this.removeEventListener('open', on_opened);
			this.sendQueue();
		};

		this.addEventListener('open', on_opened);
	}

	public override send (data: TypeSendOptions): void
	{
		this.readyState === this.OPEN
			? super.send(data)
			: this.queue.push(data);
	}
}
