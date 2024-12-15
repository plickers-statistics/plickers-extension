
import { MutationListener } from 'src/tools-mutation/MutationListener';

import { ClassRoom } from '../class-room/ClassRoom';
import { isTagClassRoom } from '../class-room/isTagClassRoom';


export class Lobby extends MutationListener
{
	private class_room ?: ClassRoom = undefined;

	protected override mutationListener (mutation: MutationRecord): void
	{
		// initialize
		for (const addedNode of mutation.addedNodes)
		{
			if (isTagClassRoom(addedNode))
			{
				this.class_room = new ClassRoom(addedNode);
				break;
			}
		}

		// dispose
		for (const removedNode of mutation.removedNodes)
		{
			if (isTagClassRoom(removedNode))
			{
				this.class_room?.[Symbol.dispose]();
				this.class_room = undefined;

				break;
			}
		}
	}

	public constructor
	(
		private readonly tag_root: HTMLDivElement
	)
	{
		super();

		this.listener.observe(tag_root, {
			childList: true
		});
	}
}
