
import { MutationFilter } from 'src/tools-mutation/MutationFilter';


export abstract class PlayingRebooter extends MutationFilter
{
	public constructor
	(
		protected readonly tag_playing: HTMLDivElement
	)
	{
		super();
	}

	public override initialize (): void
	{
		super.initialize();

		this.filterMutation();

		this.listener.observe(this.tag_playing, {
			// change question status
			attributeFilter : [ 'class' ],
			attributes      : true,

			// another question
			childList: true
		});
	}
}
