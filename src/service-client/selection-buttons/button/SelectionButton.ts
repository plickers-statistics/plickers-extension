
import { MutationListener } from 'src/tools-mutation/MutationListener';
import { Serializable } from 'src/tools-serializable/Serializable';
import { Transfer } from 'src/tools-transfer/Transfer';

import { ButtonPressListener } from './ButtonPressListener';
import { ShowStatisticsButton } from './ShowStatisticsButton';


export class SelectionButton extends MutationListener implements Serializable
{
	private readonly show_statistics = new ShowStatisticsButton(this.transfer, this.tag_slide_choice);
	private readonly press_listener  = new ButtonPressListener(this.transfer, this.tag_slide_choice);

	public readonly showVotes       = this.show_statistics.showVotes.bind(this.show_statistics);
	public readonly serializeToJSON = this.press_listener.serializeToJSON.bind(this.press_listener);
	public readonly identifier      = this.press_listener.identifier;

	protected override get ignored_dispose_properties (): string[]
	{
		return [ 'transfer' ];
	}

	protected override filterMutations (): void
	{
		this.show_statistics.mutationsListener();
		this.press_listener.mutationsListener();
	}

	public constructor
	(
		private readonly transfer         : Transfer,
		private readonly tag_slide_choice : HTMLButtonElement,
	)
	{
		super();

		this.filterMutations();

		this.listener.observe(this.tag_slide_choice, {
			attributeFilter   : [ 'class' ],
			attributeOldValue : true,
			attributes        : true
		});
	}
}
