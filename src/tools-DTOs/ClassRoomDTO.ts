
import { isObject } from 'src/tools-types/Object';


export interface ClassRoomDTO
{
	class_room: {
		hash         : string;
		name         : string;
		teacher_name : string;
	};

	student: {
		hash       : string;
		first_name : string;
	};

	version: string;
}

export function isClassRoomDTO (obj: unknown): obj is ClassRoomDTO
{
	if (isObject(obj) === false)
	{
		return false;
	}

	const class_room = obj.class_room;

	if (isObject(class_room) === false)
	{
		return false;
	}

	const student = obj.student;

	if (isObject(student) === false)
	{
		return false;
	}

	return typeof class_room.hash         === 'string'
		&& typeof class_room.name         === 'string'
		&& typeof class_room.teacher_name === 'string'

		&& typeof student.hash       === 'string'
		&& typeof student.first_name === 'string'

		&& typeof obj.version === 'string';
}
