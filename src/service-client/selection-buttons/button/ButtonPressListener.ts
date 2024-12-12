
import { SerializableJSON, Serializable } from 'src/tools-serializable/Serializable';
import { Transfer } from 'src/tools-transfer/Transfer';
import { getIdentifier } from 'src/tools-types/String';


export interface SelectionButtonJSON extends SerializableJSON
{
	formulationHTML : string;
	formulationText : string;
	identifier      : number;
}

export class ButtonPressListener implements Serializable
{
	private readonly tag_slide_choice_text = this.tag_slide_choice.querySelectorWithCheck('div.slide-choice-content', HTMLDivElement);

	private readonly formulationHTML = this.tag_slide_choice_text.innerHTML;
	private readonly formulationText = this.tag_slide_choice_text.textContent || '';
	public  readonly identifier      = getIdentifier(this.formulationHTML);

	public mutationListener (mutation: MutationRecord): void
	{
		mutation.oldValue?.includes('slide-choice--notDeviceSelected')
			&& this.tag_slide_choice.classList.contains('slide-choice--deviceSelected')
			&& this.transfer.send('new_answer', this.identifier);
	}

	public constructor
	(
		protected readonly transfer         : Transfer,
		protected readonly tag_slide_choice : HTMLButtonElement,
	)
	{
	}

	public serializeToJSON (): SelectionButtonJSON
	{
		return {
			formulationHTML : this.formulationHTML,
			formulationText : this.formulationText,
			identifier      : this.identifier,
		};
	}
}
