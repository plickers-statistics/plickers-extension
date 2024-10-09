
interface ParentNode
{
	querySelectorWithCheck <TNode extends Node>(selector: string, expected: new () => TNode): TNode;
}
