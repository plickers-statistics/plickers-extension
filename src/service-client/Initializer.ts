
import { Question } from './questions/Question';
import { Rebooter } from './Rebooter';


function isPlayingContainer (node: Node): node is HTMLDivElement
{
	return node instanceof HTMLDivElement
		&& node.classList.contains('nowPlayingContainer');
}

export class Initializer extends Rebooter
{
	private question ?: Question;

	protected override filterMutation (mutation: MutationRecord): void
	{
		for (const addedNode of mutation.addedNodes)
		{
			if (isPlayingContainer(addedNode))
			{
				const tag_playing = addedNode.querySelectorWithCheck('div.nowPlaying', HTMLDivElement);

				this.question = new Question(tag_playing);
				this.question.initialize();

				break;
			}
		}

		for (const removedNode of mutation.removedNodes)
		{
			if (isPlayingContainer(removedNode))
			{
				this.question?.destroy();
				delete this.question;

				break;
			}
		}
	}
}
