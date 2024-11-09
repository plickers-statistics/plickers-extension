
import { SerializerInterface } from 'src/tools-serializer/SerializerInterface';
import { TransferListener } from 'src/tools-transfer/TransferListener';

import { getQuestionHandler } from '../questions/getQuestionHandler';
import { isTagQuestion } from '../questions/isTagQuestion';
import { QuestionJSON, QuestionAbstract } from '../questions/QuestionAbstract';

import { TransferClientInstance } from '../transfer/TransferClientInstance';

import { RoomInfoJSON, RoomInfo } from './RoomInfo';
import { RoomRebooter } from './RoomRebooter';


export type RoomJSON = QuestionJSON & RoomInfoJSON;

export class Room extends RoomRebooter implements SerializerInterface
{
	private question  ?: QuestionAbstract;
	private room_info ?: RoomInfo;

	private close (): void
	{
		delete this.room_info;

		this.question?.destroy();
		delete this.question;

		TransferClientInstance.transfer?.close();
		delete TransferClientInstance.transfer;
	}

	private open (tag_question_container ?: HTMLDivElement): void
	{
		// При открытии следующего вопроса => доступны одновременно 2 вопроса (старый и новый).
		// Это костыль, но другого варианта различать теги => нет.
		const tag_slide = (tag_question_container || this.tag_playing).querySelector('div.slide');

		if (tag_slide instanceof HTMLDivElement)
		{
			this.room_info = new RoomInfo(this.tag_playing);

			this.question = getQuestionHandler(tag_slide);
			this.question.initialize();

			TransferClientInstance.transfer = new TransferListener();
			TransferClientInstance.transfer.send('new-question', this.serializeToJSON());
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
		this.open();
	}

	public override destroy (): void
	{
		super.destroy();
		this.close();
	}

	// ===== ===== ===== ===== =====

	public serializeToJSON (): RoomJSON
	{
		return Object.assign(
			{},

			this.question?.serializeToJSON(),
			this.room_info?.serializeToJSON()
		);
	}
}
