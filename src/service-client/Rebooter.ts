
export abstract class Rebooter
{
	private declare readonly tag_root;
	private declare readonly listener;

	protected abstract filterMutation (mutation: MutationRecord): void;

	private filterMutations (mutations: MutationRecord[]): void
	{
		for (const mutation of mutations)
		{
			this.filterMutation(mutation);
		}
	}

	constructor ()
	{
		this.tag_root = document.querySelectorWithCheck('div#root', HTMLDivElement);

		this.listener = new MutationObserver(mutations => this.filterMutations(mutations));
		this.listener.observe(this.tag_root, {
			childList: true
		});
	}
}
