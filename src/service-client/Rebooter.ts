
import { MutationFilter } from 'src/tools-mutation/MutationFilter';


export abstract class Rebooter extends MutationFilter
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
