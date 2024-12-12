
type TypeSendOptions = Parameters< WebSocket['send'] >;

export class WebSocketTasks extends WebSocket
{
	private readonly queue: TypeSendOptions[] = [];

	private sendQueue (): void
	{
		this.queue.forEach(options => this.send(...options));
		this.queue.length = 0;
	}

	public constructor (...options: ConstructorParameters<typeof WebSocket>)
	{
		super(...options);

		this.addEventListener('open', this.sendQueue.bind(this), { once: true });
	}

	public override send (...options: TypeSendOptions): void
	{
		this.readyState === this.OPEN
			? super.send(...options)
			: this.queue.push(options);
	}
}
