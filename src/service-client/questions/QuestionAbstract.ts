
import { InitializerAbstract } from 'src/tools-initializer/InitializerAbstract';
import { SerializableJSON, Serializable } from 'src/tools-serializable/Serializable';
import { Transfer } from 'src/tools-transfer/Transfer';


export interface QuestionJSON extends SerializableJSON
{
	formulationHTML : string;
	identifier      : number;
}

export abstract class QuestionAbstract extends InitializerAbstract implements Serializable
{
	public abstract serializeToJSON (): QuestionJSON;

	public constructor
	(
		protected readonly transfer  : Transfer,
		protected readonly tag_slide : HTMLDivElement,
	)
	{
		super();
	}
}
