
import { isObject } from 'src/tools-types/Object';


export interface QuestionDTO
{
	section_name : string;
	student_name : string;
}

export function isQuestionDTO (obj: unknown): obj is QuestionDTO
{
	return isObject(obj)
		&& typeof obj.section_name === 'string'
		&& typeof obj.student_name === 'string';
}
