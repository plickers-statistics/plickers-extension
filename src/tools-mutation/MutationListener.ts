
import { AutomaticallyDisposable } from 'src/tools-disposable/AutomaticallyDisposable';


export abstract class MutationListener extends AutomaticallyDisposable
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

	public override [Symbol.dispose] (): void
	{
		super[Symbol.dispose]();

		this.listener.disconnect();
	}
}
