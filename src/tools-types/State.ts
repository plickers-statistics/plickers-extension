
/** @see http://78.29.34.5:3000/company/gosuslugi_forms/src/master/src/tools/State.ts */

import { EventEmitter } from 'events';


interface StateEvents
{
	'refresh': [];
}

abstract class StateBase
{
	public readonly events = new EventEmitter<StateEvents>();

	// ===== ===== ===== ===== =====

	private _state ?: boolean;

	public set state (value: boolean)
	{
		if (this.state === value)
		{
			return;
		}

		this._state = value;

		this.events.emit('refresh');
	}

	public get state (): boolean | undefined
	{
		return this._state;
	}
}

export class State extends StateBase
{
	public toggle (): void
	{
		this.state = ! this.state;
	}
}
