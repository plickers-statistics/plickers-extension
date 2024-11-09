
import { InitializerAbstract } from 'src/tools-initializer/InitializerAbstract';
import { SerializerJSON, SerializerInterface } from 'src/tools-serializer/SerializerInterface';


export interface QuestionJSON extends SerializerJSON
{
}

export abstract class QuestionAbstract extends InitializerAbstract implements SerializerInterface
{
	public abstract serializeToJSON (): QuestionJSON;

	public constructor
	(
		protected readonly tag_slide: HTMLDivElement
	)
	{
		super();
	}
}
