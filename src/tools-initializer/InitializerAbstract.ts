
export abstract class InitializerAbstract
{
	public initialize (): void
	{
		console.debug('initialize', this);
	}

	public destroy (): void
	{
		console.debug('destroy', this);
	}
}
