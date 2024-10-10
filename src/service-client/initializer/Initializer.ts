
import { isTagPlaying } from '../playing/isTagPlaying';
import { Playing } from '../playing/Playing';

import { InitializerRebooter } from './InitializerRebooter';


export class Initializer extends InitializerRebooter
{
	private playing ?: Playing;

	protected override filterMutation (mutation: MutationRecord): void
	{
		// initialize
		for (const addedNode of mutation.addedNodes)
		{
			if (isTagPlaying(addedNode))
			{
				const tag_playing = addedNode.querySelectorWithCheck('div.nowPlaying', HTMLDivElement);

				this.playing = new Playing(tag_playing);
				this.playing.initialize();

				break;
			}
		}

		// destroy
		for (const removedNode of mutation.removedNodes)
		{
			if (isTagPlaying(removedNode))
			{
				this.playing?.destroy();
				delete this.playing;

				break;
			}
		}
	}

	public override destroy (): void
	{
		super.destroy();

		this.playing?.destroy();
		delete this.playing;
	}
}
