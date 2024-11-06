
import { QuestionDTO } from 'src/tools-DTOs/QuestionDTO';


export interface TransferEvents
{
	'disconnect' : undefined[];
	'message'    : any[];
}

export interface TransferBackgroundEvents extends TransferEvents
{
}

export interface TransferClientEvents extends TransferEvents
{
	'new-question': QuestionDTO[];
}
