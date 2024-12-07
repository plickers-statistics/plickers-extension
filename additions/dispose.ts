
if (typeof Symbol.dispose === 'undefined')
{
	Object.defineProperty(Symbol, 'dispose', {
		configurable : true,
		enumerable   : false,
		writable     : false,

		value: Symbol('Symbol.dispose'),
	});
}

if (typeof Symbol.asyncDispose === 'undefined')
{
	Object.defineProperty(Symbol, 'asyncDispose', {
		configurable : true,
		enumerable   : false,
		writable     : false,

		value: Symbol('Symbol.asyncDispose'),
	});
}
