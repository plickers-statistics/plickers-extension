
import { ClassRoomDTO } from 'src/tools-DTOs/ClassRoomDTO';


export function getClassRoomJSON (tag_playing: HTMLDivElement): ClassRoomDTO
{
	const tag_class_color = tag_playing.querySelectorWithCheck('div.nowPlaying-topPanel-sectionBlob', HTMLDivElement);
	const tag_class_label = tag_class_color.querySelectorWithCheck('div.nowPlaying-topPanel-sectionBlob-label', HTMLDivElement);
	const str_class_label = tag_class_label.innerHTML;

	const tag_student_label = tag_playing.querySelectorWithCheck('div.nowPlaying-topPanel-studentNameBlob-label', HTMLDivElement);
	const str_student_label = tag_student_label.innerHTML;

	// ===== ===== ===== ===== =====

	// plickers использует localStorage
	const session_text = localStorage.getItem('session') || '{}';
	const session_json = JSON.parse(session_text);

	for (const authorization of session_json.authorizations || [])
	{
		const class_room              = authorization.section;
		const class_room_id           = class_room.id;
		const class_room_name         = class_room.name;
		const class_room_color        = class_room.color;
		const class_room_teacher_name = class_room.teacherDisplayName;

		const student            = authorization.student;
		const student_id         = student.id;
		const student_first_name = student.firstName;

		// ===== ===== ===== ===== =====

		const is_class_room_name  = str_class_label == class_room_name;
		const is_class_room_color = tag_class_color.classList.contains('nowPlaying-topPanel-sectionBlob--classColor--' + class_room_color);

		const is_student_name = student_first_name == str_student_label;

		if (is_class_room_name && is_class_room_color && is_student_name)
		{
			console.debug('class information', authorization);

			return {
				class_room: {
					id           : class_room_id,
					name         : class_room_name,
					teacher_name : class_room_teacher_name,
				},

				student: {
					id         : student_id,
					first_name : student_first_name,
				},

				version: '1.1',
			};
		}
	}

	throw new ReferenceError();
}
