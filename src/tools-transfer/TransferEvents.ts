
import { AnswerDTO } from 'src/tools-DTOs/AnswerDTO';
import { QuestionDTO } from 'src/tools-DTOs/QuestionDTO';


export interface TransferServerEvents
{
	'new-update' : string;
}

export interface TransferClientEvents
{
	'new_quiz'     : any;
	'new_question' : QuestionDTO;
	'new_answer'   : number;
}
