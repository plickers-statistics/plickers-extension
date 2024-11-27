
import { MutationListener } from 'src/tools-mutation/MutationListener';
import { Transfer } from 'src/tools-transfer/Transfer';


export abstract class SelectionButtonListener extends MutationListener
{
	public constructor
	(
		protected readonly transfer         : Transfer,
		protected readonly tag_slide_choice : HTMLButtonElement,
	)
	{
		super();
	}

	protected override filterMutation (mutation: MutationRecord): void
	{
		// При нажатии обновляются свойства варианта.

		// mutation.type          => 'attributes';
		// mutation.attributeName => 'class';

		if (mutation.oldValue?.includes('slide-choice--showResponseCounts'))
		{
			this.tag_slide_choice.classList.replace('slide-choice--notShowResponseCounts', 'slide-choice--showResponseCounts');
		}
	}

	public override initialize (): void
	{
		super.initialize();

		this.listener.observe(this.tag_slide_choice, {
			attributeFilter   : [ 'class' ],
			attributeOldValue : true,
			attributes        : true
		});
	}
}
