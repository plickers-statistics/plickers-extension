
import { isTagRoom } from '../rooms/isTagRoom';
import { Room } from '../rooms/Room';

import { InitializerRebooter } from './InitializerRebooter';


export class Initializer extends InitializerRebooter
{
	private room ?: Room;

	protected override filterMutation (mutation: MutationRecord): void
	{
		// initialize
		for (const addedNode of mutation.addedNodes)
		{
			if (isTagRoom(addedNode))
			{
				const tag_playing = addedNode.querySelectorWithCheck('div.nowPlaying', HTMLDivElement);

				this.room = new Room(tag_playing);
				this.room.initialize();

				break;
			}
		}

		// destroy
		for (const removedNode of mutation.removedNodes)
		{
			if (isTagRoom(removedNode))
			{
				this.room?.destroy();
				delete this.room;

				break;
			}
		}
	}

	public override destroy (): void
	{
		super.destroy();

		this.room?.destroy();
		delete this.room;
	}
}
