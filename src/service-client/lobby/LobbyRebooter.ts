
import { MutationListener } from 'src/tools-mutation/MutationListener';


export abstract class LobbyRebooter extends MutationListener
{
	public constructor
	(
		private readonly tag_root: HTMLDivElement
	)
	{
		super();
	}

	public override initialize (): void
	{
		super.initialize();

		this.listener.observe(this.tag_root, {
			childList: true
		});
	}
}
