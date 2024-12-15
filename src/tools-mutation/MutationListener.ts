
import { AutomaticallyDisposable } from 'src/tools-disposable/AutomaticallyDisposable';


export abstract class MutationListener extends AutomaticallyDisposable
{
	protected mutationListener (mutation: MutationRecord): void
	{
	}

	protected mutationsListener (mutations: MutationRecord[]): void
	{
		for (const mutation of mutations)
		{
			this.mutationListener(mutation);
		}
	}

	protected readonly listener = new MutationObserver(this.mutationsListener.bind(this));

	public override [Symbol.dispose] (): void
	{
		super[Symbol.dispose]();

		this.listener.disconnect();
	}
}
