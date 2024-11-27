
import { Disposable } from 'src/tools-disposable/Disposable';
import { SerializableJSON, Serializable } from 'src/tools-serializable/Serializable';
import { Transfer } from 'src/tools-transfer/Transfer';

import { State } from 'src/tools-types/State';
import { getIdentifier } from 'src/tools-types/String';


export interface SelectionButtonJSON extends SerializableJSON
{
	formulationHTML : string;
	identifier      : number;
}

export class ButtonPressListener extends Disposable implements Serializable
{
	private readonly tag_slide_choice_text = this.tag_slide_choice.querySelectorWithCheck('div.slide-choice-content', HTMLDivElement);

	private readonly formulationHTML = this.tag_slide_choice_text.innerHTML;
	public  readonly identifier      = getIdentifier(this.formulationHTML);

	// ===== ===== ===== ===== =====

	private readonly clickHandler = () => this.transfer.send('new_answer', this.identifier);

	private readonly updateClickListener = () => this.is_listen.state
		? this.tag_slide_choice.addEventListener('click', this.clickHandler)
		: this.tag_slide_choice.removeEventListener('click', this.clickHandler);

	// ===== ===== ===== ===== =====

	private readonly is_listen = new State();

	// ===== ===== ===== ===== =====

	public mutationsListener (): void
	{
		this.is_listen.state = this.tag_slide_choice.classList.contains('choice--notReview')
			&& this.tag_slide_choice.classList.contains('slide-choice--notDeviceSelected');
	}

	public constructor
	(
		protected readonly transfer         : Transfer,
		protected readonly tag_slide_choice : HTMLButtonElement,
	)
	{
		super();

		this.is_listen.events.addListener('refresh', this.updateClickListener);
		this.mutationsListener();
	}

	public serializeToJSON (): SelectionButtonJSON
	{
		return {
			formulationHTML : this.formulationHTML,
			identifier      : this.identifier,
		};
	}

	public override dispose (): void
	{
		super.dispose();

		this.is_listen.events.removeListener('refresh', this.updateClickListener);
		this.tag_slide_choice.removeEventListener('click', this.clickHandler);
	}
}