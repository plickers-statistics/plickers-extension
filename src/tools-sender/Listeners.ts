
import { isPackage } from 'src/tools-packages/Package';

import browser from 'webextension-polyfill';

import { SenderError, convertToSenderError } from './SenderError';
import { Callback, TypedChecker, TypedCallback } from './Types';


export class Listeners
{
	public static readonly instance = new this();

	// ===== ===== ===== ===== =====

	private readonly handlers = new Map<string, Callback>();

	private async packageHandler (message: unknown, sender: browser.Runtime.MessageSender): Promise<unknown>
	{
		try
		{
			if (isPackage(message) === false)
			{
				throw new SenderError('unknown format', { message, sender });
			}

			const handler = this.handlers.get(message.type);

			if (handler)
			{
				return handler(message.data, sender);
			}

			throw new SenderError('package handler not found', { message, sender });
		}
		catch (error)
		{
			return convertToSenderError(error);
		}
	}

	private constructor ()
	{
		browser.runtime.onMessage.addListener((message, sender) => this.packageHandler(message, sender));
	}

	// ===== ===== ===== ===== =====

	public bind <THandler>(type: string, checker: TypedChecker<THandler>, handler: TypedCallback<THandler>): void
	{
		if (this.handlers.has(type))
		{
			throw new SenderError('failed to override handler', { type });
		}

		const safeCallback: Callback = function (message, sender)
		{
			if (checker(message))
			{
				return handler(message, sender);
			}

			throw new SenderError('invalid format', { type, message, sender });
		};

		this.handlers.set(type, safeCallback);
	}
}
