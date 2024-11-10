
import { isObject } from 'src/tools-types/Object';


export interface QuestionDTO
{
	formulationHTML : string;
	identifier      : number;
}

export function isQuestionDTO (obj: unknown): obj is QuestionDTO
{
	return isObject(obj)
		&& typeof obj.formulationHTML === 'string'
		&& typeof obj.identifier      === 'number';
}
