
import { AutomaticallyDisposable } from 'src/tools-disposable/AutomaticallyDisposable';
import { SerializableJSON, Serializable } from 'src/tools-serializable/Serializable';
import { Transfer } from 'src/tools-transfer/Transfer';


export interface QuestionJSON extends SerializableJSON
{
	template : string;

	formulationHTML : string;
	formulationText : string;
	identifier      : number;
}

export abstract class QuestionAbstract extends AutomaticallyDisposable implements Serializable
{
	protected override get ignored_dispose_values (): object[]
	{
		return [ this.transfer ];
	}

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
