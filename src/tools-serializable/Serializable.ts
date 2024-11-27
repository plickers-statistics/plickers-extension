
export interface SerializableJSON
{
}

export interface Serializable
{
	serializeToJSON (): SerializableJSON;
}
