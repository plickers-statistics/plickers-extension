
/** @see https://stackoverflow.com/questions/22987071/javascript-queryselector-null-vs-queryselector */
if (Node.prototype.hasOwnProperty('querySelectorWithCheck') === false)
{
	Object.defineProperty(Node.prototype, 'querySelectorWithCheck', {
		configurable : true,
		enumerable   : true,
		writable     : true,

		value: function <TNode extends Node>(this: ParentNode, selector: string, expected: new () => TNode): TNode
		{
			const reference = this.querySelector(selector);

			if (reference instanceof expected)
			{
				return reference;
			}

			const received = reference
				? reference.constructor.name
				: 'NOT_FOUND';

			throw new ReferenceError(`[querySelectorWithCheck] selector: '${ selector }', expected: '${ expected.name }', received: '${ received }'.`);
		}
	});
}
