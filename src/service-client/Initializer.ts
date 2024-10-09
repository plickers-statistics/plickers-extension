
import { Playing } from './playing/Playing';
import { Rebooter } from './Rebooter';


function isPlayingContainer (node: Node): node is HTMLDivElement
{
	return node instanceof HTMLDivElement
		&& node.classList.contains('nowPlayingContainer');
}

export class Initializer extends Rebooter
{
	private playing ?: Playing;

	protected override filterMutation (mutation: MutationRecord): void
	{
		for (const addedNode of mutation.addedNodes)
		{
			if (isPlayingContainer(addedNode))
			{
				const tag_playing = addedNode.querySelectorWithCheck('div.nowPlaying', HTMLDivElement);

				this.playing = new Playing(tag_playing);
				this.playing.initialize();

				break;
			}
		}

		for (const removedNode of mutation.removedNodes)
		{
			if (isPlayingContainer(removedNode))
			{
				this.playing?.destroy();
				delete this.playing;

				break;
			}
		}
	}
}
