
import { isObject } from 'src/tools-types/Object';


export function isAsyncDisposable (obj: unknown): obj is AsyncDisposable
{
	return isObject(obj)
		&& typeof obj[Symbol.asyncDispose] === 'function';
}

export function isDisposable (obj: unknown): obj is Disposable
{
	return isObject(obj)
		&& typeof obj[Symbol.dispose] === 'function';
}
