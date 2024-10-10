
import { QuestionAbstract } from './QuestionAbstract';
import { QuestionMultipleChoice } from './QuestionMultipleChoice';


export function getQuestionHandler (tag_playing: HTMLDivElement): QuestionAbstract
{
	const tag_slide = tag_playing.querySelectorWithCheck('div.slide', HTMLDivElement);

	/**
	 * classes:
	 * 
	 * slide notranslate slide--static slide--template--bodyLeft slide--noDeviceSelectedChoice
	 * slide notranslate slide--static slide--template--bodyCenter slide--noDeviceSelectedChoice
	 * slide notranslate slide--static slide--template--bodyCenterChoicesMedia slide--noDeviceSelectedChoice
	 */
	switch (tag_slide.classList[3])
	{
		case 'slide--template--bodyLeft':
		case 'slide--template--bodyCenter':
		case 'slide--template--bodyCenterChoicesMedia':
			return new QuestionMultipleChoice(tag_slide);
	}

	throw new TypeError();
}
