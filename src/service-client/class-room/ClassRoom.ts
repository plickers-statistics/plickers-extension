
import { MutationListener } from 'src/tools-mutation/MutationListener';

import { Quiz } from '../quiz/Quiz';


export class ClassRoom extends MutationListener
{
	private quiz ?: Quiz = undefined;

	private restart (): void
	{
		const tag_playing = this.tag_playing_container.querySelector('div.nowPlaying--notScanning')
			|| this.tag_playing_container.querySelector('div.nowPlaying--isScanning');

		this.quiz?.[Symbol.dispose]();
		this.quiz = tag_playing instanceof HTMLDivElement
			? new Quiz(tag_playing)
			: undefined;
	}

	protected override filterMutations (): void
	{
		this.restart();
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
