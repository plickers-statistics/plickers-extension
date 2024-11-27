
import { Disposable } from 'src/tools-disposable/Disposable';
import { Transfer } from 'src/tools-transfer/Transfer';

import { SelectionButton } from './SelectionButton';


export abstract class SelectionButtonsCollection extends Disposable
{
	protected readonly collection: SelectionButton[] = [];

	public constructor
	(
		private readonly transfer          : Transfer,
		private readonly tag_slide_choices : HTMLDivElement,
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
			const selection = new SelectionButton(this.transfer, tag_slide_choice);
			selection.initialize();

			this.collection.push(selection);
		}
	}

	public override dispose (): void
	{
		super.dispose();

		for (const selection of this.collection)
		{
			selection.dispose();
		}

		this.collection.length = 0;
	}
}
