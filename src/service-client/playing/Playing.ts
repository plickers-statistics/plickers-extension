
import { getQuestionHandler } from '../questions/getQuestionHandler';
import { QuestionAbstract } from '../questions/QuestionAbstract';
import { PlayingRebooter } from './PlayingRebooter';
import { PlayingStates } from './PlayingStates';


export class Playing extends PlayingRebooter
{
	private question ?: QuestionAbstract;

	protected override filterMutation (): void
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

	public override destroy (): void
	{
		super.destroy();

		this.question?.destroy();
		delete this.question;
	}
}
