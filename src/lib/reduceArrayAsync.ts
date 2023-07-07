export const reduceArrayAsync = async <Element, Accumulator>(
  array: Array<Element>,
  reducer: (
    accumulator: Accumulator,
    current: Element,
    index: number
  ) => Promise<Accumulator>,
  initialAccumulator: Promise<Accumulator>
): Promise<Accumulator> => {
  let accumulator = await initialAccumulator;

  for (let index = 0; index < array.length; index++) {
    const current = array[index];
    accumulator = await reducer(accumulator, current, index);
  }

  return accumulator;
};
