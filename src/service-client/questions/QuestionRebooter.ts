
export class QuestionRebooter
{
	constructor
	(
		private readonly tag_playing: HTMLDivElement
	)
	{
	}

	initialize (): void
	{
		console.debug('initialize', this);
	}

	destroy (): void
	{
		console.debug('destroy', this);
	}
}
