
import { Transfer } from 'src/tools-transfer/Transfer';
import { WebSocketTasks } from 'src/tools-websocket-tasks/WebSocketTasks';

import { getQuestionHandler } from '../questions/getQuestionHandler';
import { isTagQuestion } from '../questions/isTagQuestion';
import { QuestionAbstract } from '../questions/QuestionAbstract';

import { getClassRoomJSON } from './getClassRoomJSON';
import { QuizRebooter } from './QuizRebooter';


export class Quiz extends QuizRebooter
{
	private readonly transfer        = new Transfer(new WebSocketTasks('ws://127.0.0.1:8000/api/websocket'));
	private readonly class_room_info = getClassRoomJSON(this.tag_playing);

	private question ?: QuestionAbstract;

	private close (): void
	{
		this.question?.dispose();
		delete this.question;
	}

	private open (tag_question_container: HTMLDivElement): void
	{
		// При открытии следующего вопроса => доступны одновременно 2 вопроса (старый и новый).
		// Это костыль, но другого варианта различать теги => нет.
		const tag_slide = tag_question_container.querySelector('div.slide');

		if (tag_slide instanceof HTMLDivElement)
		{
			this.question = getQuestionHandler(this.transfer, tag_slide);
			this.question.initialize();

			this.transfer.send('new_question', this.question.serializeToJSON());
		}
	}

	// ===== ===== ===== ===== =====

	/** next question (restart) */
	protected override filterMutation (mutation: MutationRecord): void
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

	public override initialize (): void
	{
		super.initialize();

		this.transfer.send('new_quiz', this.class_room_info);
		this.open(this.tag_playing);
	}

	public override dispose (): void
	{
		super.dispose();

		this.transfer.close();
		this.close();
	}
}
