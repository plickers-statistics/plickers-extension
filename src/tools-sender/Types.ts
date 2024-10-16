
import browser from 'webextension-polyfill';


export type Callback = (
	message  : unknown,
	sender  ?: browser.Runtime.MessageSender
) => (Promise<unknown> | true | void);

export type TypedCallback<TPackage> = (
	message  : TPackage,
	sender  ?: browser.Runtime.MessageSender
) => (Promise<unknown> | true | void);

export type TypedChecker<TPackage> = (
	obj: unknown
) => obj is TPackage;
