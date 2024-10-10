
import { getQuestionHandler } from '../questions/getQuestionHandler';
import { isQuestionContainer } from '../questions/isQuestionContainer';
import { QuestionAbstract } from '../questions/QuestionAbstract';

import { PlayingRebooter } from './PlayingRebooter';
import { PlayingStates } from './PlayingStates';


export class Playing extends PlayingRebooter
{
	private question ?: QuestionAbstract;

	/** change question status */
	private filterAttributes (): void
	{
		// ===== ===== ===== ===== =====
		// initialize
		// ===== ===== ===== ===== =====

		const is_preview = this.tag_playing.classList.contains(PlayingStates.PREVIEW);
		const is_options = this.tag_playing.classList.contains(PlayingStates.OPTIONS);

		if (is_preview || is_options)
		{
			this.question = getQuestionHandler(this.tag_playing);
			this.question.initialize();

			return;
		}

		// ===== ===== ===== ===== =====
		// destroy
		// ===== ===== ===== ===== =====

		const is_waiting = this.tag_playing.classList.contains(PlayingStates.WAITING);

		if (is_waiting)
		{
			this.question?.destroy();
			delete this.question;

			return;
		}

		// ===== ===== ===== ===== =====
		// unknown
		// ===== ===== ===== ===== =====

		throw new TypeError();
	}

	/** another question */
	private filterElements (mutation: MutationRecord): void
	{
		// re-initialize
		for (const addedNode of mutation.addedNodes)
		{
			if (isQuestionContainer(addedNode))
			{
				this.question?.destroy();

				this.question = getQuestionHandler(this.tag_playing);
				this.question.initialize();
			}
		}
	}

	protected override filterMutation (mutation: MutationRecord): void
	{
		switch (mutation.type)
		{
			case 'attributes': return this.filterAttributes();
			case 'childList':  return this.filterElements(mutation);
		}

		throw new TypeError();
	}

	// ===== ===== ===== ===== =====

	public override initialize (): void
	{
		super.initialize();

		this.filterAttributes();
	}

	public override destroy (): void
	{
		super.destroy();

		this.question?.destroy();
		delete this.question;
	}
}
