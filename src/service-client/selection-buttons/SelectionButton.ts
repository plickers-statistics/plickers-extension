
import { SerializerJSON, SerializerInterface } from 'src/tools-serializer/SerializerInterface';

import { State } from 'src/tools-types/State';
import { getIdentifier } from 'src/tools-types/String';

import { TransferClientInstance } from '../transfer/TransferClientInstance';

import { SelectionButtonListener } from './SelectionButtonListener';


export interface SelectionButtonJSON extends SerializerJSON
{
	formulationHTML : string;
	identifier      : number;
}

export class SelectionButton extends SelectionButtonListener implements SerializerInterface
{
	private readonly tag_slide_choice_text = this.tag_slide_choice.querySelectorWithCheck('div.slide-choice-content', HTMLDivElement);

	public readonly formulationHTML = this.tag_slide_choice_text.innerHTML;
	public readonly identifier      = getIdentifier(this.formulationHTML);

	// ===== ===== ===== ===== =====

	private readonly clickHandler = () => TransferClientInstance.transfer?.send('answer-selected', {
		identifier: this.identifier
	});

	private readonly updateClickListener = () => this.is_review.state
		? this.tag_slide_choice.removeEventListener('click', this.clickHandler)
		: this.tag_slide_choice.addEventListener('click', this.clickHandler);

	// ===== ===== ===== ===== =====

	private readonly is_review = new State();

	private updateReview (): void
	{
		this.is_review.state = this.tag_slide_choice.classList.contains('choice--review');
	}

	// ===== ===== ===== ===== =====

	protected override filterMutations (mutations: MutationRecord[]): void
	{
		super.filterMutations(mutations);

		this.updateReview();
	}

	public override initialize (): void
	{
		super.initialize();

		this.is_review.events.addListener('refresh', this.updateClickListener);
		this.updateReview();
	}

	public override destroy (): void
	{
		super.destroy();

		this.is_review.events.removeListener('refresh', this.updateClickListener);
		this.tag_slide_choice.removeEventListener('click', this.clickHandler);
	}

	// ===== ===== ===== ===== =====

	public serializeToJSON (): SelectionButtonJSON
	{
		return {
			formulationHTML : this.formulationHTML,
			identifier      : this.identifier,
		};
	}
}
