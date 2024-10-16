
import { SerializerJSON, SerializerInterface } from 'src/tools-serializer/SerializerInterface';


export interface RoomInfoJSON extends SerializerJSON
{
	section_name : string;
	student_name : string;
}

export class RoomInfo implements SerializerInterface
{
	private readonly tag_section_name = this.tag_playing.querySelectorWithCheck('div.nowPlaying-topPanel-sectionBlob-label', HTMLDivElement);
	private readonly section_name     = this.tag_section_name.innerHTML;

	private readonly tag_student_name = this.tag_playing.querySelectorWithCheck('div.nowPlaying-topPanel-studentNameBlob-label', HTMLDivElement);
	private readonly student_name     = this.tag_student_name.innerHTML;

	public constructor
	(
		private readonly tag_playing: HTMLDivElement
	)
	{
	}

	public serializeToJSON (): RoomInfoJSON
	{
		return {
			section_name: this.section_name,
			student_name: this.student_name,
		};
	}
}
