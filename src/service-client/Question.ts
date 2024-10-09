
export class Question
{
	constructor
	(
		private readonly tag_container: HTMLDivElement
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
