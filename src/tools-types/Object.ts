
export interface LooseObject extends Record<string, unknown>
{
}

export function isObject (data: unknown): data is LooseObject
{
	if (! data)
	{
		return false;
	}

	return typeof data === 'object';
}
