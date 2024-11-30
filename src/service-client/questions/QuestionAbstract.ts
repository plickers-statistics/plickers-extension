
import { Disposable } from 'src/tools-disposable/Disposable';
import { SerializableJSON, Serializable } from 'src/tools-serializable/Serializable';
import { Transfer } from 'src/tools-transfer/Transfer';


export interface QuestionJSON extends SerializableJSON
{
	formulationHTML : string;
	identifier      : number;
}

export abstract class QuestionAbstract implements Serializable, Disposable
{
	public abstract serializeToJSON (): QuestionJSON;
	public abstract dispose (): void;

	public constructor
	(
		protected readonly transfer  : Transfer,
		protected readonly tag_slide : HTMLDivElement,
	)
	{
	}
}
