
import { Disposable } from 'src/tools-disposable/Disposable';
import { Transfer } from 'src/tools-transfer/Transfer';


export class ConnectionStatus implements Disposable
{
	private declare readonly tag_status;

	private setLoading (): void
	{
		this.tag_status.textContent = 'loading...';
		this.tag_status.style.color = '#03A9F4';
	}

	private setConnected (): void
	{
		this.tag_status.textContent = 'connected';
		this.tag_status.style.color = '#30C99C';
	}

	private setClosed (): void
	{
		this.tag_status.textContent = 'closed';
		this.tag_status.style.color = '#E91E63';
	}

	private refresh (): void
	{
		const state = this.transfer.is_connected.state;

		if (typeof state === 'boolean')
		{
			state
				? this.setConnected()
				: this.setClosed();
		}
		else
		{
			this.setLoading();
		}
	}

	public constructor
	(
		private readonly tag_slide : HTMLDivElement,
		private readonly transfer  : Transfer,
	)
	{
		this.tag_status = document.createElement('div');

		this.tag_status.style.position = 'absolute';
		this.tag_status.style.right    = '0.5em';
		this.tag_status.style.top      = '0.5em';

		this.tag_status.style.fontFamily = 'Consolas, sans-serif';
		this.tag_status.style.fontWeight = '900';
		this.tag_status.style.fontSize   = '1.5em';

		transfer.is_connected.events.addListener('refresh', this.refresh.bind(this));
		this.refresh();

		tag_slide.appendChild(this.tag_status);
	}

	public dispose (): void
	{
		this.transfer.is_connected.events.removeListener('refresh', this.refresh.bind(this));
		this.tag_status.remove();
	}
}
