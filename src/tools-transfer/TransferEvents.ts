
import { AnswerDTO } from 'src/tools-DTOs/AnswerDTO';
import { QuestionDTO } from 'src/tools-DTOs/QuestionDTO';


export interface TransferEvents
{
	'disconnect' : undefined;
	'message'    : any;
}

export interface TransferBackgroundEvents extends TransferEvents
{
	'new-update' : string;

	'options-recalculated' : QuestionDTO;
}

export interface TransferClientEvents extends TransferEvents
{
	'check-update' : string;

	'new-question'    : QuestionDTO;
	'answer-selected' : AnswerDTO;
}
