
import { isAsyncDisposable, isDisposable } from './isDisposable';


export abstract class AutomaticallyDisposable implements Disposable
{
	private disposed = false;

	protected get ignored_dispose_objects (): (AsyncDisposable | Disposable)[]
	{
		return [];
	}

	public [Symbol.dispose] (): void
	{
		if (this.disposed)
		{
			return;
		}

		const property_names  = Object.getOwnPropertyNames(this) as (keyof this)[];
		const ignored_objects = this.ignored_dispose_objects;

		for (const property_name of property_names)
		{
			const obj = this[property_name];

			const is_async_disposable = isAsyncDisposable(obj);
			const is_disposable       = isDisposable(obj);

			if (is_async_disposable === false && is_disposable === false)
			{
				continue;
			}

			if (ignored_objects.includes(obj))
			{
				continue;
			}

			is_async_disposable && obj[Symbol.asyncDispose].call(obj);
			is_disposable       && obj[Symbol.dispose].call(obj);
		}

		this.disposed = true;
	}
}
