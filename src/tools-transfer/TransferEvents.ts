
export interface TransferEvents
{
	'disconnect' : undefined[];
	'message'    : any[];
}

export interface TransferBackgroundEvents extends TransferEvents
{
}

export interface TransferClientEvents extends TransferEvents
{
}
