
import { MutationFilter } from 'src/tools-mutation/MutationFilter';


export abstract class QuestionStatesRebooter extends MutationFilter
{
	public constructor
	(
		protected readonly tag_slide_states: HTMLDivElement
	)
	{
		super();
	}

	public override initialize (): void
	{
		super.initialize();

		this.listener.observe(this.tag_slide_states, {
			attributeFilter : [ 'class' ],
			attributes      : true
		});
	}
}
