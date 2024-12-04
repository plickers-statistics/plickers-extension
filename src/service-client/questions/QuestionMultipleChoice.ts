
import { getIdentifier } from 'src/tools-types/String';

import { ConnectionStatus } from '../menu/ConnectionStatus';
import { QuestionSupportCopying } from '../menu/QuestionSupportCopying';

import { SelectionButtonJSON } from '../selection-buttons/button/ButtonPressListener';
import { SelectionButtons } from '../selection-buttons/SelectionButtons';

import { QuestionJSON, QuestionAbstract } from './QuestionAbstract';


export interface QuestionMultipleChoiceJSON extends QuestionJSON
{
	options: SelectionButtonJSON[];
}

export class QuestionMultipleChoice extends QuestionAbstract
{
	private readonly tag_slide_body  = this.tag_slide.querySelectorWithCheck('div.slide-body', HTMLDivElement);
	private readonly formulationHTML = this.tag_slide_body.innerHTML;
	private readonly formulationText = this.tag_slide_body.textContent || '';
	private readonly identifier      = getIdentifier(this.formulationHTML);

	private readonly tag_slide_choices = this.tag_slide.querySelectorWithCheck('div.slide-choices', HTMLDivElement);
	private readonly options           = new SelectionButtons(this.transfer, this.tag_slide_choices);

	private readonly connection_status = new ConnectionStatus(this.tag_slide, this.transfer);
	private readonly support_copying   = new QuestionSupportCopying(this.tag_slide_body, this.serializeToJSON.bind(this));

	public override serializeToJSON (): QuestionMultipleChoiceJSON
	{
		return {
			formulationHTML : this.formulationHTML,
			formulationText : this.formulationText,
			identifier      : this.identifier,

			options: this.options.serializeToJSON()
		};
	}

	public override dispose (): void
	{
		this.connection_status.dispose();
		this.support_copying.dispose();

		this.options.dispose();
	}
}
