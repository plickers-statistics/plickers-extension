
export function isTagLobby (node: Node): node is HTMLDivElement
{
	return node instanceof HTMLDivElement
		&& node.classList.contains('nowPlayingContainer');
}
