
import { isTagQuestion } from '../questions-states/isTagQuestion';
import { QuestionStates } from '../questions-states/QuestionStates';

import { PlayingRebooter } from './PlayingRebooter';


export class Playing extends PlayingRebooter
{
	private question_states ?: QuestionStates;

	private restart (): void
	{
		const tag_slide_states = this.tag_playing.querySelector('div.nowPlaying-slideContainerInner');

		if (tag_slide_states instanceof HTMLDivElement)
		{
			this.question_states?.destroy();
			delete this.question_states;

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
}
