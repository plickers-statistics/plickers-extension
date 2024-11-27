
import { MutationListener } from 'src/tools-mutation/MutationListener';


export abstract class ClassRoomRebooter extends MutationListener
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
