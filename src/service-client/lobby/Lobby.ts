
import { isTagClassRoom } from '../class-room/isTagClassRoom';
import { ClassRoom } from '../class-room/ClassRoom';

import { LobbyRebooter } from './LobbyRebooter';


export class Lobby extends LobbyRebooter
{
	private class_room ?: ClassRoom;

	protected override filterMutation (mutation: MutationRecord): void
	{
		// initialize
		for (const addedNode of mutation.addedNodes)
		{
			if (isTagClassRoom(addedNode))
			{
				this.class_room = new ClassRoom(addedNode);
				this.class_room.initialize();

				break;
			}
		}

		// dispose
		for (const removedNode of mutation.removedNodes)
		{
			if (isTagClassRoom(removedNode))
			{
				this.class_room?.dispose();
				delete this.class_room;

				break;
			}
		}
	}

	public override dispose (): void
	{
		super.dispose();

		this.class_room?.dispose();
		delete this.class_room;
	}
}
