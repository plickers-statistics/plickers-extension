
export abstract class QuestionRebooter
{
	private declare readonly listener;

	protected abstract filterMutation (): void;

	constructor
	(
		protected readonly tag_playing: HTMLDivElement
	)
	{
		this.listener = new MutationObserver(() => this.filterMutation());
	}

	initialize (): void
	{
		console.debug('initialize', this);

		this.listener.observe(this.tag_playing, {
			attributeFilter : [ 'class' ],
			attributes      : true
		});
	}

	destroy (): void
	{
		console.debug('destroy', this);

		this.listener.disconnect();
	}
}
