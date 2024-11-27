
import { Serializable } from 'src/tools-serializable/Serializable';

import { SelectionButtonJSON } from './SelectionButton';
import { SelectionButtonsCollection } from './SelectionButtonsCollection';


export class SelectionButtons extends SelectionButtonsCollection implements Serializable
{
	public serializeToJSON (): SelectionButtonJSON[]
	{
		return this.collection.map(button => button.serializeToJSON());
	}
}
