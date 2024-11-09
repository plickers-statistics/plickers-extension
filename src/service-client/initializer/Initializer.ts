
import { isTagLobby } from '../lobby/isTagLobby';
import { Lobby } from '../lobby/Lobby';

import { InitializerRebooter } from './InitializerRebooter';


export class Initializer extends InitializerRebooter
{
	private lobby ?: Lobby;

	protected override filterMutation (mutation: MutationRecord): void
	{
		// initialize
		for (const addedNode of mutation.addedNodes)
		{
			if (isTagLobby(addedNode))
			{
				this.lobby = new Lobby(addedNode);
				this.lobby.initialize();

				break;
			}
		}

		// destroy
		for (const removedNode of mutation.removedNodes)
		{
			if (isTagLobby(removedNode))
			{
				this.lobby?.destroy();
				delete this.lobby;

				break;
			}
		}
	}

	public override destroy (): void
	{
		super.destroy();

		this.lobby?.destroy();
		delete this.lobby;
	}
}
