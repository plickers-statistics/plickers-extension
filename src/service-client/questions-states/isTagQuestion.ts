
export function isTagQuestion (node: Node): node is HTMLDivElement
{
	return node instanceof HTMLDivElement
		&& node.classList.contains('nowPlaying-slideContainerOuter');
}
