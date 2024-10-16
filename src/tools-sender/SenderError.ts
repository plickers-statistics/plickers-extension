
import { isObject } from 'src/tools-types/Object';


export class SenderError extends Error
{
	public constructor
	(
		message     ?: string,
		public data ?: any
	)
	{
		super(message);
	}
}

export interface SenderInterface
{
	error_type     : true;
	error_message  : any;
	error_data     : any;
	error_name    ?: string;
	error_stack   ?: string;
}

export function isSenderError (obj: unknown): obj is SenderInterface
{
	return isObject(obj)
		&& typeof obj.error_type === 'boolean';
}

export function checkForSenderError (data: unknown): void
{
	if (isSenderError(data) === false)
	{
		return;
	}

	const error = new SenderError();

	error.message = data.error_message;
	error.data    = data.error_data;
	error.name    = data.error_name || 'undefined';
	error.stack   = data.error_stack;

	throw error;
}

export function convertToSenderError (error: unknown): SenderInterface
{
	let error_type    = true;
	let error_message = error;
	let error_data    : unknown;
	let error_name    : string  | undefined;
	let error_stack   : string  | undefined;

	if (error instanceof Error)
	{
		error_message = error.message;
		error_name    = error.name;
		error_stack   = error.stack?.toString();
	}

	if (error instanceof SenderError)
	{
		error_data = error.data;
	}

	return {
		error_type,
		error_message,
		error_data,
		error_name,
		error_stack
	};
}
