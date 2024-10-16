
import { SerializerInterface } from 'src/tools-serializer/SerializerInterface';

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

	private restart (): void
	{
		const tag_slide_states = this.tag_playing.querySelector('div.nowPlaying-slideContainerInner');

		if (tag_slide_states instanceof HTMLDivElement)
		{
			this.question_states?.destroy();
			delete this.question_states;

			this.room_info = new RoomInfo(this.tag_playing);

			this.question_states = new QuestionStates(tag_slide_states);
			this.question_states.initialize();
		}
	}

	protected override filterMutation (mutation: MutationRecord): void
	{
		for (const addedNode of mutation.addedNodes)
		{
			if (isTagQuestion(addedNode))
			{
				this.restart();
			}
		}
	}

	// ===== ===== ===== ===== =====

	public override initialize (): void
	{
		super.initialize();

		this.restart();
	}

	public override destroy (): void
	{
		super.destroy();

		this.question_states?.destroy();
		delete this.question_states;
	}

	public serializeToJSON (): RoomJSON
	{
		return Object.assign(
			{},

			this.question_states?.serializeToJSON(),
			this.room_info?.serializeToJSON()
		);
	}
}
