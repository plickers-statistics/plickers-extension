
import { Question } from './Question';
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
				this.question = new Question(addedNode);
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
