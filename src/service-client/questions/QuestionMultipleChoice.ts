
import { SelectionButtonJSON } from '../selection-buttons/SelectionButton';
import { SelectionButtons } from '../selection-buttons/SelectionButtons';

import { QuestionJSON, QuestionAbstract } from './QuestionAbstract';


interface QuestionMultipleChoiceJSON extends QuestionJSON
{
	formulationHTML : string;
	choices         : SelectionButtonJSON[];
}

export class QuestionMultipleChoice extends QuestionAbstract
{
	private readonly tag_slide_body    = this.tag_slide.querySelectorWithCheck('div.slide-body',    HTMLDivElement);
	private readonly tag_slide_choices = this.tag_slide.querySelectorWithCheck('div.slide-choices', HTMLDivElement);

	private readonly formulationHTML = this.tag_slide_body.innerHTML;
	private readonly choices = new SelectionButtons(this.tag_slide_choices);

	public override set is_review (state: boolean)
	{
	}

	public override serializeToJSON (): QuestionMultipleChoiceJSON
	{
		return {
			formulationHTML : this.formulationHTML,
			choices         : this.choices.serializeToJSON()
		};
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
