
import { QuestionMultipleChoiceJSON } from './QuestionMultipleChoice';


export class QuestionSupportCopying
{
	private declare readonly tag_copy;

	private readonly pressed = () => {
		const serialize = this.serializeToJSON();
		const text      = serialize.formulationText + '\n\n' + serialize.choices
			.map((value, index) => `${ index + 1 }. ${ value.formulationText }`)
			.join(';\n');

		// ===== ===== ===== ===== =====

		const tag_textarea = document.createElement('textarea');
		document.body.appendChild(tag_textarea);

		tag_textarea.value = text;
		tag_textarea.focus();
		tag_textarea.select();

		document.execCommand('copy');
		tag_textarea.remove();

		alert('Скопировано в буфер обмена');
	};

	public constructor
	(
		private readonly tag_container   : HTMLElement,
		private readonly serializeToJSON : () => QuestionMultipleChoiceJSON,
	)
	{
		const parser = new DOMParser();

		this.tag_copy = parser.parseFromString('<button style="border: none; border-radius: 10px; background: #57c5f7; color: white; padding: 2px 7px">copy</button>', 'text/html').body.firstElementChild as HTMLButtonElement;
		this.tag_copy.addEventListener('click', this.pressed);

		this.tag_container.appendChild(this.tag_copy);
	}

	public dispose (): void
	{
		this.tag_copy.removeEventListener('click', this.pressed);
		this.tag_copy.remove();
	}
}
