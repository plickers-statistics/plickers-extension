
import { ClassRoomDTO } from 'src/tools-DTOs/ClassRoomDTO';
import { QuestionDTO } from 'src/tools-DTOs/QuestionDTO';


export interface TransferServerEvents
{
	'notification'         : string;
	'answers_recalculated' : any;
}

export interface TransferClientEvents
{
	'new_quiz'     : ClassRoomDTO;
	'new_question' : QuestionDTO;
	'new_answer'   : number;
}
