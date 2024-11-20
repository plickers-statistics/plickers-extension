
import { InitializerAbstract } from 'src/tools-initializer/InitializerAbstract';
import { SerializerJSON, SerializerInterface } from 'src/tools-serializer/SerializerInterface';
import { Transfer } from 'src/tools-transfer/Transfer';


export interface QuestionJSON extends SerializerJSON
{
	formulationHTML : string;
	identifier      : number;
}

export abstract class QuestionAbstract extends InitializerAbstract implements SerializerInterface
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
