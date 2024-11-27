
import { Transfer } from 'src/tools-transfer/Transfer';
import { WebSocketTasks } from 'src/tools-websocket-tasks/WebSocketTasks';

import { getQuestionHandler } from '../questions/getQuestionHandler';
import { isTagQuestion } from '../questions/isTagQuestion';
import { QuestionJSON, QuestionAbstract } from '../questions/QuestionAbstract';

import { QuizInfoJSON, QuizInfo } from './QuizInfo';
import { QuizRebooter } from './QuizRebooter';


export type QuizJSON = QuestionJSON & QuizInfoJSON;

export class Quiz extends QuizRebooter
{
	private readonly transfer  = new Transfer(new WebSocketTasks('ws://127.0.0.1:8000/api/websocket'));
	private readonly quiz_info = new QuizInfo(this.tag_playing);

	private question ?: QuestionAbstract;

	private close (): void
	{
		this.question?.destroy();
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

		this.transfer.send('new_quiz', this.quiz_info.serializeToJSON());
		this.open(this.tag_playing);
	}

	public override destroy (): void
	{
		super.destroy();

		this.transfer.close();
		this.close();
	}
}
