export const ref = <T>(): { current: Promise<T> | undefined } => {
  return { current: undefined };
};

export type Ref = typeof ref;
