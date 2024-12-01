
import { Disposable } from 'src/tools-disposable/Disposable';


export abstract class MutationListener implements Disposable
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

	protected readonly listener = new MutationObserver(this.filterMutations.bind(this));

	public dispose (): void
	{
		this.listener.disconnect();
	}
}
