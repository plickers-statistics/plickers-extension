
import { QuestionAbstract } from './QuestionAbstract';
import { QuestionMultipleChoice } from './QuestionMultipleChoice';


type QuestionAbstractConstructor = new (...options: ConstructorParameters<typeof QuestionAbstract>) => QuestionAbstract;

export function getQuestionTemplate (tag_slide: HTMLDivElement): QuestionAbstractConstructor
{
	/**
	 * classes:
	 * 
	 * slide notranslate slide--static slide--template--bodyLeft slide--noDeviceSelectedChoice
	 * slide notranslate slide--static slide--template--bodyCenter slide--noDeviceSelectedChoice
	 * slide notranslate slide--static slide--template--bodyCenterChoicesMedia slide--noDeviceSelectedChoice
	 */
	const template_name = tag_slide.classList.item(3);

	switch (template_name)
	{
		case 'slide--template--bodyLeft':
		case 'slide--template--bodyCenter':
		case 'slide--template--bodyCenterChoicesMedia':
			return QuestionMultipleChoice;
	}

	throw new TypeError(`question template ${ template_name } unknown`);
}
