
import { Transfer } from 'src/tools-transfer/Transfer';


export class ConnectionStatus implements Disposable
{
	private declare readonly tag_status;

	private setLoading (): void
	{
		this.tag_status.textContent = 'loading...';
		this.tag_status.style.color = '#03A9F4';
	}

	private setOpened (): void
	{
		this.tag_status.textContent = 'opened';
		this.tag_status.style.color = '#30C99C';
	}

	private setClosed (): void
	{
		this.tag_status.textContent = 'closed';
		this.tag_status.style.color = '#E91E63';
	}

	private readonly refresh = () => {
		const state = this.transfer.is_connected.state;

		if (typeof state === 'boolean')
		{
			state
				? this.setOpened()
				: this.setClosed();
		}
		else
		{
			this.setLoading();
		}
	};

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

		transfer.is_connected.events.addListener('refresh', this.refresh);
		this.refresh();

		tag_slide.appendChild(this.tag_status);
	}

	public [Symbol.dispose] (): void
	{
		this.transfer.is_connected.events.removeListener('refresh', this.refresh);
		this.tag_status.remove();
	}
}
