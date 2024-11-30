
type TypeSendOptions = Parameters< WebSocket['send'] >;

export class WebSocketTasks extends WebSocket
{
	private readonly queue: TypeSendOptions[] = [];

	private sendQueue (): void
	{
		for (const options of this.queue)
		{
			this.send(...options);
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

	public override send (...options: TypeSendOptions): void
	{
		this.readyState === this.OPEN
			? super.send(...options)
			: this.queue.push(options);
	}
}
