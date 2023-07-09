type Context = {
  setTimeout: typeof setTimeout;
};

export default ({ setTimeout }: Context) =>
  (ms: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(resolve, ms);
    });
  };
