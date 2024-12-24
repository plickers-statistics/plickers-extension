
import { MutationListener } from 'src/tools-mutation/MutationListener';
import { Transfer } from 'src/tools-transfer/Transfer';

import { getQuestionTemplate } from '../questions/getQuestionTemplate';
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

	/**
	 * @returns Возвращается Promise, чтобы перехватить ошибку, если таковая возникла.
	 */
	private async open (tag_question_container: HTMLDivElement): Promise<void>
	{
		const tag_slide = tag_question_container.querySelectorWithCheck('div.slide', HTMLDivElement);

		const template = getQuestionTemplate(tag_slide);
		this.question  = new template(this.transfer, tag_slide);

		this.transfer.send('new_question', this.question.serializeToJSON());
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
