
import { getIdentifier } from 'src/tools-types/String';

import { SelectionButtonJSON } from '../selection-buttons/button/ButtonPressListener';
import { SelectionButtons } from '../selection-buttons/SelectionButtons';

import { QuestionJSON, QuestionAbstract } from './QuestionAbstract';
import { QuestionSupportCopying } from './QuestionSupportCopying';


interface QuestionMultipleChoiceJSON extends QuestionJSON
{
	choices: SelectionButtonJSON[];
}

export class QuestionMultipleChoice extends QuestionAbstract
{
	private readonly tag_slide_body  = this.tag_slide.querySelectorWithCheck('div.slide-body', HTMLDivElement);
	private readonly formulationHTML = this.tag_slide_body.innerHTML;
	private readonly identifier      = getIdentifier(this.formulationHTML);

	private readonly tag_slide_choices = this.tag_slide.querySelectorWithCheck('div.slide-choices', HTMLDivElement);
	private readonly choices           = new SelectionButtons(this.transfer, this.tag_slide_choices);

	private readonly support_copying = new QuestionSupportCopying(this.tag_slide_body, this.tag_slide);

	public override serializeToJSON (): QuestionMultipleChoiceJSON
	{
		return {
			formulationHTML : this.formulationHTML,
			identifier      : this.identifier,

			choices: this.choices.serializeToJSON()
		};
	}

	public override dispose (): void
	{
		this.support_copying.dispose();
		this.choices.dispose();
	}
}
