
import { SelectionButtons } from '../selection-buttons/SelectionButtons';

import { QuestionAbstract } from './QuestionAbstract';


export class QuestionMultipleChoice extends QuestionAbstract
{
	private readonly tag_slide_body    = this.tag_slide.querySelectorWithCheck('div.slide-body',    HTMLDivElement);
	private readonly tag_slide_choices = this.tag_slide.querySelectorWithCheck('div.slide-choices', HTMLDivElement);

	private readonly choices = new SelectionButtons(this.tag_slide_choices);

	public override set is_review (state: boolean)
	{
	}

	public override initialize (): void
	{
		super.initialize();
		this.choices.initialize();
	}

	public override destroy (): void
	{
		super.destroy();
		this.choices.destroy();
	}
}
