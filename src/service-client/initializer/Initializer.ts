
import { isTagClassRoom } from '../class-room/isTagClassRoom';
import { ClassRoom } from '../class-room/ClassRoom';

import { InitializerRebooter } from './InitializerRebooter';


export class Initializer extends InitializerRebooter
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

		// destroy
		for (const removedNode of mutation.removedNodes)
		{
			if (isTagClassRoom(removedNode))
			{
				this.class_room?.destroy();
				delete this.class_room;

				break;
			}
		}
	}

	public override destroy (): void
	{
		super.destroy();

		this.class_room?.destroy();
		delete this.class_room;
	}
}
