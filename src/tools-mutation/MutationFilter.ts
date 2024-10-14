
import { InitializerAbstract } from 'src/tools-initializer/InitializerAbstract';


export abstract class MutationFilter extends InitializerAbstract
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

	public override destroy (): void
	{
		super.destroy();

		this.listener.disconnect();
	}
}
