
import { SerializerJSON, SerializerInterface } from 'src/tools-serializer/SerializerInterface';

import { SelectionButtonListener } from './SelectionButtonListener';


export interface SelectionButtonJSON extends SerializerJSON
{
	formulationHTML : string;
}

export class SelectionButton extends SelectionButtonListener implements SerializerInterface
{
	private readonly tag_slide_choice_text = this.tag_slide_choice.querySelectorWithCheck('div.slide-choice-content', HTMLDivElement);

	private readonly formulationHTML = this.tag_slide_choice_text.innerHTML;

	public serializeToJSON (): SelectionButtonJSON
	{
		return {
			formulationHTML : this.formulationHTML
		};
	}
}
