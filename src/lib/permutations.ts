export const permutations = <T>(array: Array<T>): Array<Array<T>> => {
  const go = (partial: Array<T>, remaining: Array<T>): Array<Array<T>> => {
    if (remaining.length === 0) {
      return [partial];
    }

    return remaining.flatMap((item, index) =>
      go(
        [...partial, item],
        [...remaining.slice(0, index), ...remaining.slice(index + 1)]
      )
    );
  };

  return go([], array);
};
