export type BaseProps = Record<string, unknown>;
export type Nullable<T> = T | null;
export type StateSetter<T> = (update: Partial<T> | ((prev: Nullable<T>) => Partial<T>)) => void
export type Indexed = Record<string, unknown>;
