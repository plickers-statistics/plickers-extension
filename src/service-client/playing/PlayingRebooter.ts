
import { InitializerInterface } from 'src/tools-initializer/InitializerInterface';


export abstract class PlayingRebooter implements InitializerInterface
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
		this.filterMutation();

		this.listener.observe(this.tag_playing, {
			attributeFilter : [ 'class' ],
			attributes      : true
		});
	}

	destroy (): void
	{
		this.listener.disconnect();
	}
}
