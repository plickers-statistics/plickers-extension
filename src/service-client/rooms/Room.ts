
import { SerializerInterface } from 'src/tools-serializer/SerializerInterface';
import { TransferClientEvents, TransferBackgroundEvents } from 'src/tools-transfer/TransferEvents';
import { TransferListener } from 'src/tools-transfer/TransferListener';

import { isTagQuestion } from '../questions-states/isTagQuestion';
import { QuestionStates } from '../questions-states/QuestionStates';
import { QuestionJSON } from '../questions/QuestionAbstract';

import { RoomInfoJSON, RoomInfo } from './RoomInfo';
import { RoomRebooter } from './RoomRebooter';


export type RoomJSON = QuestionJSON & RoomInfoJSON;

export class Room extends RoomRebooter implements SerializerInterface
{
	private question_states ?: QuestionStates;
	private room_info       ?: RoomInfo;
	private transfer        ?: TransferListener<TransferClientEvents, TransferBackgroundEvents>;

	private close (): void
	{
		delete this.room_info;

		this.question_states?.destroy();
		delete this.question_states;

		this.transfer?.close();
		delete this.transfer;
	}

	private open (): void
	{
		const tag_slide_states = this.tag_playing.querySelector('div.nowPlaying-slideContainerInner');

		if (tag_slide_states instanceof HTMLDivElement)
		{
			this.room_info = new RoomInfo(this.tag_playing);

			this.question_states = new QuestionStates(tag_slide_states);
			this.question_states.initialize();

			this.transfer = new TransferListener();
			this.transfer.send('new-question', this.serializeToJSON());
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
				this.open();
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

			this.question_states?.serializeToJSON(),
			this.room_info?.serializeToJSON()
		);
	}
}
