
import { MutationListener } from 'src/tools-mutation/MutationListener';

import { Quiz } from '../quiz/Quiz';


export class ClassRoom extends MutationListener
{
	private quiz ?: Quiz = undefined;

	private restart (): void
	{
		this.quiz?.[Symbol.dispose]();

		const tag_playing = this.tag_playing_container.querySelectorWithCheck('div.nowPlaying', HTMLDivElement);
		const quiz_state  = tag_playing.classList.item(1);

		switch (quiz_state)
		{
			case 'nowPlaying--notScanning':
			case 'nowPlaying--isScanning':
				this.quiz = new Quiz(tag_playing);
				return;

			case 'nowPlaying--emptyState':
				this.quiz = undefined;
				return;
		}

		throw new RangeError(`quiz state ${ quiz_state } unknown`);
	}

	protected override mutationsListener (): void
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
