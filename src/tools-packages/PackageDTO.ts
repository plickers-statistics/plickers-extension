
import { isObject } from 'src/tools-types/Object';


export interface PackageDTO
{
	type  : string,
	data ?: unknown
}

export function isPackageDTO (obj: unknown): obj is PackageDTO
{
	return isObject(obj)
		&& typeof obj.type === 'string';
}
