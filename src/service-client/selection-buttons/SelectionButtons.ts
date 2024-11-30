
import { Disposable } from 'src/tools-disposable/Disposable';
import { Serializable } from 'src/tools-serializable/Serializable';
import { Transfer } from 'src/tools-transfer/Transfer';

import { SelectionButtonJSON } from './button/ButtonPressListener';
import { SelectionButton } from './button/SelectionButton';


export class SelectionButtons implements Serializable, Disposable
{
	protected readonly collection = [...this.tag_slide_choices.querySelectorAll<HTMLButtonElement>('button.slide-choice')]
		.map(tag_slide_choice => new SelectionButton(this.transfer, tag_slide_choice));

	private declare readonly AnswersCallback;
	private readonly AnswersRecalculated = (question: any[]) => {
		for (const option of this.collection)
		{
			const find_answer = question.find(answer => answer.identifier === option.identifier);

			option.showVotes(find_answer || {
				percentage : 0,
				votes      : 0,
			})
		}
	};

	public serializeToJSON (): SelectionButtonJSON[]
	{
		return this.collection.map(button => button.serializeToJSON());
	}

	public constructor
	(
		private readonly transfer          : Transfer,
		private readonly tag_slide_choices : HTMLDivElement,
	)
	{
		this.AnswersCallback = transfer.bind('answers_recalculated', (obj: unknown): obj is any => true, this.AnswersRecalculated);
	}

	public dispose (): void
	{
		this.transfer.unbind('answers_recalculated', this.AnswersCallback);

		for (const selection of this.collection)
		{
			selection.dispose();
		}

		this.collection.length = 0;
	}
}
