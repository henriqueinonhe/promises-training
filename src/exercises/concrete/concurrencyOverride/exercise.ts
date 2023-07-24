type Context = {
  fetchFirstData: (input: string) => Promise<string>;
  fetchSecondData: (input: string) => Promise<string>;
  setData: (data: string) => void;
};

export default ({ fetchFirstData, fetchSecondData, setData }: Context) => {
  const runIdRef: {
    current: symbol | undefined;
  } = { current: undefined };

  return async (input: string) => {
    const runId = Symbol();
    const isSameRun = () => runIdRef.current === runId;

    runIdRef.current = runId;

    const firstData = await fetchFirstData(input);

    if (!isSameRun()) {
      return;
    }

    const secondData = await fetchSecondData(firstData);

    if (!isSameRun()) {
      return;
    }

    setData(secondData);
  };
};
