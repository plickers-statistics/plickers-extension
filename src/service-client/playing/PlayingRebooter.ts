
import { InitializerAbstract } from 'src/tools-initializer/InitializerAbstract';


export abstract class PlayingRebooter extends InitializerAbstract
{
	private declare readonly listener;

	protected abstract filterMutation (): void;

	constructor
	(
		protected readonly tag_playing: HTMLDivElement
	)
	{
		super();

		this.listener = new MutationObserver(() => this.filterMutation());
	}

	public override initialize (): void
	{
		super.initialize();

		this.filterMutation();

		this.listener.observe(this.tag_playing, {
			attributeFilter : [ 'class' ],
			attributes      : true
		});
	}

	public override destroy (): void
	{
		super.destroy();

		this.listener.disconnect();
	}
}
