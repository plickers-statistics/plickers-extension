
export interface EmptyDTO
{
}

export function isEmptyDTO (obj: unknown): obj is EmptyDTO
{
	return true;
}
