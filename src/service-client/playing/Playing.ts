
import { PlayingRebooter } from './PlayingRebooter';


export class Playing extends PlayingRebooter
{
	protected override filterMutation (): void
	{
	}

	public override initialize (): void
	{
		console.debug('[Playing] initialize', this);

		super.initialize();
	}

	public override destroy (): void
	{
		console.debug('[Playing] destroy', this);

		super.destroy();
	}
}
