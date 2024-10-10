
import { QuestionAbstract } from './QuestionAbstract';


export class QuestionMultipleChoice extends QuestionAbstract
{
	private readonly tag_slide_body    = this.tag_slide.querySelectorWithCheck('div.slide-body',    HTMLDivElement);
	private readonly tag_slide_choices = this.tag_slide.querySelectorWithCheck('div.slide-choices', HTMLDivElement);
}
