
import { SerializerInterface } from 'src/tools-serializer/SerializerInterface';

import { getQuestionHandler } from '../questions/getQuestionHandler';
import { QuestionJSON } from '../questions/QuestionAbstract';

import { QuestionStatesRebooter } from './QuestionStatesRebooter';


export class QuestionStates extends QuestionStatesRebooter implements SerializerInterface
{
	private readonly question = getQuestionHandler(this.tag_slide_states);

	protected override filterMutations (): void
	{
		this.question.is_review = this.tag_slide_states.classList.contains('nowPlaying-slideContainerInner--notScanning');
	}

	public override initialize (): void
	{
		super.initialize();
		this.question.initialize();
	}

	public override destroy (): void
	{
		super.destroy();
		this.question.destroy();
	}

	public serializeToJSON (): QuestionJSON
	{
		return this.question.serializeToJSON();
	}
}
