
import { isObject } from 'src/tools-types/Object';


export abstract class AutomaticallyDisposable implements Disposable
{
	private disposed = false;

	protected get ignored_dispose_objects (): object[]
	{
		return [];
	}

	public [Symbol.dispose] (): void
	{
		if (this.disposed)
		{
			return;
		}

		const property_names  = Object.getOwnPropertyNames(this);
		const ignored_objects = this.ignored_dispose_objects;

		for (const property_name of property_names)
		{
			const obj = this[property_name as keyof this];

			if (isObject(obj) === false)
			{
				continue;
			}

			if (ignored_objects.includes(obj))
			{
				continue;
			}

			const fn_dispose = (obj as unknown as Disposable)[Symbol.dispose];
			const is_dispose = typeof fn_dispose === 'function';

			is_dispose && fn_dispose.call(obj);
		}

		this.disposed = true;
	}
}
