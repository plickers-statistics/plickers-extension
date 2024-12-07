
import { Transfer } from 'src/tools-transfer/Transfer';

import { QuestionAbstract } from './QuestionAbstract';
import { QuestionMultipleChoice } from './QuestionMultipleChoice';


export function getQuestionHandler (transfer: Transfer, tag_slide: HTMLDivElement): QuestionAbstract
{
	/**
	 * classes:
	 * 
	 * slide notranslate slide--static slide--template--bodyLeft slide--noDeviceSelectedChoice
	 * slide notranslate slide--static slide--template--bodyCenter slide--noDeviceSelectedChoice
	 * slide notranslate slide--static slide--template--bodyCenterChoicesMedia slide--noDeviceSelectedChoice
	 */
	switch (tag_slide.classList.item(3))
	{
		case 'slide--template--bodyLeft':
		case 'slide--template--bodyCenter':
		case 'slide--template--bodyCenterChoicesMedia':
			return new QuestionMultipleChoice(transfer, tag_slide);
	}

	throw new TypeError();
}
