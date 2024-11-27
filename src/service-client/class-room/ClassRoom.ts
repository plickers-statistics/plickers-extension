
import { Quiz } from '../quiz/Quiz';

import { ClassRoomRebooter } from './ClassRoomRebooter';


export class ClassRoom extends ClassRoomRebooter
{
	private quiz ?: Quiz;

	private restart (): void
	{
		this.quiz?.dispose();
		delete this.quiz;

		const tag_playing = this.tag_playing_container.querySelector('div.nowPlaying--notScanning')
			|| this.tag_playing_container.querySelector('div.nowPlaying--isScanning');

		if (tag_playing instanceof HTMLDivElement)
		{
			this.quiz = new Quiz(tag_playing);
			this.quiz.initialize();
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

	public override dispose (): void
	{
		super.dispose();

		this.quiz?.dispose();
		delete this.quiz;
	}
}
