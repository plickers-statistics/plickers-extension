
import { MutationFilter } from 'src/tools-mutation/MutationFilter';


export abstract class LobbyRebooter extends MutationFilter
{
	public constructor
	(
		protected readonly tag_playing_container: HTMLDivElement
	)
	{
		super();
	}

	public override initialize (): void
	{
		super.initialize();

		this.listener.observe(this.tag_playing_container, {
			childList: true
		});
	}
}
