
import { MutationListener } from 'src/tools-mutation/MutationListener';
import { Transfer } from 'src/tools-transfer/Transfer';

import { getQuestionHandler } from '../questions/getQuestionHandler';
import { isTagQuestion } from '../questions/isTagQuestion';
import { QuestionAbstract } from '../questions/QuestionAbstract';

import { getClassRoomJSON } from './getClassRoomJSON';


export class Quiz extends MutationListener
{
	private readonly class_room_info = getClassRoomJSON(this.tag_playing);
	private readonly transfer        = new Transfer();

	private question ?: QuestionAbstract = undefined;

	private close (): void
	{
		this.question?.[Symbol.dispose]();
		this.question = undefined;
	}

	private open (tag_question_container: HTMLDivElement): void
	{
		// При открытии следующего вопроса => доступны одновременно 2 вопроса (старый и новый).
		// Это костыль, но другого варианта различать теги => нет.
		const tag_slide = tag_question_container.querySelector('div.slide');

		if (tag_slide instanceof HTMLDivElement)
		{
			this.question = getQuestionHandler(this.transfer, tag_slide);

			this.transfer.send('new_question', this.question.serializeToJSON());
		}
	}

	// ===== ===== ===== ===== =====

	/** next question (restart) */
	protected override mutationListener (mutation: MutationRecord): void
	{
		for (const addedNode of mutation.addedNodes)
		{
			if (isTagQuestion(addedNode))
			{
				this.close();
				this.open(addedNode);
			}
		}
	}

	public constructor
	(
		protected readonly tag_playing: HTMLDivElement
	)
	{
		super();

		this.transfer.send('new_quiz', this.class_room_info);
		this.open(tag_playing);

		this.listener.observe(tag_playing, {
			childList: true
		});
	}
}
