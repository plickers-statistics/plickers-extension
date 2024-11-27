
import { MutationListener } from 'src/tools-mutation/MutationListener';


export abstract class RoomRebooter extends MutationListener
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

		this.listener.observe(this.tag_playing, {
			childList: true
		});
	}
}
