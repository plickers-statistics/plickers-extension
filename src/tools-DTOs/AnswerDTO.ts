
import { isObject } from 'src/tools-types/Object';


export interface AnswerDTO
{
	identifier: number;
}

export function isAnswerDTO (obj: unknown): obj is AnswerDTO
{
	return isObject(obj)
		&& typeof obj.identifier === 'number';
}
