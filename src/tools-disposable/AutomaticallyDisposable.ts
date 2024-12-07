
export abstract class AutomaticallyDisposable implements Disposable
{
	private disposed = false;

	protected get ignored_dispose_properties (): string[]
	{
		return [];
	}

	public [Symbol.dispose] (): void
	{
		if (this.disposed)
		{
			return;
		}

		const property_names = Object.getOwnPropertyNames(this);

		for (const property_name of property_names)
		{
			if (this.ignored_dispose_properties.includes(property_name))
			{
				continue;
			}

			const property = this[property_name as keyof this];
			const dispose  = (property as Disposable)[Symbol.dispose];

			typeof dispose === 'function' && dispose.call(property);
		}

		this.disposed = true;
	}
}
