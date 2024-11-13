
import { Room } from '../rooms/Room';

import { LobbyRebooter } from './LobbyRebooter';


export class Lobby extends LobbyRebooter
{
	private room ?: Room;

	private restart (): void
	{
		this.room?.destroy();
		delete this.room;

		const tag_playing = this.tag_playing_container.querySelector('div.nowPlaying--notScanning')
			|| this.tag_playing_container.querySelector('div.nowPlaying--isScanning');

		if (tag_playing instanceof HTMLDivElement)
		{
			this.room = new Room(tag_playing);
			this.room.initialize();
		}
	}

	protected override filterMutations (): void
	{
		this.restart();
	}

	public override initialize (): void
	{
		super.initialize();

		this.restart();
	}

	public override destroy (): void
	{
		super.destroy();

		this.room?.destroy();
		delete this.room;
	}
}
