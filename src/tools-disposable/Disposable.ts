
export abstract class Disposable
{
	public initialize (): void
	{
		console.debug('initialize', this);
	}

	public dispose (): void
	{
		console.debug('dispose', this);
	}
}
