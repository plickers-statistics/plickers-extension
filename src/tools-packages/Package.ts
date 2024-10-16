
import { isObject } from 'src/tools-types/Object';


export interface PackageInterface
{
	type  : string,
	data ?: unknown
}

export function isPackage (obj: unknown): obj is PackageInterface
{
	return isObject(obj)
		&& typeof obj.type === 'string';
}
