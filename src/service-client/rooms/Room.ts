
import { Transfer } from 'src/tools-transfer/Transfer';
import { WebSocketTasks } from 'src/tools-websocket-tasks/WebSocketTasks';

import { getQuestionHandler } from '../questions/getQuestionHandler';
import { isTagQuestion } from '../questions/isTagQuestion';
import { QuestionJSON, QuestionAbstract } from '../questions/QuestionAbstract';

import { RoomInfoJSON, RoomInfo } from './RoomInfo';
import { RoomRebooter } from './RoomRebooter';


export type RoomJSON = QuestionJSON & RoomInfoJSON;

export class Room extends RoomRebooter
{
	private readonly transfer = new Transfer(new WebSocketTasks('ws://127.0.0.1:8000/api/websocket'));

	private question  ?: QuestionAbstract;
	private room_info ?: RoomInfo;

	private close (): void
	{
		delete this.room_info;

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

		this.room_info = new RoomInfo(this.tag_playing);
		this.transfer.send('new_quiz', this.room_info.serializeToJSON());

		this.open(this.tag_playing);
	}

	public override destroy (): void
	{
		super.destroy();

		this.transfer.close();
		this.close();
	}
}
