
import { InitializerAbstract } from 'src/tools-initializer/InitializerAbstract';

import { SelectionButton } from './SelectionButton';


export abstract class SelectionButtonsCollection extends InitializerAbstract
{
	private readonly collection: SelectionButton[] = [];

	public constructor
	(
		private readonly tag_slide_choices: HTMLDivElement
	)
	{
		super();
	}

	public override initialize (): void
	{
		super.initialize();

		// ===== ===== ===== ===== =====

		const tags_slide_choice = this.tag_slide_choices.querySelectorAll<HTMLButtonElement>('button.slide-choice');

		for (const tag_slide_choice of tags_slide_choice)
		{
			const selection = new SelectionButton(tag_slide_choice);
			selection.initialize();

			this.collection.push(selection);
		}
	}

	public override destroy (): void
	{
		super.destroy();

		for (const selection of this.collection)
		{
			selection.destroy();
		}

		this.collection.length = 0;
	}
}
