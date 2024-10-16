
export interface LooseObject extends Record<string, unknown>
{
}

export function isObject (data: unknown): data is LooseObject
{
	return data !== null
		&& typeof data === 'object';
}
