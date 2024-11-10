
import { SerializerInterface } from 'src/tools-serializer/SerializerInterface';

import { SelectionButtonJSON } from './SelectionButton';
import { SelectionButtonsCollection } from './SelectionButtonsCollection';


export class SelectionButtons extends SelectionButtonsCollection implements SerializerInterface
{
	public readonly optionsRecalculated = (question: any) => {
		for (const option of question.options)
		{
			const find_option = this.collection.find(option_item => option_item.identifier === option.identifier);

			if (find_option)
			{
				find_option.showVotes(option);
			}
		}
	};

	public serializeToJSON (): SelectionButtonJSON[]
	{
		return this.collection.map(button => button.serializeToJSON());
	}
}
