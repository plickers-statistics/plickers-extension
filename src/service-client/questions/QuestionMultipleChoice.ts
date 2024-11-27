
import { getIdentifier } from 'src/tools-types/String';

import { SelectionButtonJSON } from '../selection-buttons/SelectionButton';
import { SelectionButtons } from '../selection-buttons/SelectionButtons';

import { QuestionJSON, QuestionAbstract } from './QuestionAbstract';


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

	public override serializeToJSON (): QuestionMultipleChoiceJSON
	{
		return {
			formulationHTML : this.formulationHTML,
			identifier      : this.identifier,

			choices: this.choices.serializeToJSON()
		};
	}

	public override initialize (): void
	{
		super.initialize();
		this.choices.initialize();
	}

	public override dispose (): void
	{
		super.dispose();
		this.choices.dispose();
	}
}
