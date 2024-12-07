
import { isObject } from 'src/tools-types/Object';


export abstract class AutomaticallyDisposable implements Disposable
{
	private disposed = false;

	protected get ignored_dispose_values (): object[]
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
		const ignored_values = this.ignored_dispose_values;

		for (const property_name of property_names)
		{
			const value = this[property_name as keyof this];

			if (isObject(value) === false)
			{
				continue;
			}

			if (ignored_values.includes(value))
			{
				continue;
			}

			const fn_dispose = (value as unknown as Disposable)[Symbol.dispose];
			const is_dispose = typeof fn_dispose === 'function';

			is_dispose && fn_dispose.call(value);
		}

		this.disposed = true;
	}
}
