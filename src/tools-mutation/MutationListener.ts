
import { Disposable } from 'src/tools-disposable/Disposable';


export abstract class MutationListener extends Disposable
{
	protected filterMutation (mutation: MutationRecord): void
	{
	}

	protected filterMutations (mutations: MutationRecord[]): void
	{
		for (const mutation of mutations)
		{
			this.filterMutation(mutation);
		}
	}

	protected readonly listener = new MutationObserver(mutations => this.filterMutations(mutations));

	public override dispose (): void
	{
		super.dispose();

		this.listener.disconnect();
	}
}
