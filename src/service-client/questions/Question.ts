
import { QuestionRebooter } from './QuestionRebooter';


export class Question extends QuestionRebooter
{
	protected override filterMutation (): void
	{
	}

	public override initialize (): void
	{
		console.debug('[Question] initialize', this);

		super.initialize();
	}

	public override destroy (): void
	{
		console.debug('[Question] destroy', this);

		super.destroy();
	}
}
