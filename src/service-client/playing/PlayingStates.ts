
/** states (classes) */
export class PlayingStates
{
	/** waiting to start */
	public static readonly WAITING = 'nowPlaying--emptyState';

	/** preview */
	public static readonly PREVIEW = 'nowPlaying--notScanning';

	/** choice of options */
	public static readonly OPTIONS = 'nowPlaying--isScanning';
}
