
import { isObject } from 'src/tools-types/Object';


export interface ClassRoomDTO
{
	classRoom: {
		hashCode    : string;
		name        : string;
		teacherName : string;
	};

	student: {
		hashCode  : string;
		firstName : string;
	};

	version: string;
}

export function isClassRoomDTO (obj: unknown): obj is ClassRoomDTO
{
	if (isObject(obj) === false)
	{
		return false;
	}

	const classRoom = obj.classRoom;

	if (isObject(classRoom) === false)
	{
		return false;
	}

	const student = obj.student;

	if (isObject(student) === false)
	{
		return false;
	}

	return typeof classRoom.hashCode    === 'string'
		&& typeof classRoom.name        === 'string'
		&& typeof classRoom.teacherName === 'string'

		&& typeof student.hashCode  === 'string'
		&& typeof student.firstName === 'string'

		&& typeof obj.version === 'string';
}
