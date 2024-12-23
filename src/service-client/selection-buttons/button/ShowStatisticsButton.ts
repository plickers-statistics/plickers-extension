
import { Transfer } from 'src/tools-transfer/Transfer';


export class ShowStatisticsButton implements Disposable
{
	private declare readonly tag_graph;
	private declare readonly tag_count;

	public [Symbol.dispose] (): void
	{
		this.tag_graph.remove();
		this.tag_count.remove();
	}

	public constructor
	(
		protected readonly transfer         : Transfer,
		protected readonly tag_slide_choice : HTMLButtonElement,
	)
	{
		const parser = new DOMParser();

		this.tag_graph = parser.parseFromString('<div class="slide-choice-graph"><div class="slide-choice-graph-bar" style="width: 0%;"></div></div>', 'text/html').body.firstElementChild as HTMLDivElement;
		this.tag_count = parser.parseFromString('<div class="slide-choice-responseCount slide-choice-responseCount--isZero">0</div>', 'text/html').body.firstElementChild as HTMLDivElement;

		this.tag_slide_choice.append(this.tag_graph);
		this.tag_slide_choice.append(this.tag_count);
	}

	public mutationsListener (): void
	{
		// При нажатии обновляются свойства варианта.
		this.tag_slide_choice.classList.replace('slide-choice--notShowResponseCounts', 'slide-choice--showResponseCounts');
	}

	public showVotes (data: { percentage: number, votes: number }): void
	{
		(this.tag_graph.querySelector('div.slide-choice-graph-bar') as HTMLDivElement).style.width = data.percentage + '%';
		this.tag_count.textContent = data.votes.toString();
	}
}
