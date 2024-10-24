
export type TypedCallback<TPackage> = (message  : TPackage) => void;
export type TypedChecker <TPackage> = (obj      : unknown ) => obj is TPackage;
