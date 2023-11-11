export type Cb<T> = (params: T) => void;

export interface OnMessageParams {
  text: string;
}

export type EventsToEmit = "message";
export type EventsToListen = "message";
export type AnyCallback = (...args: unknown[]) => void;
