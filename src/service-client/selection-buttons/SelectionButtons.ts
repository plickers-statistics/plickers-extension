
import { SerializerInterface } from 'src/tools-serializer/SerializerInterface';

import { SelectionButtonJSON } from './SelectionButton';
import { SelectionButtonsCollection } from './SelectionButtonsCollection';


export class SelectionButtons extends SelectionButtonsCollection implements SerializerInterface
{
	public serializeToJSON (): SelectionButtonJSON[]
	{
		return this.collection.map(button => button.serializeToJSON());
	}
}
