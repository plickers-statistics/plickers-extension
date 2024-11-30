
import { MutationListener } from 'src/tools-mutation/MutationListener';

import { Quiz } from '../quiz/Quiz';


export class ClassRoom extends MutationListener
{
	private quiz ?: Quiz;

	private restart (): void
	{
		this.quiz?.dispose();

		const tag_playing = this.tag_playing_container.querySelector('div.nowPlaying--notScanning')
			|| this.tag_playing_container.querySelector('div.nowPlaying--isScanning');

		if (tag_playing instanceof HTMLDivElement)
		{
			this.quiz = new Quiz(tag_playing);
		}
	}

	protected override filterMutations (): void
	{
		this.restart();
	}

	public override dispose (): void
	{
		super.dispose();

		this.quiz?.dispose();
		delete this.quiz;
	}

	public constructor
	(
		private readonly tag_playing_container: HTMLDivElement
	)
	{
		super();

		this.restart();

		this.listener.observe(tag_playing_container, {
			childList: true
		});
	}
}
