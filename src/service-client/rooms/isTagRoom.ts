
export function isTagRoom (node: Node): node is HTMLDivElement
{
	return node instanceof HTMLDivElement
		&& node.classList.contains('nowPlayingContainer');
}
