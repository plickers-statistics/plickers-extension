
import { InitializerAbstract } from 'src/tools-initializer/InitializerAbstract';


export abstract class QuestionAbstract extends InitializerAbstract
{
	public abstract set is_review (state: boolean);

	public constructor
	(
		protected readonly tag_slide: HTMLDivElement
	)
	{
		super();
	}
}
