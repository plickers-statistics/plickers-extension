
import { isObject } from 'src/tools-types/Object';


export interface QuestionDTO
{
	template : string;

	formulationHTML : string;
	formulationText : string;
	identifier      : number;
}

export function isQuestionDTO (obj: unknown): obj is QuestionDTO
{
	return isObject(obj)
		&& typeof obj.template        === 'string'
		&& typeof obj.formulationHTML === 'string'
		&& typeof obj.formulationText === 'string'
		&& typeof obj.identifier      === 'number';
}
